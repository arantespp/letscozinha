import { Html, Head, Main, NextScript } from 'next/document';
import { Playfair_Display, Lora } from 'next/font/google';

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
});

export default function Document() {
  return (
    <Html
      lang="pt-br"
      className={`${playfairDisplay.variable} ${lora.variable}`}
    >
      <Head>
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
