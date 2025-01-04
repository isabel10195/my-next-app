'use client';

import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import { motion } from 'framer-motion';

export default function StyledCalendar() {
  return (
    <div className="p-4">
      <Calendar 
        isReadOnly 
        aria-label="Date (Read Only)" 
        value={today(getLocalTimeZone())}
        className="rounded-lg border-none"
        classNames={{
          base: "p-4 dark:bg-gradient-to-t from-blue-400 to-blue-950", 
          days: "text-white",
          monthAndYear: "text-white font-semibold"
        }}
      />
    </div>
  );
}
