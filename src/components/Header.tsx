import { useState, useEffect } from 'react'

function padTwo(n: number) {
  return String(n).padStart(2, '0')
}

interface Props {
  use12hr: boolean
}

export default function Header({ use12hr }: Props) {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const raw = now.getHours()
  const h = use12hr ? padTwo(raw % 12 || 12) : padTwo(raw)
  const m = padTwo(now.getMinutes())
  const s = padTwo(now.getSeconds())
  const period = use12hr ? (raw >= 12 ? ' PM' : ' AM') : ''

  const dateStr = now.toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })

  return (
    <header className="px-5 pt-8 pb-5 flex items-start justify-between">
      <div>
        <div className="flex items-center gap-2.5 mb-1">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: '#4F46E5' }}
          >
            <span className="text-white text-xs font-bold tracking-tight">D</span>
          </div>
          <span className="text-sm font-semibold tracking-wide text-gray-400 uppercase">
            CSE&nbsp;·&nbsp;Section D
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5">{dateStr}</p>
      </div>

      <div className="text-right">
        <div
          className="text-2xl font-semibold tabular-nums tracking-tight"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: '#111827' }}
        >
          {h}:{m}
          <span className="text-lg" style={{ color: '#9CA3AF' }}>:{s}</span>
          {period && <span className="text-base ml-1" style={{ color: '#9CA3AF' }}>{period}</span>}
        </div>
      </div>
    </header>
  )
}
