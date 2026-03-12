import type { ReactNode } from "react";
import "katex/dist/katex.min.css";
import "../styles/globals.css";

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
