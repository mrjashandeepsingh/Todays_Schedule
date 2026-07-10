import { useState, useEffect } from 'react'
import type { DaySchedule, Period } from '../data/timetable'
import { timeToMinutes, formatTimeRange } from '../data/timetable'

interface Props {
  daySchedule: DaySchedule
  isToday: boolean
  use12hr: boolean
}

type LiveState =
  | { status: 'in-progress'; period: Period; elapsed: number; total: number; endsIn: number }
  | { status: 'break'; nextPeriod: Period | null; startsIn: number }
  | { status: 'before'; nextPeriod: Period; startsIn: number }
  | { status: 'after' }
  | { status: 'weekend' }

function computeLiveState(periods: Period[]): LiveState {
  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()

  for (const p of periods) {
    const start = timeToMinutes(p.startTime)
    const end = timeToMinutes(p.endTime)
    if (nowMins >= start && nowMins < end) {
      return {
        status: 'in-progress',
        period: p,
        elapsed: nowMins - start,
        total: end - start,
        endsIn: end - nowMins,
      }
    }
  }

  // Check if we're in a gap between periods
  for (let i = 0; i < periods.length - 1; i++) {
    const end = timeToMinutes(periods[i].endTime)
    const next = timeToMinutes(periods[i + 1].startTime)
    if (nowMins >= end && nowMins < next) {
      return { status: 'break', nextPeriod: periods[i + 1], startsIn: next - nowMins }
    }
  }

  const first = periods[0]
  const firstStart = timeToMinutes(first.startTime)
  if (nowMins < firstStart) {
    return { status: 'before', nextPeriod: first, startsIn: firstStart - nowMins }
  }

  return { status: 'after' }
}

function LiveInProgress({ period, elapsed, total, endsIn, use12hr }: {
  period: Period; elapsed: number; total: number; endsIn: number; use12hr: boolean
}) {
  const pct = Math.min(100, (elapsed / total) * 100)
  const tag = period.type === 'Lab' ? 'Lab Session' : `Lecture ${period.lectureNo}`

  return (
    <div
      className="mx-4 rounded-2xl p-5 mb-1"
      style={{ background: '#4F46E5' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3"
            style={{ background: 'rgba(255,255,255,0.18)', color: '#fff' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
            Live Now
          </span>
          <h2 className="text-xl font-bold text-white leading-tight">{period.subject}</h2>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.75)' }}>{period.faculty}</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-medium mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>{tag}</div>
          <div
            className="text-sm font-semibold px-2.5 py-1 rounded-lg"
            style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}
          >
            {period.room}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs mb-2.5" style={{ color: 'rgba(255,255,255,0.65)' }}>
        <span>{formatTimeRange(period.startTime, period.endTime, use12hr)}</span>
        <span className="font-semibold text-white">Ends in {endsIn} min</span>
      </div>

      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }}>
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: '#fff' }}
        />
      </div>
    </div>
  )
}

function LiveBreak({ nextPeriod, startsIn, use12hr }: {
  nextPeriod: Period | null; startsIn: number; use12hr: boolean
}) {
  return (
    <div className="mx-4 rounded-2xl p-5 mb-1" style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: '#E5E7EB' }}>
          ☕
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">On a break</div>
          <div className="text-xs text-gray-500">Catch your breath</div>
        </div>
      </div>
      {nextPeriod && (
        <div className="flex items-center justify-between text-sm pt-3" style={{ borderTop: '1px solid #E5E7EB' }}>
          <span className="text-gray-500">
            Next: <span className="font-medium text-gray-800">{nextPeriod.shortSubject ?? nextPeriod.subject}</span>
          </span>
          <span className="font-semibold" style={{ color: '#4F46E5' }}>in {startsIn} min</span>
        </div>
      )}
    </div>
  )
}

function LiveBefore({ nextPeriod, startsIn, use12hr }: {
  nextPeriod: Period; startsIn: number; use12hr: boolean
}) {
  return (
    <div className="mx-4 rounded-2xl p-5 mb-1" style={{ background: '#EEF2FF', border: '1px solid #C7D2FE' }}>
      <div className="text-sm font-semibold mb-1" style={{ color: '#4338CA' }}>Classes start soon</div>
      <div className="text-xs text-indigo-500">
        First up: <span className="font-semibold">{nextPeriod.subject}</span>
      </div>
      <div className="mt-3 text-xs text-indigo-400">
        {formatTimeRange(nextPeriod.startTime, nextPeriod.endTime, use12hr)} · {startsIn} min away
      </div>
    </div>
  )
}

function LiveAfter() {
  return (
    <div className="mx-4 rounded-2xl p-5 mb-1" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB' }}>
      <div className="text-sm font-semibold text-gray-700 mb-1">All done for today</div>
      <div className="text-xs text-gray-400">No more classes. See you tomorrow!</div>
    </div>
  )
}

export default function HeroCard({ daySchedule, isToday, use12hr }: Props) {
  const [liveState, setLiveState] = useState<LiveState>(() =>
    computeLiveState(daySchedule.periods)
  )

  useEffect(() => {
    if (!isToday) return
    const id = setInterval(() => setLiveState(computeLiveState(daySchedule.periods)), 30_000)
    return () => clearInterval(id)
  }, [daySchedule, isToday])

  useEffect(() => {
    if (isToday) setLiveState(computeLiveState(daySchedule.periods))
  }, [daySchedule, isToday])

  if (!isToday) {
    return (
      <div className="mx-4 rounded-2xl p-5 mb-1" style={{ background: '#F3F4F6', border: '1px solid #E5E7EB' }}>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-2 h-2 rounded-full" style={{ background: '#9CA3AF' }} />
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Browsing</span>
        </div>
        <div className="text-sm font-semibold text-gray-700">Viewing {daySchedule.day}'s schedule</div>
        <div className="text-xs text-gray-400 mt-1">Live tracking only available for today</div>
      </div>
    )
  }

  if (liveState.status === 'in-progress') {
    return <LiveInProgress {...liveState} use12hr={use12hr} />
  }
  if (liveState.status === 'break') {
    return <LiveBreak {...liveState} use12hr={use12hr} />
  }
  if (liveState.status === 'before') {
    return <LiveBefore {...liveState} use12hr={use12hr} />
  }
  return <LiveAfter />
}
