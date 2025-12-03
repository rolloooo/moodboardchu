import "./globals.css";
import { M_PLUS_Rounded_1c } from "next/font/google";

export const metadata = {
  title: "MoodBoard",
  description: "A simple mood board on the cloud",
};

const mPlus = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-anime",
});


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={mPlus.variable}>
      <body>{children}</body>
    </html>
  );
}
