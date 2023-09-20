import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/sass/main.scss';
import { GlobalProvider } from '@/providers/GlobalContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'de Sá Incorporações',
  description: 'Imóveis de Qualidade',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalProvider>
          {children}
        </GlobalProvider>
      </body>
    </html>
  )
}
