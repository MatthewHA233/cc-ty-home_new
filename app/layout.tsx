import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CC和汤圆的小栈',
  description: '欢迎来到CC和汤圆的小栈！',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ch">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
