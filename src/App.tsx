import { useState } from 'react'
import Header from './components/Header'
import HeroCard from './components/HeroCard'
import DaySelector from './components/DaySelector'
import Timeline from './components/Timeline'
import { timetable } from './data/timetable'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
const SHORTS = timetable.map(d => d.short)

function getTodayIndex(): number {
  const day = new Date().getDay() // 0=Sun, 1=Mon...
  const idx = day - 1 // Mon=0, Fri=4
  return idx >= 0 && idx <= 4 ? idx : 0 // fallback to Mon on weekend
}

export default function App() {
  const todayIndex = getTodayIndex()
  const [selectedIndex, setSelectedIndex] = useState(todayIndex)
  const [use12hr, setUse12hr] = useState(false)

  const selectedDay = timetable[selectedIndex]
  const isToday = selectedIndex === todayIndex

  return (
    <div
      className="min-h-screen max-w-md mx-auto relative"
      style={{ background: '#FAFAFA', fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <Header use12hr={use12hr} />

      {/* 12hr toggle */}
      <div className="px-5 mb-4 flex justify-end">
        <button
          onClick={() => setUse12hr(v => !v)}
          className="flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
          style={{
            background: use12hr ? '#EEF2FF' : '#F3F4F6',
            color: use12hr ? '#4F46E5' : '#6B7280',
          }}
        >
          {use12hr ? '12h' : '24h'}
        </button>
      </div>

      {/* Day Selector */}
      <DaySelector
        days={DAYS}
        shorts={SHORTS}
        selectedIndex={selectedIndex}
        todayIndex={todayIndex}
        onSelect={setSelectedIndex}
        onBackToToday={() => setSelectedIndex(todayIndex)}
      />

      {/* Hero "Right Now" card */}
      <div className="mb-5">
        <h3 className="px-5 text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          Right Now
        </h3>
        <div
          key={selectedIndex}
          style={{ animation: 'fadeIn 0.2s ease' }}
        >
          <HeroCard
            daySchedule={selectedDay}
            isToday={isToday}
            use12hr={use12hr}
          />
        </div>
      </div>

      {/* Full timeline */}
      <div key={`tl-${selectedIndex}`} style={{ animation: 'fadeIn 0.25s ease' }}>
        <Timeline
          daySchedule={selectedDay}
          isToday={isToday}
          use12hr={use12hr}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
