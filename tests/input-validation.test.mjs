import assert from "node:assert/strict";
import test from "node:test";

import {
  cleanText,
  findSkills,
  SKILL_LABELS,
  tokenize,
  validateJobText,
  validateResumeText,
} from "../lib/input-validation.js";

const validResume = `
Örnek Geliştirici
ornek@example.com | +90 555 111 22 33 | github.com/ornek-gelistirici

Özet
Son kullanıcı deneyimine önem veren yazılım geliştirici. Web uygulamaları geliştirir,
teknik problemleri analiz eder ve ekiplerle birlikte sürdürülebilir çözümler tasarlar.

Deneyim
Frontend Developer, Örnek Teknoloji, 2023 - 2026
React ve TypeScript kullanarak kullanıcı arayüzleri geliştirdi. Jest testleri yazdı,
Git tabanlı kod inceleme süreçlerine katıldı ve uygulama performansını iyileştirdi.

Eğitim
Bilgisayar Mühendisliği Lisans, Örnek Üniversitesi, 2019 - 2023

Beceriler
React, TypeScript, JavaScript, HTML, CSS, Git, Jest
`;

const validJob = `
Ekibimize katılacak bir Frontend Developer arıyoruz. Bu pozisyondaki aday,
React ve TypeScript ile erişilebilir kullanıcı arayüzleri geliştirmekten sorumlu
olacaktır. Tasarım ve backend ekipleriyle işbirliği yapacak, mevcut uygulamaların
bakımını üstlenecek ve Jest ile otomatik testler yazacaktır. Aranan nitelikler
arasında en az iki yıl yazılım geliştirme deneyimi, JavaScript, Git ve REST
bilgisi yer almaktadır. Pozisyon tam zamanlı ve hibrit çalışma modelindedir.
`;

test("gerçekçi CV yapısını kabul eder", () => {
  const result = validateResumeText(validResume);
  assert.equal(result.valid, true);
  assert.ok(result.sectionCount >= 3);
  assert.ok(result.skills.includes("react"));
});

test("rastgele belgeyi CV olarak kabul etmez", () => {
  const result = validateResumeText(
    "Bugün hava güzeldi ve sahilde uzun bir yürüyüş yaptık. Akşam yemek yedik.",
  );
  assert.equal(result.valid, false);
});

test("gerçekçi yazılım ilanını kabul eder", () => {
  const result = validateJobText(validJob);
  assert.equal(result.valid, true);
  assert.ok(result.skills.includes("typescript"));
});

test("tekrarlanan anlamsız ilan metnini reddeder", () => {
  const result = validateJobText(Array(50).fill("asdf").join(" "));
  assert.equal(result.valid, false);
});

test("uzun fakat iş ilanı olmayan metni reddeder", () => {
  const result = validateJobText(
    "Bu sabah parkta yürüdüm ve daha sonra arkadaşlarımla yemek yedim. ".repeat(12),
  );
  assert.equal(result.valid, false);
});

test("git kelimesini digital sözcüğünün içinde eşleştirmez", () => {
  assert.deepEqual(findSkills("digital marketing specialist"), []);
  assert.deepEqual(findSkills("Git ve React deneyimi"), ["react", "git"]);
});

test("ASP.NET ve .NET varyasyonlarını doğru tanır", () => {
  assert.deepEqual(findSkills("ASP.NET Core geliştirici"), [".net"]);
  assert.deepEqual(findSkills(".NET ve C# uzmanı"), ["c#", ".net"]);
});

test("NodeJS, NextJS ve Vue.js varyasyonlarını tanır", () => {
  const skills = findSkills("NodeJS, NextJS ve Vue.js bilen fullstack developer");
  assert.ok(skills.includes("node.js"));
  assert.ok(skills.includes("next.js"));
  assert.ok(skills.includes("vue"));
});

test("CI-CD ve TailwindCSS varyasyonlarını tanır", () => {
  const skills = findSkills("CI-CD pipeline kurulumu ve TailwindCSS tasarımı");
  assert.ok(skills.includes("ci/cd"));
  assert.ok(skills.includes("tailwind"));
});

test("cleanText ve tokenize boş veya geçersiz girdileri güvenle karşılar", () => {
  assert.equal(cleanText(null), "");
  assert.equal(cleanText(undefined), "");
  assert.equal(cleanText("  metin \0 test\n\n\n\nson  "), "metin test\n\nson");
  assert.deepEqual(tokenize(null), []);
  assert.deepEqual(tokenize(undefined), []);
  assert.ok(tokenize("Türkçe karakterler: ç, ğ, ı, ö, ş, ü").length >= 6);
});

test("validateResumeText ve validateJobText null girdilerde çökmez", () => {
  const resumeResult = validateResumeText(null);
  assert.equal(resumeResult.valid, false);

  const jobResult = validateJobText(null);
  assert.equal(jobResult.valid, false);
});

test("SKILL_LABELS her beceri için etiket sağlar", () => {
  assert.equal(SKILL_LABELS[".net"], ".NET");
  assert.equal(SKILL_LABELS["node.js"], "Node.js");
  assert.equal(SKILL_LABELS["c#"], "C#");
});
