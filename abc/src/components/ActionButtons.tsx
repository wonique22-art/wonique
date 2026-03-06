import Link from 'next/link'

interface ActionButtonsProps {
  disabled: boolean
  onPickOne: () => void
  onShuffle: () => void
  onReset: () => void
}

export default function ActionButtons({
  disabled,
  onPickOne,
  onShuffle,
  onReset,
}: ActionButtonsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={onPickOne}
          disabled={disabled}
          className={`px-6 py-3 rounded-lg font-bold text-white transition-all text-lg ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
          }`}
        >
          🎯 랜덤 선택
        </button>
        <button
          onClick={onShuffle}
          disabled={disabled}
          className={`px-6 py-3 rounded-lg font-bold text-white transition-all text-lg ${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
          }`}
        >
          🔀 순서 정하기
        </button>
      </div>
      {!disabled && (
        <button
          onClick={onReset}
          className="w-full px-6 py-2 text-gray-600 hover:text-gray-800 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          초기화
        </button>
      )}
    </div>
  )
}
