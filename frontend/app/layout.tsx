import type { ReactNode } from "react";
import "katex/dist/katex.min.css";
import "../styles/globals.css";
import { ThemeProvider } from "../components/theme/ThemeContext";

const themeBootstrapScript = `
(() => {
  try {
    const key = "quant-theme";
    const stored = window.localStorage.getItem(key);
    const hasStoredTheme = stored === "light" || stored === "dark";
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolvedTheme = hasStoredTheme ? stored : systemTheme;
    document.documentElement.setAttribute("data-theme", resolvedTheme);
  } catch (_error) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
