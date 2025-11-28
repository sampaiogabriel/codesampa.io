import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CodeSampa',
    short_name: 'CodeSampa',
    description: 'Soluções Fullstack & Design por Gabriel Sampaio.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a', // Cor de fundo (Dark)
    theme_color: '#0047FF', // Seu Neon Blue (Aprox. do oklch configurado)
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
      // Idealmente, depois você deve adicionar ícones 192x192 e 512x512 aqui
    ]
  };
}
