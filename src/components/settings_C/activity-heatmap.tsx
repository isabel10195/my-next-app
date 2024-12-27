"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Generate sample activity data
const generateActivityData = () => {
  const data = []
  const now = new Date()
  for (let i = 0; i < 357; i++) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    data.unshift({
      date: date.toISOString().split('T')[0],
      count: Math.floor(Math.random() * 10)
    })
  }
  return data
}

const activityData = generateActivityData()

function ActivityCell({ date, count }: { date: string, count: number }) {
  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-muted"
    if (count <= 3) return "bg-blue-200"
    if (count <= 6) return "bg-blue-400"
    return "bg-blue-600"
  }

  return (
    <TooltipTrigger asChild>
      <div
        className={`h-3 w-3 rounded-sm ${getActivityColor(count)}`}
        data-date={date}
      />
    </TooltipTrigger>
  )
}

export function ActivityHeatmap() {
  // Group data by weeks
  const weeks = activityData.reduce((acc: any[][], item, i) => {
    const weekIndex = Math.floor(i / 7)
    if (!acc[weekIndex]) acc[weekIndex] = []
    acc[weekIndex].push(item)
    return acc
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day) => (
                  <Tooltip key={day.date}>
                    <ActivityCell date={day.date} count={day.count} />
                    <TooltipContent>
                      {day.count} activities on {day.date}
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}

