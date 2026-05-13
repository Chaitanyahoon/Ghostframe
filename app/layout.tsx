import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GhostFrame — Glitch Horror Web Game',
  description: 'Trapped in a corrupted simulation. Solve 15 escalating CS puzzles — code fragments, logic gates, binary trees, and more — before the system collapses. Can you escape?',
  icons: {
    icon: '/icon-192x192.png',
  },
  openGraph: {
    title: 'GhostFrame — Glitch Horror Web Game',
    description: 'Trapped in a corrupted simulation. Solve 15 escalating CS puzzles before the system collapses.',
    type: 'website',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'GhostFrame',
  },
  formatDetection: {
    telephone: false,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const themeColor = '#000000'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>GhostFrame — Glitch Horror Web Game</title>
        <meta name="description" content="Trapped in a corrupted simulation. Solve 15 escalating CS puzzles before the system collapses." />
        <meta property="og:title" content="GhostFrame — Glitch Horror Web Game" />
        <meta property="og:description" content="Trapped in a corrupted simulation. Solve 15 escalating CS puzzles before the system collapses." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
