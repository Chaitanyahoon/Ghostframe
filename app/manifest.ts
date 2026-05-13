import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'GhostFrame',
    short_name: 'GhostFrame',
    description: 'Multi-Level Corruption Protocol',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#0A0A0F',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
