import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { AuthProvider } from "@/context/auth-context";
import { ThemeProvider } from "@/context/theme-context";
import { LanguageProvider } from "@/context/language-context";
import "@/styles/globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "أكاديمية التعلم الذكي | Smart Learning Academy",
    template: "%s | أكاديمية التعلم الذكي",
  },
  description:
    "منصة تعليمية متكاملة تجمع الدورات التفاعلية، المتابعة الذكية، والتواصل المباشر مع المدربين.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var l = localStorage.getItem("adaptive-learning-lang") || 
                  (document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/) ? decodeURIComponent(RegExp.$1) : "ar");
                if (l === "en" || l === "ar") {
                  document.documentElement.lang = l;
                  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
                  document.documentElement.setAttribute("data-lang", l);
                  document.documentElement.setAttribute("data-dir", l === "ar" ? "rtl" : "ltr");
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
