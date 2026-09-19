export const MAX_FILE_SIZE = 10 * 1024 * 1024;
export const MAX_JOB_TEXT_LENGTH = 40_000;

export const SKILL_RULES = [
  { id: "react native", label: "React Native", patterns: [/\breact[- ]native\b/iu] },
  { id: "react", label: "React", patterns: [/(?:^|[^\p{L}\p{N}])react(?:\.js|js)?(?=[^\p{L}\p{N}]|$)(?![- ]native)/iu] },
  { id: "vue", label: "Vue.js", patterns: [/\bvue(?:\.js|js)?\b/iu] },
  { id: "nuxt", label: "Nuxt", patterns: [/\bnuxt(?:\.js|js)?\b/iu] },
  { id: "angular", label: "Angular", patterns: [/\bangular(?:\.js|js)?\b/iu] },
  { id: "svelte", label: "Svelte", patterns: [/\bsvelte(?:kit)?\b/iu] },
  { id: "next.js", label: "Next.js", patterns: [/\bnext(?:\.js|js)?\b/iu] },
  { id: "node.js", label: "Node.js", patterns: [/\bnode(?:\.js|js)?\b/iu] },
  { id: "nest.js", label: "Nest.js", patterns: [/\bnest(?:\.js|js)?\b/iu] },
  { id: "typescript", label: "TypeScript", patterns: [/\btypescript\b/iu] },
  { id: "javascript", label: "JavaScript", patterns: [/\bjavascript\b/iu] },
  { id: "python", label: "Python", patterns: [/\bpython\b/iu] },
  { id: "java", label: "Java", patterns: [/(?:^|[^\p{L}\p{N}])java(?=[^\p{L}\p{N}]|$)(?!script)/iu] },
  { id: "kotlin", label: "Kotlin", patterns: [/\bkotlin\b/iu] },
  { id: "swift", label: "Swift", patterns: [/\bswift\b/iu] },
  { id: "golang", label: "Go / Golang", patterns: [/\bgolang\b|(?:\bgo\b(?=\s*(?:developer|mühendis|lang|geliştirici|backend)))/iu] },
  { id: "rust", label: "Rust", patterns: [/(?:^|[^\p{L}\p{N}])rust(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "php", label: "PHP", patterns: [/\bphp\b/iu] },
  { id: "ruby", label: "Ruby", patterns: [/\bruby\b/iu] },
  { id: "rails", label: "Ruby on Rails", patterns: [/\brails\b|\bruby on rails\b/iu] },
  { id: "c#", label: "C#", patterns: [/(?:^|[^\p{L}\p{N}])c#(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "c++", label: "C++", patterns: [/(?:^|[^\p{L}\p{N}])c\+\+(?=[^\p{L}\p{N}]|$)/iu] },
  { id: ".net", label: ".NET", patterns: [/(?:^|[^\p{L}\p{N}])(?:\.net|dotnet)\b|asp\.net(?:\s+core)?/iu] },
  { id: "flutter", label: "Flutter", patterns: [/\bflutter\b/iu] },
  { id: "android", label: "Android", patterns: [/\bandroid\b/iu] },
  { id: "ios", label: "iOS", patterns: [/(?:^|[^\p{L}\p{N}])ios(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "docker", label: "Docker", patterns: [/\bdocker\b/iu] },
  { id: "kubernetes", label: "Kubernetes", patterns: [/\bkubernetes\b|\bk8s\b/iu] },
  { id: "aws", label: "AWS", patterns: [/(?:^|[^\p{L}\p{N}])aws(?=[^\p{L}\p{N}]|$)|amazon web services/iu] },
  { id: "gcp", label: "GCP", patterns: [/(?:^|[^\p{L}\p{N}])gcp(?=[^\p{L}\p{N}]|$)|google cloud/iu] },
  { id: "azure", label: "Azure", patterns: [/\bazure\b/iu] },
  { id: "terraform", label: "Terraform", patterns: [/\bterraform\b/iu] },
  { id: "jenkins", label: "Jenkins", patterns: [/\bjenkins\b/iu] },
  { id: "github actions", label: "GitHub Actions", patterns: [/\bgithub actions\b/iu] },
  { id: "ci/cd", label: "CI/CD", patterns: [/\bci[\/-]cd\b|\bcicd\b/iu] },
  { id: "postgresql", label: "PostgreSQL", patterns: [/\bpostgres(?:ql)?\b/iu] },
  { id: "mysql", label: "MySQL", patterns: [/\bmysql\b/iu] },
  { id: "mongodb", label: "MongoDB", patterns: [/\bmongo(?:db)?\b/iu] },
  { id: "redis", label: "Redis", patterns: [/\bredis\b/iu] },
  { id: "elasticsearch", label: "Elasticsearch", patterns: [/\belasticsearch\b/iu] },
  { id: "sql", label: "SQL", patterns: [/(?:^|[^\p{L}\p{N}])sql(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "graphql", label: "GraphQL", patterns: [/\bgraphql\b/iu] },
  { id: "rest", label: "REST API", patterns: [/\brest(?:ful)?\b|\brest[- ]api\b/iu] },
  { id: "microservices", label: "Microservices", patterns: [/\bmicroservices?|mikroservis(?:ler)?\b/iu] },
  { id: "django", label: "Django", patterns: [/\bdjango\b/iu] },
  { id: "fastapi", label: "FastAPI", patterns: [/\bfastapi\b/iu] },
  { id: "flask", label: "Flask", patterns: [/\bflask\b/iu] },
  { id: "spring", label: "Spring Boot", patterns: [/\bspring(?:\s+boot)?\b/iu] },
  { id: "express", label: "Express.js", patterns: [/\bexpress(?:\.js|js)?\b/iu] },
  { id: "laravel", label: "Laravel", patterns: [/\blaravel\b/iu] },
  { id: "tailwind", label: "Tailwind CSS", patterns: [/\btailwind(?:css)?\b/iu] },
  { id: "bootstrap", label: "Bootstrap", patterns: [/\bbootstrap\b/iu] },
  { id: "html", label: "HTML", patterns: [/(?:^|[^\p{L}\p{N}])html5?(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "css", label: "CSS", patterns: [/(?:^|[^\p{L}\p{N}])css3?(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "sass", label: "SASS / SCSS", patterns: [/(?:^|[^\p{L}\p{N}])s[ac]ss(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "redux", label: "Redux", patterns: [/\bredux(?:[- ]toolkit)?\b/iu] },
  { id: "prisma", label: "Prisma", patterns: [/\bprisma\b/iu] },
  { id: "typeorm", label: "TypeORM", patterns: [/\btypeorm\b/iu] },
  { id: "playwright", label: "Playwright", patterns: [/\bplaywright\b/iu] },
  { id: "cypress", label: "Cypress", patterns: [/\bcypress\b/iu] },
  { id: "jest", label: "Jest", patterns: [/\bjest\b/iu] },
  { id: "git", label: "Git", patterns: [/(?:^|[^\p{L}\p{N}])git(?=[^\p{L}\p{N}]|$)/iu] },
  { id: "linux", label: "Linux", patterns: [/\blinux\b/iu] },
  { id: "scrum", label: "Scrum", patterns: [/\bscrum\b/iu] },
  { id: "agile", label: "Agile", patterns: [/\bagile|çevik\b/iu] },
  { id: "figma", label: "Figma", patterns: [/\bfigma\b/iu] },
  { id: "rabbitmq", label: "RabbitMQ", patterns: [/\brabbitmq\b/iu] },
  { id: "kafka", label: "Kafka", patterns: [/\bkafka\b/iu] },
  { id: "machine learning", label: "Machine Learning", patterns: [/\bmachine learning|makine öğrenimi\b/iu] },
  { id: "deep learning", label: "Deep Learning", patterns: [/\bdeep learning|derin öğrenme\b/iu] },
  { id: "llm", label: "LLM", patterns: [/(?:^|[^\p{L}\p{N}])llm(?:s)?(?=[^\p{L}\p{N}]|$)|large language model/iu] },
  { id: "nlp", label: "NLP", patterns: [/(?:^|[^\p{L}\p{N}])nlp(?=[^\p{L}\p{N}]|$)|doğal dil işleme|natural language processing/iu] },
  { id: "computer vision", label: "Computer Vision", patterns: [/\bcomputer vision|bilgisayarlı görü\b/iu] },
  { id: "scikit-learn", label: "scikit-learn", patterns: [/\bscikit[- ]learn\b|\bsklearn\b/iu] },
  { id: "tensorflow", label: "TensorFlow", patterns: [/\btensorflow\b/iu] },
  { id: "pytorch", label: "PyTorch", patterns: [/\bpytorch\b/iu] },
];

export const SKILL_LABELS = Object.fromEntries(
  SKILL_RULES.map((skill) => [skill.id, skill.label]),
);

const resumeSections = [
  /\b(deneyim|iş deneyimi|kariyer|experience|employment|work history)\b/iu,
  /\b(eğitim|education|university|üniversite|lisans|degree)\b/iu,
  /\b(beceri|beceriler|skills?|teknolojiler|technologies|yetkinlikler)\b/iu,
  /\b(proje|projeler|projects?|portfolyo|portfolio)\b/iu,
  /\b(sertifika|sertifikalar|certifications?|courses?|kurslar)\b/iu,
  /\b(özet|profil|summary|objective|hakkımda|about)\b/iu,
];

const jobSignals = {
  role: /\b(arıyoruz|aranıyor|pozisyon|rol|ekibimize|aday|candidate|position|role|hiring|looking for|join our team)\b/iu,
  qualification: /\b(gereksinim|aranan nitelik|tercihen|deneyim|tecrübe|yetkinlik|beceri|requirements?|qualifications?|experience|skills?|proficient|knowledge|familiar)\b/iu,
  responsibility: /\b(sorumluluk|görev|sorumlu|geliştir|tasarla|yönet|işbirliği|responsibilit|develop|build|design|maintain|manage|collaborate|implement)\w*/iu,
  employment: /\b(tam zamanlı|yarı zamanlı|uzaktan|hibrit|full[ -]?time|part[ -]?time|remote|hybrid|salary|maaş|lokasyon|location)\b/iu,
  title: /\b(developer|engineer|mühendis|geliştirici|uzman|specialist|analyst|architect|designer|manager|lead|intern|stajyer)\b/iu,
};

export function cleanText(value) {
  if (typeof value !== "string") {
    return "";
  }
  return value
    .replace(/\0/g, " ")
    .replace(/[\t\r ]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function tokenize(value) {
  if (typeof value !== "string") {
    return [];
  }
  return value.toLocaleLowerCase("tr-TR").match(/[\p{L}\p{N}+#./-]+/gu) ?? [];
}

export function findSkills(value, limit = 25) {
  if (typeof value !== "string" || !value.trim()) {
    return [];
  }
  const found = [];
  for (const skill of SKILL_RULES) {
    if (skill.patterns.some((pattern) => pattern.test(value))) {
      found.push(skill.id);
      if (found.length >= limit) {
        break;
      }
    }
  }
  return found;
}

export function validateResumeText(text) {
  if (typeof text !== "string") {
    return {
      valid: false,
      wordCount: 0,
      sectionCount: 0,
      hasContact: false,
      skills: [],
    };
  }

  const tokens = tokenize(text);
  const sectionCount = resumeSections.filter((pattern) => pattern.test(text)).length;
  const hasContact = /[\w.+-]+@[\w.-]+\.[a-z]{2,}/iu.test(text)
    || /(?:\+?\d[\d\s().-]{8,}\d)/u.test(text)
    || /\b(linkedin|github)\.com\//iu.test(text);
  const hasDate = /\b(?:19|20)\d{2}\b/u.test(text)
    || /\b(oca|şub|mar|nis|may|haz|tem|ağu|eyl|eki|kas|ara|jan|feb|apr|jun|jul|aug|sep|oct|nov|dec)\w*/iu.test(text);
  const hasProfessionalLanguage = /\b(geliştir|tasarla|yönet|uygula|analiz|başarı|sorumlu|develop|build|design|manage|implement|achiev|responsib)\w*/iu.test(text);
  const signalScore = sectionCount
    + (hasContact ? 2 : 0)
    + (hasDate ? 1 : 0)
    + (hasProfessionalLanguage ? 1 : 0);

  return {
    valid: tokens.length >= 25
      && signalScore >= 4
      && (hasContact || sectionCount >= 3),
    wordCount: tokens.length,
    sectionCount,
    hasContact,
    skills: findSkills(text),
  };
}

export function validateJobText(text) {
  if (typeof text !== "string") {
    return {
      valid: false,
      tooLong: false,
      wordCount: 0,
      uniqueRatio: 0,
      signals: {},
      skills: [],
    };
  }

  const tokens = tokenize(text);
  const uniqueRatio = tokens.length
    ? new Set(tokens).size / tokens.length
    : 0;
  const signals = Object.fromEntries(
    Object.entries(jobSignals).map(([name, pattern]) => [name, pattern.test(text)]),
  );
  const skills = findSkills(text);
  const signalCount = Object.values(signals).filter(Boolean).length;
  const looksLikeNoise = /(.)\1{8,}/u.test(text) || uniqueRatio < 0.28;

  return {
    valid: text.length <= MAX_JOB_TEXT_LENGTH
      && tokens.length >= 30
      && uniqueRatio >= 0.28
      && !looksLikeNoise
      && signals.role
      && signals.title
      && (signals.qualification || signals.responsibility)
      && signalCount >= 3
      && skills.length > 0,
    tooLong: text.length > MAX_JOB_TEXT_LENGTH,
    wordCount: tokens.length,
    uniqueRatio,
    signals,
    skills,
  };
}
