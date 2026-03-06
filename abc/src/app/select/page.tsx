'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { parseQueryItems, pickRandom } from '@/utils/helpers'
import Link from 'next/link'

export default function SelectPage() {
  const searchParams = useSearchParams()
  const [items, setItems] = useState<string[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  useEffect(() => {
    const queryItems = searchParams.get('items')
    const parsed = parseQueryItems(queryItems)
    setItems(parsed)
  }, [searchParams])

  const handleSpin = () => {
    if (isSpinning || items.length === 0) return

    setIsSpinning(true)
    setResult(null)

    // 빠른 점멸 애니메이션
    const spinDuration = 2000
    const spinInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * items.length)
      setResult(items[randomIndex])
    }, 50)

    // 스핀 완료
    setTimeout(() => {
      clearInterval(spinInterval)
      const selected = pickRandom(items)
      setResult(selected)
      setIsSpinning(false)
    }, spinDuration)
  }

  const handleAgain = () => {
    setResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 font-medium">
            ← 돌아가기
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            랜덤 선택
          </h1>
          <p className="text-gray-600">스핀 버튼을 눌러 시작하세요</p>
        </div>

        {/* 스핀 휠 */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 mb-8">
          <div className="mb-8">
            <h2 className="text-center text-gray-600 text-sm uppercase tracking-widest font-semibold mb-6">
              남은 항목들
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 min-h-24 mb-8">
              {items.map((item, idx) => {
                const isSelected = result === item
                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg text-sm font-medium text-center transition-all ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white ring-4 ring-indigo-300 glow-effect'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item}
                  </div>
                )
              })}
            </div>
          </div>

          {/* 선택 결과 */}
          <div className="mb-8">
            <div className="h-32 sm:h-40 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 flex items-center justify-center mb-4">
              {result ? (
                <div className="text-center animate-bounce-custom">
                  <p className="text-gray-500 text-sm mb-2">당신이 선택되었습니다!</p>
                  <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {result}
                  </p>
                </div>
              ) : (
                <p className="text-gray-400 text-center">
                  <span className="text-3xl block mb-2">🎲</span>
                  결과를 기다리는 중...
                </p>
              )}
            </div>
          </div>

          {/* 버튼 */}
          <div className="space-y-3">
            <button
              onClick={handleSpin}
              disabled={isSpinning}
              className={`w-full py-4 px-6 rounded-lg font-bold text-white text-lg transition-all ${
                isSpinning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
              }`}
            >
              {isSpinning ? '⏳ 스핀 중...' : '🔄 다시 선택'}
            </button>
            {result && (
              <button
                onClick={handleAgain}
                className="w-full py-3 px-6 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                처음부터 다시
              </button>
            )}
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
