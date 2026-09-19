# CVera

CVera, PDF veya DOCX biçimindeki bir CV'nin teknik becerilerini hedef yazılım
ilanıyla karşılaştıran, tahmini ATS uyum ön analizi sunan yerel bir Next.js
MVP'sidir.

> Bu sürüm yapay zekâ ile CV yeniden yazmaz. Anahtar kelime ve belge yapısı
> tabanlı, deterministik bir ön analiz yapar. Skor bir işe alım veya gerçek ATS
> performansı garantisi değildir.

## Özellikler

- PDF ve DOCX metin çıkarımı
- Sahte uzantı, bozuk dosya ve 10 MB boyut kontrolü
- CV yapısı doğrulaması
- Yazılım iş ilanı doğrulaması ve anlamsız metin engelleme
- Genişletilmiş teknik beceri eşleşmesi (.NET, ASP.NET, NodeJS, Vue, CI/CD, Docker vb.)
- Doğrulanan ve eksik becerilerin görsel etiketlerle (chips) listelenmesi
- Analiz özetini tek tıkla panoya kopyalama
- Yeni analiz için tek tıkla formu sıfırlama
- Tahmini ATS ön analiz skoru
- Responsive ve erişilebilir arayüz
- Dosyaları kalıcı depolamadan, istek belleğinde işleme (gizlilik odaklı)

## Teknolojiler

- Next.js 16 ve React 19
- `pdf-parse` ile PDF metin çıkarımı
- `mammoth` ile DOCX metin çıkarımı
- Node.js yerleşik test runner (`node:test`)
- ESLint ve Next.js Core Web Vitals kuralları

## Kurulum

Gereksinimler:

- Node.js 20.16 veya üzeri; Node.js 22 önerilir
- npm

```bash
git clone <repository-url>
cd cvera
npm ci
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000)
adresinde açılır.

## Komutlar

```bash
npm run dev    # Geliştirme sunucusu
npm run lint   # Statik kod kontrolü
npm test       # Birim testleri (18 birim testi)
npm run build  # Production build
npm run check  # Lint + test + build
```

## GitHub'a Yükleme (İlk Kurulum)

Projeyi GitHub'a push etmek için terminalde sırasıyla şu adımları izleyebilirsiniz:

```bash
# 1. Git deposunu başlatın (henüz başlatılmadıysa)
git init

# 2. Dosyaları ekleyin ve ilk commit'i oluşturun
git add .
git commit -m "feat: CVera ATS resume matching MVP"

# 3. GitHub'daki yeni reponuzu ekleyin ve yükleyin
git branch -M main
git remote add origin https://github.com/KULLANICI_ADINIZ/REPONUZ.git
git push -u origin main
```

## Doğrulama davranışı

Bir analiz yalnızca şu koşullarda başlatılır:

- Dosya gerçek bir PDF veya DOCX olmalı ve 10 MB'ı aşmamalı.
- Belge yeterli okunabilir metin ile CV'ye özgü bölüm ve iletişim sinyalleri
  içermeli.
- İlan en az 30 kelime olmalı; rol, teknik unvan, sorumluluk/nitelik ve en az
  bir tanınabilir yazılım becerisi içermeli.
- Tekrarlanan veya düşük çeşitlilikteki anlamsız metinler reddedilir.

## Gizlilik

Yüklenen dosya API isteği sırasında bellekte ayrıştırılır. Bu MVP dosyayı diske,
veritabanına veya üçüncü taraf bir servise kaydetmez. Production dağıtımında
rate limiting, izole belge işleme, malware taraması ve gözlemlenebilirlik ayrıca
eklenmelidir.

## Bilinen sınırlar

- Metin katmanı olmayan taranmış PDF'ler için OCR henüz yoktur.
- Skor anahtar kelime tabanlıdır; ticari ATS sistemlerini taklit etmez.
- AI destekli yeniden yazma, kullanıcı hesabı, geçmiş ve export henüz yoktur.
- Doğrulama şu anda Türkçe ve İngilizce yazılım rollerine odaklıdır.

## Yol haritası

- Kaynak kanıtlarına bağlı AI yeniden yazma
- OCR fallback
- DOCX/PDF export
- Kullanıcı onaylı değişiklik paneli
- Auth, işlem geçmişi ve 30 günlük veri yaşam döngüsü
- Rate limiting ve background job altyapısı

## Güvenlik

Güvenlik açığını herkese açık issue olarak paylaşmayın. Ayrıntılar için
[SECURITY.md](SECURITY.md) dosyasına bakın.

## Lisans

MIT
