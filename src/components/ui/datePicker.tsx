import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"

type DatePickerProps = {
  dateValue : Date | undefined,
  onChange : (date : Date | undefined) => void
}

export function DatePicker({dateValue,onChange} : DatePickerProps) {
  const [date, setDate] = React.useState<Date | undefined>(dateValue)
  
  const handleDatePickerChange = (selectedDate : Date | undefined) => {
    onChange(selectedDate)
    setDate(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDatePickerChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
