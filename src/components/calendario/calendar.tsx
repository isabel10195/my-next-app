'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/es'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { EventModal } from './calendar_event-modal'
import { DeleteEventDialog } from './calendar_delete-event-dialog'
import { CalendarHeader } from './calendar_header'
import { EventProps, ViewType } from './calendar_types'
import { fetchEvents, updateEvent, createEvent, deleteEvent } from './calendar_api'
import { getEventStyle } from './calendar_utils'

moment.locale('es')
const localizer = momentLocalizer(moment)

const DragAndDropCalendar = withDragAndDrop(BigCalendar)

export function Calendar() {
  const [selectedEvent, setSelectedEvent] = useState<EventProps | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [view, setView] = useState<ViewType>(Views.MONTH)
  const [date, setDate] = useState(new Date())
  
  const queryClient = useQueryClient()

  const { data: events = [], isLoading, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents
  })

  const createEventMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      setIsModalOpen(false)
      refetch() // Forzar una actualización de los eventos
    },
  })

  const updateEventMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      setIsModalOpen(false)
      refetch() // Forzar una actualización de los eventos
    },
  })

  const deleteEventMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
      setIsDeleteDialogOpen(false)
      setSelectedEvent(null)
      refetch() // Forzar una actualización de los eventos
    },
  })

  const handleSelectSlot = useCallback(
    ({ start, end }: { start: Date; end: Date }) => {
      setSelectedEvent({
        id: '',
        title: '',
        start,
        end,
        description: '',
        type: 'default',
        recurrence: null,
      })
      setIsModalOpen(true)
    },
    []
  )

  const handleSelectEvent = useCallback((event: EventProps) => {
    setSelectedEvent(event)
    setIsModalOpen(true)
  }, [])

  const handleEventDrop = useCallback(
    ({ event, start, end }: { event: EventProps; start: Date; end: Date }) => {
      updateEventMutation.mutate({
        ...event,
        start,
        end,
      })
    },
    [updateEventMutation]
  )

  const handleEventResize = useCallback(
    ({ event, start, end }: { event: EventProps; start: Date; end: Date }) => {
      updateEventMutation.mutate({
        ...event,
        start,
        end,
      })
    },
    [updateEventMutation]
  )

  const eventPropGetter = useCallback((event: EventProps) => {
    return {
      className: getEventStyle(event.type),
    }
  }, [])

  const { components, defaultDate } = useMemo(
    () => ({
      components: {
        toolbar: CalendarHeader,
      },
      defaultDate: new Date(),
    }),
    []
  )

  useEffect(() => {
    // Refrescar los eventos cuando cambie la vista o la fecha
    refetch()
  }, [view, date, refetch])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  return (
    <div className="flex h-screen flex-col p-4 space-y-4">
      <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold dark:text-white">Calendario</h1>
      <Button onClick={() => handleSelectSlot({ start: new Date(), end: new Date() })}>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Evento
        </Button>
      </div>

      <div className="flex-1 bg-white rounded-lg shadow">
        <DragAndDropCalendar
          localizer={localizer}
          events={events}
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 200px)' }}
          selectable
          resizable
          components={components}
          view={view}
          date={date}
          onView={setView as any}
          onNavigate={setDate}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleEventDrop}
          onEventResize={handleEventResize}
          eventPropGetter={eventPropGetter}
          popup
          tooltipAccessor="description"
        />
      </div>

      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedEvent(null)
        }}
        onDelete={() => {
          setIsModalOpen(false)
          setIsDeleteDialogOpen(true)
        }}
        onSave={(eventData) => {
          if (eventData.id) {
            updateEventMutation.mutate(eventData)
          } else {
            createEventMutation.mutate(eventData)
          }
        }}
      />

      <DeleteEventDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={() => {
          if (selectedEvent?.id) {
            deleteEventMutation.mutate(selectedEvent.id)
          }
        }}
      />
    </div>
  )
}

