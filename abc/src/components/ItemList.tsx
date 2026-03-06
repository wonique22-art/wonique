interface ItemListProps {
  items: string[]
  onRemove: (index: number) => void
}

export default function ItemList({ items, onRemove }: ItemListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200 hover:shadow-md group"
        >
          <span className="font-medium text-gray-800 truncate flex-1">{item}</span>
          <button
            onClick={() => onRemove(index)}
            className="ml-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
