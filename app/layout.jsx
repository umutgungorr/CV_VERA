import "./globals.css";

export const metadata = {
  title: "CVera — ATS CV Ön Analizi",
  description: "CV'nizdeki teknik becerileri hedef ilanla karşılaştırın ve tahmini ATS uyumunu görün.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
