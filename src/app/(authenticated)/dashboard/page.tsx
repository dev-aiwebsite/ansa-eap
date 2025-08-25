"use client"
import DailyCheckIn from "@/components/forms/dailyCheckin/dailyCheckIn";
import { Calendar } from "@/components/ui/calendar";
import WillFocused from "@/components/ui/willFocused";
import WeeklyBites from "@/components/weeklyBites";
import FeaturedWidget from "@/components/widgets/FeaturedWidget";
import MoodWidget from "@/components/widgets/MoodWidget";

const DashboardPage = () => {
  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex flex-row h-full gap-6">
        <div className="flex-1 gap-6 flex flex-col flex-nowrap overflow-auto">
          <WillFocused>
            {({ isFocused, focusOnChange }) => (
              <DailyCheckIn isFocused={isFocused} focusOnChange={focusOnChange} />
            )}
          </WillFocused>
          <div className="flex flex-row flex-wrap basis-full min-h-[290px] max-h-fit gap-6">
            <div className="card p-0 w-1/3 min-w-[300px]">
             <FeaturedWidget className="card h-full"/>
            </div>

            <div className="card bg-white flex-1">
              <MoodWidget />
            </div>
          </div>

          <div className="card bg-white flex-1">
            <WeeklyBites />
          </div>
        </div>

        <div className="right-sidebar">
          <Calendar className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
