import type { Metadata } from 'next';
import { Playfair_Display, Lora } from 'next/font/google';
import './globals.css';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export const metadata: Metadata = {
  title: 'Lets Cozinha',
  description: 'Receitas para você com a Lets Cozinha',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <body className={lora.className}>
        <header className="bg-primary text-neutral p-5">
          <h1>Lets Cozinha</h1>
        </header>
        <main className="container mx-auto my-5">{children}</main>
        <footer className="bg-primary text-neutral p-5">
          <p>© 2024 Lets Cozinha</p>
        </footer>
      </body>
    </html>
  );
}
