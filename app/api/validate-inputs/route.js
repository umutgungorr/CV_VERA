import { extractResumeText } from "../../../lib/document-parser";
import {
  cleanText,
  MAX_FILE_SIZE,
  MAX_JOB_TEXT_LENGTH,
  validateJobText,
  validateResumeText,
} from "../../../lib/input-validation";

export const runtime = "nodejs";
export const maxDuration = 15;

const MAX_REQUEST_SIZE = MAX_FILE_SIZE + MAX_JOB_TEXT_LENGTH + 256_000;
const NO_STORE_HEADERS = { "Cache-Control": "no-store" };

function json(body, status = 200) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

export async function POST(request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_REQUEST_SIZE) {
    return json({ errors: ["İstek boyutu izin verilen sınırı aşıyor."] }, 413);
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const jobText = cleanText(String(formData.get("jobText") ?? ""));

    if (!(file instanceof File)) {
      return json({ errors: ["Lütfen geçerli bir CV dosyası yükle."] }, 400);
    }

    const resumeText = await extractResumeText(file);
    const resume = validateResumeText(resumeText);
    const job = validateJobText(jobText);
    const errors = [];

    if (!resume.valid) {
      errors.push(
        resume.wordCount < 25
          ? "Dosyada yeterli okunabilir metin bulunamadı. Metin tabanlı bir CV yükle."
          : "Bu belge bir CV gibi görünmüyor. İletişim, deneyim, eğitim ve beceri bölümleri içeren bir CV yükle.",
      );
    }

    if (!job.valid) {
      if (job.tooLong) {
        errors.push("İş ilanı 40.000 karakter sınırını aşıyor.");
      } else if (job.wordCount < 30) {
        errors.push("İş ilanı çok kısa. Rol, sorumluluklar ve aranan nitelikleri içeren tam ilan metnini ekle.");
      } else if (job.skills.length === 0) {
        errors.push("İlanda tanınabilir bir teknik beceri bulunamadı. Yazılım rolünün tam ilan metnini ekle.");
      } else {
        errors.push("Bu metin bir iş ilanı gibi görünmüyor. Rol adı, sorumluluklar ve aranan nitelikleri içeren gerçek ilan metnini ekle.");
      }
    }

    if (errors.length) {
      return json({ errors }, 422);
    }

    const matchedSkills = job.skills.filter((skill) => resume.skills.includes(skill));
    const missingSkills = job.skills.filter((skill) => !resume.skills.includes(skill));
    const skillCoverage = matchedSkills.length / job.skills.length;
    const previewScore = Math.round(
      Math.min(92, 48 + skillCoverage * 34 + Math.min(resume.sectionCount, 5) * 2),
    );

    return json({
      resume: {
        wordCount: resume.wordCount,
        sectionCount: resume.sectionCount,
        skills: resume.skills,
      },
      job: {
        wordCount: job.wordCount,
        skills: job.skills,
      },
      matchedSkills,
      missingSkills,
      previewScore,
    });
  } catch (error) {
    const knownErrors = {
      FILE_SIZE: "Dosya boş veya 10 MB sınırını aşıyor.",
      INVALID_PDF: "Dosyanın uzantısı PDF olsa da içeriği geçerli bir PDF değil.",
      INVALID_DOCX: "Dosyanın uzantısı DOCX olsa da içeriği geçerli bir Word belgesi değil.",
      UNSUPPORTED_FILE: "Yalnızca PDF veya DOCX dosyaları destekleniyor.",
    };
    const message = knownErrors[error?.message]
      ?? "Belge okunamadı. Bozuk, şifreli veya desteklenmeyen bir dosya olabilir.";

    return json({ errors: [message] }, 422);
  }
}
