export default function Header() {
  return (
    <div className="text-center mb-10">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4">
        <span className="text-2xl">🎲</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
        팀 랜덤 선택기
      </h1>
      <p className="text-gray-600 text-lg">
        공정하고 재미있는 의사결정을 위해
      </p>
    </div>
  )
}
