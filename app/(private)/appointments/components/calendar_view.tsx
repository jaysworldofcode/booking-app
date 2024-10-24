"use client"

import React, { useState } from 'react'
import { addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, isSameDay } from 'date-fns'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MonthPicker } from "@/components/custom/monthpicker";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils"

interface Event {
  id: string
  title: string
  date: Date
  color: string
  time?: string
}

export default function CalendarView() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([
    { id: '1', title: 'Start of next spending period (28)', date: new Date(2022, 4, 25), color: 'bg-pink-500', time: '05:10' },
    { id: '2', title: 'Potential dispatch of referendum 186 (if passed)', date: new Date(2022, 4, 25), color: 'bg-purple-500', time: '22:21' },
    { id: '3', title: 'Start of the next referendum voting period (24)', date: new Date(2022, 4, 29), color: 'bg-pink-500', time: '05:10' },
    { id: '4', title: 'Execute named scheduled task 0x5d005000000000000000000000000000', date: new Date(2022, 5, 1), color: 'bg-blue-500', time: '00:41' },
    { id: '5', title: 'Start of the next parachain lease period 21', date: new Date(2022, 5, 15), color: 'bg-gray-500', time: '22:23' },
  ])

  const startDate = startOfMonth(currentDate)
  const endDate = endOfMonth(currentDate)
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [dates, setDates] = React.useState<{ start: Date; end: Date }>();

  return (
    <Card className="w-full p-4 mt-8">
        <CardContent className="p-0">
            <div className="flex justify-between items-center p-4 border-b">
            <Button variant="ghost" size="sm" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-xl font-semibold">{format(currentDate, 'MMMM yyyy')}</h2>
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant={"outline"} className={cn("w-[280px] justify-start text-left font-normal", !dates && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dates ? `${format(dates.start, "MMM yyyy")} - ${format(dates.end, "MMM yyyy")}` : <span>Filter by month</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                    <MonthPicker />
                </PopoverContent>
            </Popover>
            <Button variant="ghost" size="sm" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
            </Button>
            </div>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
            {weekDays.map((day) => (
                <div key={day} className="flex bg-white p-2 text-center font-semibold">
                    {day}
                </div>
            ))}
            {days.map((day, dayIdx) => (
                <div
                    key={day.toString()}
                    className={`bg-white p-10 select-none ${
                        !isSameMonth(day, currentDate) ? 'text-gray-400' : ''
                    } ${isSameDay(day, new Date()) ? 'bg-blue-100' : ''}`}
                    onClick={() => {
                        console.log(day)
                    }}
                >
                <div className="font-semibold mb-1" >{format(day, 'd')}
                    <Badge variant="outline">Outline</Badge></div>
                    <div className="space-y-1">
                        {events
                        .filter(event => isSameDay(event.date, day))
                        .map(event => (
                            <div
                                key={event.id}
                                className={`${event.color} text-white text-xs p-1 rounded truncate`}
                                title={event.title}
                            >
                                {event.time} {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            </div>
        </CardContent>
    </Card>
  )
}