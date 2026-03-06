import { ChangeEvent } from 'react'

interface ItemInputProps {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  onAdd: () => void
}

export default function ItemInput({ value, onChange, onAdd }: ItemInputProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          항목 입력 (쉼표 또는 줄바꿈으로 구분)
        </label>
        <textarea
          value={value}
          onChange={onChange}
          placeholder="예: 김철수, 이영희, 박민준&#10;또는&#10;김철수&#10;이영희&#10;박민준"
          className="w-full h-24 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
      </div>
      <button
        onClick={onAdd}
        className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
      >
        항목 추가
      </button>
    </div>
  )
}
