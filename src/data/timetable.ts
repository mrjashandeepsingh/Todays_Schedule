export type PeriodType = 'Lecture' | 'Lab' | 'Tutorial'

export interface Period {
  lectureNo: number
  subject: string
  shortSubject: string
  faculty: string
  room: string
  startTime: string
  endTime: string
  type: PeriodType
  mergedPeriods?: number
}

export interface BreakSlot {
  kind: 'break'
  label: string
  startTime: string
  endTime: string
}

export type ScheduleItem = Period | BreakSlot

export interface DaySchedule {
  day: string
  short: string
  periods: Period[]
}

export function isBreak(item: ScheduleItem): item is BreakSlot {
  return (item as BreakSlot).kind === 'break'
}

export const timetable: DaySchedule[] = [
  {
    day: 'Monday',
    short: 'Mon',
    periods: [
      {
        lectureNo: 1,
        subject: 'FS Lab D1',
        shortSubject: 'FS LAB D1',
        faculty: 'Dr. Natasha',
        room: 'Dell Lab',
        startTime: '09:15',
        endTime: '11:05',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 1,
        subject: 'OOPS Lab D2',
        shortSubject: 'OOPS LAB D2',
        faculty: 'Dr. Abhishek',
        room: 'Lab 404',
        startTime: '09:15',
        endTime: '11:05',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 3,
        subject: 'APT-CPP',
        shortSubject: 'APT-CPP',
        faculty: 'Ms. Sonu Kumari',
        room: 'LH 205',
        startTime: '11:05',
        endTime: '12:00',
        type: 'Lecture',
      },
      {
        lectureNo: 4,
        subject: 'Digital Electronics',
        shortSubject: 'DE',
        faculty: 'Ms. Jagdeep',
        room: 'LH 205',
        startTime: '12:00',
        endTime: '12:55',
        type: 'Lecture',
      },
      {
        lectureNo: 6,
        subject: 'Mathematics III',
        shortSubject: 'M3',
        faculty: 'Ms. Mamta',
        room: 'LH 205',
        startTime: '13:50',
        endTime: '14:45',
        type: 'Lecture',
      },
      {
        lectureNo: 7,
        subject: 'Object Oriented Programming',
        shortSubject: 'OOPS',
        faculty: 'Dr. Abhishek',
        room: 'LH 205',
        startTime: '14:45',
        endTime: '15:40',
        type: 'Lecture',
      },
    ],
  },

  {
    day: 'Tuesday',
    short: 'Tue',
    periods: [
      {
        lectureNo: 1,
        subject: 'Mathematics III',
        shortSubject: 'M3',
        faculty: 'Ms. Mamta',
        room: 'LH 205',
        startTime: '09:15',
        endTime: '10:10',
        type: 'Lecture',
      },
      {
        lectureNo: 2,
        subject: 'Data Structures & Algorithms',
        shortSubject: 'DSA',
        faculty: 'Ms. Sukhdeep Kaur',
        room: 'LH 205',
        startTime: '10:10',
        endTime: '11:05',
        type: 'Lecture',
      },
      {
        lectureNo: 3,
        subject: 'Digital Electronics',
        shortSubject: 'DE',
        faculty: 'Ms. Jagdeep',
        room: 'LH 205',
        startTime: '11:05',
        endTime: '12:00',
        type: 'Lecture',
      },
      {
        lectureNo: 4,
        subject: 'Verbal',
        shortSubject: 'VER',
        faculty: 'Ms. Deepshikha',
        room: 'LH 205',
        startTime: '12:00',
        endTime: '12:55',
        type: 'Lecture',
      },
      {
        lectureNo: 6,
        subject: 'Object Oriented Programming',
        shortSubject: 'OOPS',
        faculty: 'Dr. Abhishek',
        room: 'LH 205',
        startTime: '13:50',
        endTime: '14:45',
        type: 'Lecture',
      },
      {
        lectureNo: 7,
        subject: 'Design Thinking',
        shortSubject: 'DT',
        faculty: 'Mr. Arvind Chahal',
        room: 'LH 205',
        startTime: '14:45',
        endTime: '15:40',
        type: 'Lecture',
      },
    ],
  },

  {
    day: 'Wednesday',
    short: 'Wed',
    periods: [
      {
        lectureNo: 1,
        subject: 'Mathematics III',
        shortSubject: 'M3',
        faculty: 'Ms. Mamta',
        room: 'LH 205',
        startTime: '09:15',
        endTime: '10:10',
        type: 'Lecture',
      },
      {
        lectureNo: 2,
        subject: 'Data Structures & Algorithms',
        shortSubject: 'DSA',
        faculty: 'Ms. Sukhdeep Kaur',
        room: 'LH 205',
        startTime: '10:10',
        endTime: '11:05',
        type: 'Lecture',
      },
      {
        lectureNo: 3,
        subject: 'OOPS Lab D1',
        shortSubject: 'OOPS LAB D2',
        faculty: 'Dr. Abhishek',
        room: 'Lab 204',
        startTime: '11:00',
        endTime: '12:50',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 3,
        subject: 'DSA Lab D2',
        shortSubject: 'DSA LAB D2',
        faculty: 'Ms. Sukhdeep Kaur',
        room: 'Lab 312',
        startTime: '11:05',
        endTime: '12:55',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 6,
        subject: 'OOPS Lab D1',
        shortSubject: 'OOPS LAB D1',
        faculty: 'Mr. Mudasir',
        room: 'Lab 004',
        startTime: '13:50',
        endTime: '15:40',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 6,
        subject: 'DE Lab D2',
        shortSubject: 'DE LAB D2',
        faculty: 'Ms. Jagdeep',
        room: 'Lab 313',
        startTime: '13:50',
        endTime: '15:40',
        type: 'Lab',
        mergedPeriods: 2,
      },
    ],
  },

  {
    day: 'Thursday',
    short: 'Thu',
    periods: [
      {
        lectureNo: 1,
        subject: 'DE Lab D1',
        shortSubject: 'DE LAB D1',
        faculty: 'Ms. Jagdeep',
        room: 'Lab 313',
        startTime: '09:15',
        endTime: '11:05',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 1,
        subject: 'FS Lab D2',
        shortSubject: 'FS LAB D2',
        faculty: 'Dr. Natasha',
        room: 'Dell Lab',
        startTime: '09:15',
        endTime: '11:05',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 3,
        subject: 'Digital Electronics',
        shortSubject: 'DE',
        faculty: 'Ms. Jagdeep',
        room: 'LH 205',
        startTime: '11:05',
        endTime: '12:00',
        type: 'Lecture',
      },
      {
        lectureNo: 4,
        subject: 'Mathematics III',
        shortSubject: 'M3',
        faculty: 'Ms. Mamta',
        room: 'LH 205',
        startTime: '12:00',
        endTime: '12:55',
        type: 'Lecture',
      },
      {
        lectureNo: 6,
        subject: 'DSA Lab D1',
        shortSubject: 'DSA LAB D1',
        faculty: 'Ms. Sukhdeep Kaur',
        room: 'B7 Lab',
        startTime: '13:50',
        endTime: '15:40',
        type: 'Lab',
        mergedPeriods: 2,
      },
      {
        lectureNo: 6,
        subject: 'OOPS Lab D2',
        shortSubject: 'OOPS LAB D2',
        faculty: 'Mr. Pradeep',
        room: 'Lab 004',
        startTime: '13:50',
        endTime: '15:40',
        type: 'Lab',
        mergedPeriods: 2,
      },
    ],
  },

  {
    day: 'Friday',
    short: 'Fri',
    periods: [
      {
        lectureNo: 1,
        subject: 'APT-CPP',
        shortSubject: 'APT-CPP',
        faculty: 'Ms. Sonu Kumari',
        room: 'TPP',
        startTime: '09:15',
        endTime: '10:10',
        type: 'Lecture',
      },
      {
        lectureNo: 2,
        subject: 'Design Thinking',
        shortSubject: 'DT',
        faculty: 'Mr. Arvind Chahal',
        room: 'LH 205',
        startTime: '10:10',
        endTime: '11:05',
        type: 'Lecture',
      },
      {
        lectureNo: 3,
        subject: 'Data Structures & Algorithms',
        shortSubject: 'DSA',
        faculty: 'Ms. Sukhdeep Kaur',
        room: 'LH 205',
        startTime: '11:05',
        endTime: '12:00',
        type: 'Lecture',
      },
      {
        lectureNo: 4,
        subject: 'Verbal',
        shortSubject: 'VER',
        faculty: 'Ms. Deepshikha',
        room: 'LH 205',
        startTime: '12:00',
        endTime: '12:55',
        type: 'Lecture',
      },
      {
        lectureNo: 6,
        subject: 'Mathematics III',
        shortSubject: 'M3',
        faculty: 'Ms. Mamta',
        room: 'LH 205',
        startTime: '13:50',
        endTime: '14:45',
        type: 'Lecture',
      },
      {
        lectureNo: 7,
        subject: 'Object Oriented Programming',
        shortSubject: 'OOPS',
        faculty: 'Dr. Abhishek',
        room: 'LH 205',
        startTime: '14:45',
        endTime: '15:40',
        type: 'Lecture',
      },
    ],
  },
];

export const LUNCH_BREAK: BreakSlot = { kind: 'break', label: 'Lunch Break', startTime: '12:55', endTime: '13:50' }

export function buildScheduleItems(periods: Period[]): ScheduleItem[] {
  const items: ScheduleItem[] = []
  for (const p of periods) {
    if (p.startTime === '11:00' || (items.length > 0 && (items[items.length - 1] as Period).endTime === '10:50')) {
      // check if we need to insert short break
    }
    items.push(p)
  }

  // Insert breaks between periods
  const result: ScheduleItem[] = []
  for (let i = 0; i < periods.length; i++) {
    const p = periods[i]
    // Insert lunch if gap after 12:50
    if (i > 0 && periods[i - 1].endTime === '12:50' && p.startTime === '13:50') {
      result.push({ kind: 'break', label: 'Lunch Break', startTime: '12:50', endTime: '13:50' })
    }
    result.push(p)
  }
  return result
}

export function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

export function minutesToDisplay(mins: number, use12hr: boolean): string {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  if (use12hr) {
    const period = h >= 12 ? 'PM' : 'AM'
    const h12 = h % 12 || 12
    return `${h12}:${String(m).padStart(2, '0')} ${period}`
  }
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function formatTimeRange(start: string, end: string, use12hr: boolean): string {
  const startMins = timeToMinutes(start)
  const endMins = timeToMinutes(end)
  return `${minutesToDisplay(startMins, use12hr)} – ${minutesToDisplay(endMins, use12hr)}`
}
