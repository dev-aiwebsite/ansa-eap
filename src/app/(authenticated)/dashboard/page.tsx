"use client"
import DailyCheckIn from "@/components/forms/dailyCheckin/dailyCheckIn";
import { Calendar } from "@/components/ui/calendar";
import WeeklyBites from "@/components/weeklyBites";
import ActivityWidget from "@/components/widgets/ActivityWidget";
import MoodWidget from "@/components/widgets/MoodWidget";

const DashboardPage = () => {

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex flex-row h-full gap-6">
        <div className="flex-1 gap-6 flex flex-col flex-nowrap overflow-auto">
          <div className="card bg-primary h-fit text-white w-full">
            <DailyCheckIn/>
          </div>

          <div className="flex flex-row flex-wrap basis-full min-h-[290px] max-h-fit gap-6">
            <div className="card bg-white w-1/3 min-w-[300px]">
             <ActivityWidget/>
            </div>

            <div className="card bg-white flex-1">
              <MoodWidget />
            </div>
          </div>

          <div className="card bg-white flex-1">
            <WeeklyBites />
          </div>
        </div>

        <div className="md:w-[340px] md:max-w-[340px] card bg-white h-full">
          <Calendar className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
