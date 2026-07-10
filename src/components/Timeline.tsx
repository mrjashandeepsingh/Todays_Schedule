import type { Period, DaySchedule } from '../data/timetable'
import { buildScheduleItems, isBreak, timeToMinutes, formatTimeRange } from '../data/timetable'

interface Props {
  daySchedule: DaySchedule
  isToday: boolean
  use12hr: boolean
}

function getStatus(period: Period, isToday: boolean): 'current' | 'done' | 'upcoming' {
  if (!isToday) return 'upcoming'
  const now = new Date()
  const nowMins = now.getHours() * 60 + now.getMinutes()
  const start = timeToMinutes(period.startTime)
  const end = timeToMinutes(period.endTime)
  if (nowMins >= start && nowMins < end) return 'current'
  if (nowMins >= end) return 'done'
  return 'upcoming'
}

const subjectColors: Record<string, string> = {
  'Lecture': '#EEF2FF',
  'Lab': '#F0FDF4',
  'Tutorial': '#FFF7ED',
}

const subjectBorder: Record<string, string> = {
  'Lecture': '#C7D2FE',
  'Lab': '#86EFAC',
  'Tutorial': '#FED7AA',
}

export default function Timeline({ daySchedule, isToday, use12hr }: Props) {
  const items = buildScheduleItems(daySchedule.periods)

  return (
    <div className="px-4 pb-10">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
        Full Schedule
      </h3>

      <div className="flex flex-col gap-2">
        {items.map((item, idx) => {
          if (isBreak(item)) {
            return (
              <div key={`break-${idx}`} className="flex items-center gap-3 py-1">
                <div className="w-12 text-right text-xs text-gray-400 shrink-0">
                  {item.startTime}
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <div className="h-px flex-1" style={{ background: '#E5E7EB' }} />
                  <span className="text-xs text-gray-400 font-medium shrink-0">{item.label}</span>
                  <div className="h-px flex-1" style={{ background: '#E5E7EB' }} />
                </div>
              </div>
            )
          }

          const period = item as Period
          const status = getStatus(period, isToday)
          const isCurrent = status === 'current'
          const isDone = status === 'done'
          const bgColor = isCurrent ? '#EEF2FF' : subjectColors[period.type] ?? '#F9FAFB'
          const borderColor = isCurrent ? '#4F46E5' : subjectBorder[period.type] ?? '#E5E7EB'
          const isLab = period.type === 'Lab'

          return (
            <div
              key={`${period.lectureNo}-${period.startTime}`}
              className="flex gap-3 items-stretch"
              style={{ opacity: isDone ? 0.45 : 1 }}
            >
              <div className="w-12 text-right text-xs text-gray-400 pt-3 shrink-0">
                {period.startTime}
              </div>

              <div
                className="flex-1 rounded-xl p-3.5 relative transition-all"
                style={{
                  background: bgColor,
                  borderLeft: `3px solid ${borderColor}`,
                  minHeight: isLab ? '80px' : 'auto',
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span
                        className="text-sm font-semibold leading-tight"
                        style={{ color: isCurrent ? '#3730A3' : '#111827' }}
                      >
                        {period.subject}
                      </span>
                      {isLab && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full"
                          style={{ background: '#D1FAE5', color: '#065F46' }}
                        >
                          Lab · {period.mergedPeriods} periods
                        </span>
                      )}
                      {isCurrent && (
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded-full flex items-center gap-1"
                          style={{ background: '#4F46E5', color: '#fff' }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
                          Now
                        </span>
                      )}
                      {isDone && (
                        <span className="text-xs text-gray-400">✓</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{period.faculty}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className="text-xs font-semibold px-2 py-1 rounded-lg"
                      style={{ background: 'rgba(0,0,0,0.05)', color: '#374151' }}
                    >
                      {period.room}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {formatTimeRange(period.startTime, period.endTime, use12hr)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
