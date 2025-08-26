"use client";
import DailyCheckIn from "@/components/forms/dailyCheckin/dailyCheckIn";
import { Calendar } from "@/components/ui/calendar";
import WillFocused from "@/components/ui/willFocused";
import WeeklyBites from "@/components/weeklyBites";
import FeaturedWidget from "@/components/widgets/FeaturedWidget";
import MoodWidget from "@/components/widgets/MoodWidget";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex flex-row h-full gap-6">
        <div className="flex-1 gap-6 flex flex-col flex-nowrap overflow-auto">
          <WillFocused initialState={true}>
            {({ isFocused, focusOnChange }) => (
              <DailyCheckIn
                isFocused={isFocused}
                focusOnChange={focusOnChange}
              />
            )}
          </WillFocused>
          <div className="flex flex-row flex-wrap basis-full min-h-[290px] max-h-fit gap-6">
            <div className="card p-0 w-1/3 min-w-[300px]">
              <FeaturedWidget className="card h-full" />
            </div>

            <div className="card bg-white flex-1">
              <MoodWidget />
            </div>
          </div>

          <div className="card bg-white flex-1">
            <WeeklyBites />
          </div>
        </div>

        <div className="right-sidebar space-y-6">
          <Calendar className="w-full" />
          <div className="space-y-4">
            <div className="flex flex-row justify-between items-center">
              <p className="card-title">Upcoming Appointment</p>
              <Link
                className="text-sm text-app-purple-300 font-medium"
                href="#"
              >
                See all
              </Link>
            </div>
            <div className="space-y-4">
              <Link
                className="rounded-xl p-4 bg-muted flex flex-row justify-between items-center"
                href="#"
              >
                <span className="font-medium text-muted-foreground text-sm">
                  30-Minute Consulation
                </span>
                <span className="text-xl font-medium">$120</span>
              </Link>
              <Link
                className="rounded-xl p-4 bg-muted flex flex-row justify-between items-center"
                href="#"
              >
                <span className="font-medium text-muted-foreground text-sm">
                  1 Hour 1:1 Session
                </span>
                <span className="text-xl font-medium">$140</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
