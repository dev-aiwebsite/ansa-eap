"use client";

import { Button } from "@/components/ui/button";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { addDays, addWeeks, format, isSameDay, startOfWeek, subWeeks, min } from "date-fns";
import { useState } from "react";
import { Calendar as CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";

interface AppointmentPickerProps {
    className?: string;
    availableTimestamps: number[]; // timestamps of available times
    onSelect?: (date: Date) => void;
}

export default function AppointmentPicker({ className, availableTimestamps, onSelect }: AppointmentPickerProps) {
    const [currentWeekStart, setCurrentWeekStart] = useState<Date>(startOfWeek(new Date(), { weekStartsOn: 0 }));
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const nextWeek = () => setCurrentWeekStart(prev => addWeeks(prev, 1));
    const prevWeek = () => setCurrentWeekStart(prev => subWeeks(prev, 1));

    const handleDateSelect = (date: Date) => {
        setSelectedDate(date);
        onSelect?.(date);
    };

    // Generate days for current week
    const daysOfWeek = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

    const getDayAvailability = (day: Date) => {
        return availableTimestamps.filter(ts => isSameDay(new Date(ts), day));
    };

    const goToNextAvailable = () => {
        const futureTimes = availableTimestamps
            .map(ts => new Date(ts))
            .filter(ts => !selectedDate || ts.getTime() > selectedDate.getTime());
        if (futureTimes.length > 0) {
            const nextAvailable = min(futureTimes);
            const weekStart = startOfWeek(nextAvailable, { weekStartsOn: 0 });
            setCurrentWeekStart(weekStart);
            handleDateSelect(nextAvailable);
        }
    };

    return (
        <div className={cn("bg-white p-4 rounded-md", className)}>
            {/* Navigation */}
            <div className="flex justify-between items-center mb-4 space-x-2">
                <div className="flex gap-2 items-center">
                    <Button variant="ghost" size="icon" onClick={prevWeek}>
                        <ChevronLeft size={16} />
                    </Button>
                    {/* Calendar picker with label and icon */}
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="flex items-center gap-2">
                                <CalendarIcon size={16} />     {`${format(currentWeekStart, "dd MMM")} - ${format(addDays(currentWeekStart, 6), "dd MMM")}`}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-2">
                            <Calendar
                                mode="single"
                                selected={selectedDate || currentWeekStart}
                                onSelect={(date) => {
                                    if (date) setCurrentWeekStart(startOfWeek(date, { weekStartsOn: 0 }));
                                }}
                                components={{
                                    DayButton: (props) => {
                                        const day = props.day;
                                        const hasAvailable = day && availableTimestamps.some(ts => isSameDay(new Date(ts), day.date));

                                        // Merge your conditional className with existing one
                                        const newClassName = hasAvailable && !props.modifiers.selected ? "bg-blue-100" : ""
                                        return <CalendarDayButton {...props} className={cn("ring-2 ring-inset ring-white", props.className, newClassName)} />;
                                    },
                                }}
                            />
                        </PopoverContent>
                    </Popover>
                    <Button variant="ghost" size="icon" onClick={nextWeek}>
                        <ChevronRight size={16} />
                    </Button>
                    <Button variant="outline" onClick={goToNextAvailable}>Next Available</Button>
                </div>


            </div>

            {/* Week grid */}
            <div className="grid md:grid-cols-7 gap-2">
                {daysOfWeek.map((day) => {
                    const dayAvailableTimes = getDayAvailability(day);
                    return (
                        <div key={day.toISOString()} className="flex flex-col items-center p-2">
                            <div className="text-sm text-center mb-2">
                                <span>{format(day, "EEE")}</span>
                                <br />
                                <span>{format(day, "dd MMM")}</span>
                            </div>
                            <ScrollArea className="h-[300px] max-h-[300px] overflow-auto ">
                                <div className="flex flex-col flex-nowrap gap-2">
                                    {dayAvailableTimes.length ? (
                                        dayAvailableTimes.map((ts) => (
                                            <Button
                                                type="button"
                                                key={ts}
                                                variant="ghost"
                                                className={cn(
                                                    "!py-2 !px-4 text-sm bg-blue-50",
                                                    selectedDate && selectedDate.getTime() === ts && "text-white bg-primary"
                                                )}
                                                onClick={() => handleDateSelect(new Date(ts))}
                                            >
                                                {format(new Date(ts), "hh:mm a")}
                                            </Button>
                                        ))
                                    ) : (
                                        <p className="text-gray-400 text-sm">Unavailable</p>
                                    )}
                                </div>
                            </ScrollArea>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
