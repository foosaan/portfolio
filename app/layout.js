import "./globals.css";

export const metadata = {
  title: "Dev Portfolio | Full-Stack Developer",
  description:
    "Developer Portfolio — Full-stack web & mobile developer specializing in modern, performant applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
