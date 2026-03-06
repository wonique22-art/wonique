// 쿼리 파라미터로부터 항목 파싱
export function parseQueryItems(itemsStr: string | null): string[] {
  if (!itemsStr) return []
  return itemsStr
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
}

// 텍스트로부터 항목 파싱 (줄바꿈 또는 쉼표로 구분)
export function parseTextItems(text: string): string[] {
  const items = text
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item.length > 0)
  return items
}

// 파일 읽기
export async function readFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      resolve(content)
    }
    reader.onerror = reject
    reader.readAsText(file, 'UTF-8')
  })
}

// 랜덤 선택
export function pickRandom(items: string[]): string {
  if (items.length === 0) return ''
  return items[Math.floor(Math.random() * items.length)]
}

// 셔플 (Fisher-Yates)
export function shuffle(items: string[]): string[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// URL에 파라미터로 인코딩
export function encodeItemsToUrl(items: string[]): string {
  return encodeURIComponent(items.join(','))
}
