import { EventType } from './calendar_types'

export function getEventStyle(type: EventType): string {
  const baseStyle = 'rbc-event'
  
  const typeStyles: Record<EventType, string> = {
    default: 'bg-blue-500 border-blue-600',
    important: 'bg-red-500 border-red-600',
    personal: 'bg-purple-500 border-purple-600',
    work: 'bg-green-500 border-green-600',
    holiday: 'bg-yellow-500 border-yellow-600',
  }

  return `${baseStyle} ${typeStyles[type]}`
}

