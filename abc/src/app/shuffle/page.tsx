'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { parseQueryItems, shuffle } from '@/utils/helpers'
import Link from 'next/link'

export default function ShufflePage() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState<string[]>([])
  const [shuffled, setShuffled] = useState<string[]>([])
  const [isShuffling, setIsShuffling] = useState(false)

  useEffect(() => {
    const queryItems = searchParams.get('items')
    const parsed = parseQueryItems(queryItems)
    setItems(parsed)
    setShuffled(shuffle(parsed))
  }, [searchParams])

  const handleShuffle = () => {
    if (isShuffling) return

    setIsShuffling(true)

    // 셔플 애니메이션 중 여러 번 섞기
    const shuffleInterval = setInterval(() => {
      setShuffled(shuffle(items))
    }, 100)

    setTimeout(() => {
      clearInterval(shuffleInterval)
      setShuffled(shuffle(items))
      setIsShuffling(false)
    }, 1500)
  }

  const handleDownload = () => {
    const text = shuffled.map((item, idx) => `${idx + 1}. ${item}`).join('\n')
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    element.setAttribute('download', 'team-order.txt')
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleCopyToClipboard = () => {
    const text = shuffled.map((item, idx) => `${idx + 1}. ${item}`).join('\n')
    navigator.clipboard.writeText(text)
    alert('복사되었습니다!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium">
            ← 돌아가기
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
            순서 정하기
          </h1>
          <p className="text-gray-600">셔플 버튼을 눌러 순서를 정하세요</p>
        </div>

        {/* 카드 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-8">
          {/* 순서 리스트 */}
          <div className="mb-8">
            <h2 className="text-center text-gray-600 text-sm uppercase tracking-widest font-semibold mb-6">
              최종 순서
            </h2>
            <div className="space-y-3">
              {shuffled.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200 hover:shadow-md transition-all group"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="flex-1 font-semibold text-gray-800">{item}</span>
                  <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    {['🥇', '🥈', '🥉'][idx] || '✨'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="space-y-3">
            <button
              onClick={handleShuffle}
              disabled={isShuffling}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all ${
                isShuffling
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
              }`}
            >
              {isShuffling ? '🔀 셔플 중...' : '🔀 다시 셔플'}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleDownload}
                className="py-3 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded-lg border border-blue-200 transition-colors"
              >
                📥 다운로드
              </button>
              <button
                onClick={handleCopyToClipboard}
                className="py-3 px-4 bg-green-50 hover:bg-green-100 text-green-700 font-medium rounded-lg border border-green-200 transition-colors"
              >
                📋 복사
              </button>
            </div>

            <Link
              href="/"
              className="block text-center py-3 px-6 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
