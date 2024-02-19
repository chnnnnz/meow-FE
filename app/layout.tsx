import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/global.css'
import RootProvider from './RootProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEOWTIMES',
  description: 'MEOWTIMES 2.0',
}
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* @ts-ignore */}
      <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xeicon@2.3.3/xeicon.min.css" precedence="default" />
      <body className={inter.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
