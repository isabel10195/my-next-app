import { EventProps } from './calendar_types'

// Simulación de una base de datos en memoria
let events: EventProps[] = [
  {
    id: '1',
    title: 'Reunión de equipo',
    start: new Date(2024, 0, 15, 10, 0),
    end: new Date(2024, 0, 15, 11, 30),
    description: 'Reunión semanal de seguimiento',
    type: 'work',
    recurrence: null,
  },
  {
    id: '2',
    title: 'Almuerzo con cliente',
    start: new Date(2024, 0, 16, 13, 0),
    end: new Date(2024, 0, 16, 14, 30),
    description: 'Restaurante por confirmar',
    type: 'important',
    recurrence: null,
  },
]

export async function fetchEvents(): Promise<EventProps[]> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  return events
}

export async function createEvent(event: EventProps): Promise<EventProps> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const newEvent = {
    ...event,
    id: Math.random().toString(36).substr(2, 9),
  }
  events.push(newEvent)
  return newEvent
}

export async function updateEvent(event: EventProps): Promise<EventProps> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const index = events.findIndex(e => e.id === event.id)
  if (index !== -1) {
    events[index] = event
  }
  return event
}

export async function deleteEvent(eventId: string): Promise<void> {
  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))
  
  events = events.filter(e => e.id !== eventId)
}

