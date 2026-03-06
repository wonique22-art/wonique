import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '팀 랜덤 선택기',
  description: '팀 의사결정을 공정하고 재미있게! 회식 메뉴, 발표 순서 등을 랜덤으로 선택합니다.',
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
