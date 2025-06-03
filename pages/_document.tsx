import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon and App Icon */}
        <link rel="icon" href="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=32&q=80" />
        <link rel="apple-touch-icon" href="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=180&q=80" />
        {/* SEO Meta Tags */}
        <meta name="title" content="Hotel Explorer – Discover Unique Experiences" />
        <meta name="description" content="Explore and book unique hotel experiences. Interactive 3D map, beautiful UI, and more!" />
        <meta property="og:title" content="Hotel Explorer – Discover Unique Experiences" />
        <meta property="og:description" content="Explore and book unique hotel experiences. Interactive 3D map, beautiful UI, and more!" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" />
        <meta property="og:type" content="website" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 