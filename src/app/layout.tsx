import '../../styles/globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MoodBoard AI',
  description: 'Whimsical pastel anime-style mood boards',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-pastelPeach min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
