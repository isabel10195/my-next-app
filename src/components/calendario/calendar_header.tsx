import { NavigateAction, View } from 'react-big-calendar'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/calendario/select"

interface CalendarHeaderProps {
  date: Date
  view: View
  onNavigate: (action: NavigateAction) => void
  onView: (view: View) => void
}

const viewOptions = [
  { value: 'month', label: 'Mes' },
  { value: 'week', label: 'Semana' },
  { value: 'day', label: 'Día' },
  { value: 'agenda', label: 'Agenda' },
]

export function CalendarHeader({ date, view, onNavigate, onView }: CalendarHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center p-4 gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate('PREV')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onNavigate('NEXT')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(date, 'MMMM yyyy', { locale: es })}
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('TODAY')}
        >
          Hoy
        </Button>
      </div>
      <Select value={view} onValueChange={(value) => onView(value as View)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona una vista" />
        </SelectTrigger>
        <SelectContent>
          {viewOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

