"use client"
import { useState } from "react";
import Calendar22 from "../calendar-22";
import { ChartLineLabel, TypeChartData } from "../charts/lineChart";
import { useAppServiceContext } from "@/context/appServiceContext";


const MoodWidget = () => {
    const [dateFilter, setDateFilter] = useState<Date | undefined>(undefined)
    const {dailyCheckIns} = useAppServiceContext()
console.log(dateFilter)

    const chartData:TypeChartData = {
        x: {
          label: "days",
          data: [],
        },
        y: {
          label: "mood",
          data: [],
        },
      };
      
      dailyCheckIns
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .forEach((entry) => {
          const date = new Date(entry.created_at);
          const day = date.toLocaleDateString("en-US", { weekday: "short" }); // "Mon", "Tue", etc.
      
          const moodScore = entry.responses.reduce((sum, r) => sum + r.answer, 0);
      
          chartData.x.data.push(day);
          chartData.y.data.push(moodScore);
        });

    return (
    <>
    <div className="flex flex-row flex-nowrap items-center justify-between gap-2 w-full mb-6">
            <h3 className="card-title">My Mood</h3>
            <Calendar22 onSelect={(date)=>setDateFilter(date)}/>
    </div>
    <ChartLineLabel chartData={chartData} />
    </>
    );
}

export default MoodWidget;