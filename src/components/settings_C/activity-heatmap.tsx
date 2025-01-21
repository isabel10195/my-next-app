"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/MultimediaCard/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/settings_C/tooltip";

// Generar datos de actividad con valores predecibles
const generateActivityData = () => {
  const data: { date: string; count: number }[] = [];
  const now = new Date();
  for (let i = 0; i < 357; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);

    // Generar valores predecibles basados en el índice
    const count = (i % 10) + 1; // Valores entre 1 y 10
    data.unshift({
      date: date.toISOString().split("T")[0],
      count,
    });
  }
  return data;
};

interface ActivityCellProps {
  date: string;
  count: number;
}

function ActivityCell({ date, count }: ActivityCellProps) {
  const getActivityColor = (count: number) => {
    if (count === 0) return "bg-muted";
    if (count <= 3) return "bg-blue-200";
    if (count <= 6) return "bg-blue-400";
    return "bg-blue-600";
  };

  return (
    <TooltipTrigger asChild>
      <div className={`h-3 w-3 rounded-sm ${getActivityColor(count)}`} data-date={date} />
    </TooltipTrigger>
  );
}

export function ActivityHeatmap() {
  const [activityData, setActivityData] = useState<{ date: string; count: number }[]>([]);

  useEffect(() => {
    setActivityData(generateActivityData());
  }, []);

  // Agrupar datos por semanas
  const weeks = activityData.reduce((acc: { date: string; count: number }[][], item, i) => {
    const weekIndex = Math.floor(i / 7);
    if (!acc[weekIndex]) acc[weekIndex] = [];
    acc[weekIndex].push(item);
    return acc;
  }, []);

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
  );
}
