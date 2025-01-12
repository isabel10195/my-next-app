import { Views } from 'react-big-calendar'

export type EventType = 'default' | 'important' | 'personal' | 'work' | 'holiday'

export interface EventProps {
  id: string
  title: string
  start: Date
  end: Date
  description?: string
  type: EventType
  recurrence: RecurrenceRule | null
}

export interface RecurrenceRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
  interval: number
  endDate?: Date
  daysOfWeek?: number[]
}

export type ViewType = typeof Views[keyof typeof Views]

