'use client'

import { useState, useEffect, ChangeEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { parseQueryItems, parseTextItems, readFile, encodeItemsToUrl } from '@/utils/helpers'
import Header from '@/components/Header'
import ItemInput from '@/components/ItemInput'
import FileUpload from '@/components/FileUpload'
import ItemList from '@/components/ItemList'
import ActionButtons from '@/components/ActionButtons'

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [items, setItems] = useState<string[]>([])
  const [inputText, setInputText] = useState('')
  const [error, setError] = useState('')

  // URL 파라미터에서 항목 가져오기
  useEffect(() => {
    const queryItems = searchParams.get('items')
    if (queryItems) {
      const parsed = parseQueryItems(queryItems)
      setItems(parsed)
    }
  }, [searchParams])

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value)
    setError('')
  }

  // 항목 추가
  const handleAddItems = () => {
    const newItems = parseTextItems(inputText)
    if (newItems.length === 0) {
      setError('최소 1개의 항목을 입력해주세요.')
      return
    }
    setItems([...items, ...newItems])
    setInputText('')
  }

  // 항목 제거
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  // 파일 업로드 처리
  const handleFileUpload = async (file: File) => {
    try {
      setError('')
      const content = await readFile(file)
      const newItems = parseTextItems(content)
      if (newItems.length === 0) {
        setError('파일에 항목이 없습니다.')
        return
      }
      setItems([...items, ...newItems])
    } catch {
      setError('파일 읽기에 실패했습니다.')
    }
  }

  // 랜덤 선택
  const handlePickOne = () => {
    if (items.length === 0) {
      setError('선택할 항목이 없습니다.')
      return
    }
    const encoded = encodeItemsToUrl(items)
    router.push(`/select?items=${encoded}`)
  }

  // 순서 정하기
  const handleShuffle = () => {
    if (items.length === 0) {
      setError('셔플할 항목이 없습니다.')
      return
    }
    const encoded = encodeItemsToUrl(items)
    router.push(`/shuffle?items=${encoded}`)
  }

  // 초기화
  const handleReset = () => {
    setItems([])
    setInputText('')
    setError('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <Header />

        <div className="space-y-8">
          {/* 입력 영역 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">항목 입력</h2>

            {/* 직접 입력 */}
            <ItemInput
              value={inputText}
              onChange={handleTextChange}
              onAdd={handleAddItems}
            />

            {/* 파일 업로드 */}
            <FileUpload onFileSelect={handleFileUpload} />

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* 항목 리스트 */}
          {items.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                입력된 항목 ({items.length})
              </h2>
              <ItemList items={items} onRemove={handleRemoveItem} />
            </div>
          )}

          {/* 액션 버튼들 */}
          <ActionButtons
            disabled={items.length === 0}
            onPickOne={handlePickOne}
            onShuffle={handleShuffle}
            onReset={handleReset}
          />
        </div>
      </div>
    </div>
  )
}
