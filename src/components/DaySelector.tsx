interface Props {
  days: string[]
  shorts: string[]
  selectedIndex: number
  todayIndex: number
  onSelect: (i: number) => void
  onBackToToday: () => void
}

export default function DaySelector({ days, shorts, selectedIndex, todayIndex, onSelect, onBackToToday }: Props) {
  return (
    <div className="px-4 mb-4">
      <div className="flex gap-2">
        {shorts.map((s, i) => {
          const isSelected = i === selectedIndex
          const isToday = i === todayIndex
          return (
            <button
              key={s}
              onClick={() => onSelect(i)}
              className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all duration-200 relative"
              style={{
                background: isSelected ? '#4F46E5' : '#F3F4F6',
                color: isSelected ? '#fff' : '#374151',
                boxShadow: isSelected ? '0 2px 8px rgba(79,70,229,0.25)' : 'none',
              }}
            >
              {s}
              {isToday && (
                <span
                  className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: isSelected ? 'rgba(255,255,255,0.7)' : '#4F46E5' }}
                />
              )}
            </button>
          )
        })}
      </div>
      {selectedIndex !== todayIndex && (
        <div className="mt-3 text-center">
          <button
            onClick={onBackToToday}
            className="text-xs font-semibold transition-colors"
            style={{ color: '#4F46E5' }}
          >
            ← Back to today
          </button>
        </div>
      )}
    </div>
  )
}
