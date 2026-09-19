"use client";

import { useMemo, useRef, useState } from "react";
import { SKILL_LABELS } from "../lib/input-validation";

const stages = ["CV yükle", "İlanı ekle", "Ön analiz"];

function Icon({ children }) {
  return <span aria-hidden="true" className="icon">{children}</span>;
}

export default function Home() {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [jobText, setJobText] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState("idle");
  const [result, setResult] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [copied, setCopied] = useState(false);

  function resetForm() {
    setFile(null);
    setJobText("");
    setResult(null);
    setStatus("idle");
    setValidationErrors([]);
    setCopied(false);
    if (inputRef.current) inputRef.current.value = "";
  }

  async function copySummary() {
    if (!result) return;
    const matchedList = result.matchedSkills.map((id) => SKILL_LABELS[id] ?? id).join(", ") || "Yok";
    const missingList = result.missingSkills.map((id) => SKILL_LABELS[id] ?? id).join(", ") || "Yok";
    const summaryText = `[CVera ATS Uyum Ön Analiz Raporu]
Uyum Skoru: ${result.score}/100

✓ CV'de Doğrulanan Beceriler:
${matchedList}

+ İlanda İstenen Eksik Beceriler:
${missingList}

Önerilen İyileştirmeler:
${result.changes.map((c, i) => `${i + 1}. ${c.title}: ${c.body}`).join("\n")}
`;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Panoya kopyalama başarısız olursa sessizce geç
    }
  }

  const activeStep = result ? 3 : jobText.trim() ? 2 : file ? 1 : 0;
  const canAnalyze = file
    && jobText.trim().length >= 80
    && !["loading", "validating"].includes(status);

  const characterCount = useMemo(() => jobText.trim().length, [jobText]);

  function chooseFile(nextFile) {
    if (!nextFile) return;
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const extensionAllowed = /\.(pdf|docx)$/iu.test(nextFile.name);
    const mimeAllowed = !nextFile.type || allowed.includes(nextFile.type);
    if (!mimeAllowed || !extensionAllowed || nextFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setResult(null);
      setStatus("invalid");
      setValidationErrors(["Yalnızca 10 MB'dan küçük, geçerli PDF veya DOCX dosyaları kabul edilir."]);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFile(nextFile);
    setStatus("idle");
    setResult(null);
    setValidationErrors([]);
  }

  async function analyze() {
    if (!canAnalyze) return;
    setStatus("validating");
    setResult(null);
    setValidationErrors([]);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobText", jobText);

      const response = await fetch("/api/validate-inputs", {
        method: "POST",
        body: formData,
      });
      const validation = await response.json();

      if (!response.ok) {
        setValidationErrors(validation.errors ?? ["Girdiler doğrulanamadı."]);
        setStatus("rejected");
        return;
      }

      setStatus("loading");
      await new Promise((resolve) => setTimeout(resolve, 650));
      const matched = validation.matchedSkills ?? [];
      const missing = validation.missingSkills ?? [];
      const keywords = validation.job.skills ?? [];
      const matchedNames = matched.slice(0, 3).map((id) => SKILL_LABELS[id] ?? id);
      const missingNames = missing.slice(0, 3).map((id) => SKILL_LABELS[id] ?? id);
      const matchedText = matched.length
        ? `${matchedNames.join(", ")} becerileri CV'de doğrulandı.`
        : "İlandaki teknik becerilerle doğrudan eşleşen ifade bulunamadı.";
      const missingText = missing.length
        ? `${missingNames.join(", ")} CV'de bulunmadı; deneyimin varsa eklemeyi değerlendir.`
        : "İlanda öne çıkan teknik beceriler CV'de mevcut.";

      setResult({
        score: validation.previewScore,
        keywords,
        matchedSkills: matched,
        missingSkills: missing,
        changes: [
          { title: "Belge yapısı doğrulandı", body: `${validation.resume.wordCount} kelime ve ${validation.resume.sectionCount} CV bölümü tespit edildi.` },
          { title: "Beceri eşleşmesi kontrol edildi", body: matchedText },
          { title: "Eksik anahtar kelimeler ayrıştırıldı", body: missingText },
        ],
      });
      setStatus("done");
    } catch {
      setValidationErrors(["Doğrulama servisine ulaşılamadı. Lütfen tekrar dene."]);
      setStatus("rejected");
    }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#" aria-label="CVera ana sayfa">
          <span className="brandMark"><Icon>✦</Icon></span>
          <span>CVera</span>
        </a>
        <nav aria-label="Ana menü">
          <a href="#how">Nasıl çalışır?</a>
          <a href="#security">Güvenlik</a>
          <span className="statusPill">Yerel MVP</span>
        </nav>
      </header>

      <section className="hero">
        <div className="eyebrow"><Icon>✦</Icon> ATS uyumluluk ön analizi</div>
        <h1>Doğru işe, <em>doğru CV</em> ile başvur.</h1>
        <p>CV&apos;ndeki teknik becerileri hedef ilanla karşılaştır. Eksik anahtar kelimeleri ve tahmini ATS uyumunu saniyeler içinde gör.</p>
        <div className="steps" aria-label="İşlem adımları">
          {stages.map((label, index) => (
            <div className={`step ${activeStep >= index + 1 ? "complete" : ""}`} key={label}>
              <span>{activeStep > index ? "✓" : index + 1}</span>
              <strong>{label}</strong>
              {index < stages.length - 1 && <i />}
            </div>
          ))}
        </div>
      </section>

      <section className="workspace" id="how">
        <div className="inputColumn">
          <article className="card">
            <div className="cardHeading">
              <span className="number">01</span>
              <div><h2>Mevcut CV&apos;ni yükle</h2><p>PDF veya DOCX · En fazla 10 MB</p></div>
            </div>

            <div
              className={`dropzone ${dragging ? "dragging" : ""} ${file ? "hasFile" : ""}`}
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }}
              onClick={() => !file && inputRef.current?.click()}
              role={file ? undefined : "button"}
              tabIndex={file ? -1 : 0}
              onKeyDown={(event) => !file && event.key === "Enter" && inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.docx"
                hidden
                onChange={(event) => chooseFile(event.target.files[0])}
              />
              {file ? (
                <>
                  <div className="fileIcon">{file.name.endsWith(".pdf") ? "PDF" : "DOC"}</div>
                  <div className="fileDetails"><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(2)} MB · Yüklemeye hazır</span></div>
                  <button className="remove" aria-label="Yüklenen dosyayı kaldır" onClick={(event) => { event.stopPropagation(); setFile(null); setResult(null); setValidationErrors([]); if (inputRef.current) inputRef.current.value = ""; }}>×</button>
                </>
              ) : (
                <>
                  <div className="uploadIcon"><Icon>↑</Icon></div>
                  <strong>Dosyanı buraya sürükle</strong>
                  <span>veya <u>bilgisayarından seç</u></span>
                </>
              )}
            </div>
            {status === "invalid" && <p className="error">Lütfen geçerli bir PDF veya DOCX dosyası seç.</p>}
            <div className="privacy"><Icon>⌾</Icon><span>Dosyan yalnızca bu analiz sırasında bellekte işlenir; diske kaydedilmez.</span></div>
          </article>

          <article className="card">
            <div className="cardHeading">
              <span className="number">02</span>
              <div><h2>Hedef iş ilanını ekle</h2><p>İlan açıklamasının tamamını yapıştır</p></div>
            </div>
            <div className="textareaWrap">
              <textarea
                value={jobText}
                onChange={(event) => { setJobText(event.target.value); setResult(null); setStatus("idle"); setValidationErrors([]); }}
                placeholder="Örn. Ekibimize katılacak, React ve TypeScript deneyimli bir Frontend Developer arıyoruz..."
              />
              <span className={characterCount >= 80 ? "validCount" : ""}>{characterCount} karakter</span>
            </div>
            <button className="analyzeButton" disabled={!canAnalyze} onClick={analyze}>
              {status === "validating" ? <><span className="spinner" /> Girdiler doğrulanıyor...</> : status === "loading" ? <><span className="spinner" /> Eşleşme hesaplanıyor...</> : <><Icon>✦</Icon> CV&apos;mi ön analiz et <span>→</span></>}
            </button>
            {!file && <p className="hint">Devam etmek için önce CV&apos;ni yükle.</p>}
            {file && characterCount > 0 && characterCount < 80 && <p className="hint">Daha doğru analiz için en az 80 karakterlik ilan açıklaması ekle.</p>}
            {validationErrors.length > 0 && (
              <div className="validationBox" role="alert">
                <strong>Analiz başlatılmadı</strong>
                {validationErrors.map((message) => <p key={message}>{message}</p>)}
              </div>
            )}
          </article>
        </div>

        <aside className={`resultPanel ${result ? "withResult" : ""}`}>
          {result ? (
            <>
              <div className="resultTop">
                <div><span className="resultLabel">TAHMİNİ ATS ÖN ANALİZİ</span><h2>Beceri eşleşmesi</h2></div>
                <div className="score" style={{ "--score": `${result.score * 3.6}deg` }}><strong>{result.score}</strong><span>/100</span></div>
              </div>
              <div className="keywordBlock">
                <span>✓ CV&apos;de Doğrulanan Beceriler ({result.matchedSkills.length})</span>
                {result.matchedSkills.length > 0 ? (
                  <div>
                    {result.matchedSkills.map((id) => (
                      <b className="tagMatched" key={id}>✓ {SKILL_LABELS[id] ?? id}</b>
                    ))}
                  </div>
                ) : (
                  <p className="tagEmpty">İlandaki becerilerle doğrudan eşleşen ifade bulunamadı.</p>
                )}
              </div>

              <div className="keywordBlock">
                <span>+ İlanda İstenen Eksik Beceriler ({result.missingSkills.length})</span>
                {result.missingSkills.length > 0 ? (
                  <div>
                    {result.missingSkills.map((id) => (
                      <b className="tagMissing" key={id}>+ {SKILL_LABELS[id] ?? id}</b>
                    ))}
                  </div>
                ) : (
                  <p className="tagEmpty">Tebrikler! İlandaki tüm temel beceriler CV&apos;nde mevcut.</p>
                )}
              </div>

              <div className="changes">
                <span className="resultLabel">ÖNERİLEN DEĞİŞİKLİKLER</span>
                {result.changes.map((change, index) => (
                  <div className="change" key={change.title}>
                    <span>{index + 1}</span><div><strong>{change.title}</strong><p>{change.body}</p></div>
                  </div>
                ))}
              </div>

              <div className="resultActions">
                <button
                  type="button"
                  className={`actionButton ${copied ? "copied" : ""}`}
                  onClick={copySummary}
                  aria-label="Analiz özetini panoya kopyala"
                >
                  {copied ? "✓ Kopyalandı!" : "📋 Özeti Kopyala"}
                </button>
                <button
                  type="button"
                  className="actionButton"
                  onClick={resetForm}
                  aria-label="Yeni analiz yapmak için formu sıfırla"
                >
                  ↺ Yeni Analiz Yap
                </button>
              </div>

              <div className="demoNote">Bu sonuç anahtar kelime tabanlı bir MVP ön analizidir; işe alım sonucu veya gerçek ATS performansı garantisi değildir.</div>
            </>
          ) : (
            <div className="emptyResult">
              <div className="radar"><span /><i /><b>✦</b></div>
              <h2>Analiz sonucun burada görünecek</h2>
              <p>CV&apos;ni ve iş ilanını eklediğinde uyum skorunu, eksik anahtar kelimeleri ve iyileştirme önerilerini göstereceğiz.</p>
              <ul>
                <li><span>✓</span> ATS uyumluluk skoru</li>
                <li><span>✓</span> Eksik anahtar kelimeler</li>
                <li><span>✓</span> Değişiklik açıklamaları</li>
              </ul>
            </div>
          )}
        </aside>
      </section>

      <section className="trust" id="security">
        <div><Icon>◈</Icon><span><strong>Yerel ve geçici işleme</strong>CV dosyan kalıcı depolamaya yazılmaz.</span></div>
        <div><Icon>⌁</Icon><span><strong>Kanıta dayalı</strong>Olmayan deneyimler CV&apos;ne eklenmez.</span></div>
        <div><Icon>◎</Icon><span><strong>ATS dostu</strong>Okunabilir ve sade çıktı yapısı.</span></div>
      </section>
    </main>
  );
}
