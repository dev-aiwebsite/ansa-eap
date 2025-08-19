"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type Calendar22 = {
  onSelect: (date:Date | undefined)=>void;
  buttonClass?: string
}
export default function Calendar22({onSelect,buttonClass}:Calendar22) {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>(undefined)

  function dateSetter(date:Date | undefined){
    setDate(date)
    setOpen(false)
    onSelect(date)
  }

  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            id="date"
            size="sm"
            className={cn("justify-between font-normal btn-thin text-xs", buttonClass)}
          >
            {date ? date.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(date) => dateSetter(date)}
          />
        </PopoverContent>
      </Popover>
  )
}
