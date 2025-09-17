"use client";
import { useState } from "react";
import Calendar22 from "../calendar-22";
import { ChartLineLabel, TypeChartData } from "../charts/lineChart";
import { useAppServiceContext } from "@/context/appServiceContext";

const MoodWidget = () => {
  const [dateFilter, setDateFilter] = useState<Date>(new Date()); // default today
  const { dailyCheckIns } = useAppServiceContext();

  const lastDate = new Date(dateFilter);
  const startDate = new Date(lastDate);
  startDate.setDate(lastDate.getDate() - 6); // 7-day window

  // create a map for quick lookup by local date string
  const entryMap: Record<string, number> = {};
  dailyCheckIns.forEach((entry) => {
    const d = new Date(entry.created_at);
    const key = d.toLocaleDateString("en-CA"); // YYYY-MM-DD in local time
    const moodScore = entry.responses.reduce((sum, r) => sum + Number(r.answer), 0);
    entryMap[key] = moodScore;
  });

  const chartData: TypeChartData = {
    x: { label: "days", data: [] },
    y: { label: "mood", data: [] },
  };

  // loop through 7 days in local time
  const loopDate = new Date(startDate);
  while (loopDate <= lastDate) {
    const key = loopDate.toLocaleDateString("en-CA"); // YYYY-MM-DD

    chartData.x.data.push(
      loopDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    );

    chartData.y.data.push(entryMap[key] ?? 0);

    loopDate.setDate(loopDate.getDate() + 1);
  }

  return (
    <>
      <div className="flex flex-row flex-nowrap items-center justify-between gap-2 w-full mb-6">
        <h3 className="card-title">My Mood</h3>
        <Calendar22 value={dateFilter} onSelect={(date) => date && setDateFilter(date)} />
      </div>
      <ChartLineLabel yDomain={[-1, 15]} chartData={chartData} />
    </>
  );
};

export default MoodWidget;
