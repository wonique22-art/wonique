'use client'

import { ChangeEvent, DragEvent, useRef } from 'react'
import { readFile } from '@/utils/helpers'

interface FileUploadProps {
  onFileSelect: (file: File) => void
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dragOverRef = useRef(false)

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragOverRef.current = true
  }

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragOverRef.current = false
  }

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragOverRef.current = false

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        onFileSelect(file)
      }
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      onFileSelect(files[0])
    }
  }

  return (
    <div className="mt-6 pt-6 border-t border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        파일 업로드 (.txt)
      </label>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragOverRef.current
            ? 'border-indigo-500 bg-indigo-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => inputRef.current?.click()}
      >
        <div className="text-4xl mb-2">📄</div>
        <p className="text-gray-700 font-medium">
          파일을 드래그하거나 클릭하여 업로드
        </p>
        <p className="text-sm text-gray-500 mt-1">
          한 줄에 하나의 항목
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
}
