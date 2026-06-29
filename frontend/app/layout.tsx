import "./globals.css";
import { Inter, Aleo } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const aleo = Aleo({
  subsets: ["latin"],
  variable: "--font-aleo",
});

export const metadata = {
  title: "Cinematic Metadata Intelligence Platform",
  description: "Azure + Microsoft Fabric Movie Analytics",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${aleo.variable}`}>
        {children}
      </body>
    </html>
  );
}