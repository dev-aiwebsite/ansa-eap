import Link from "next/link";
import DailyCheckInMobile from "../forms/dailyCheckin/dailyCheckInMobile";
import HealthNewsCarousel from "../post/HealthNewsCarousel";
import PublicEventsList from "../publicEvents/publicEventsList";
import WeeklyBitesMobile from "../weeklyBitesMobile";
import CounsellingCard from "../services/CounsellingCard";

const DashboardMobile = () => {
  return (
    <div className="space-y-6 pb-[100px]">
      <div className="space-y-1">
        <span className="card-title">Mental Health Moments</span>
        <HealthNewsCarousel className="simple" />
      </div>
      <div className="space-y-1">
        <div className="flex flex-row flex-nowrap">
          <span className="card-title">Public Sessions</span>
          <Link
            className="ml-auto text-sm text-app-purple-300 font-medium"
            href="/public-events"
          >
            See all
          </Link>
        </div>

        <PublicEventsList count={1} />
      </div>

      <div className="card text-white bg-primary p-0 overflow-hidden rounded-3xl">
        <DailyCheckInMobile isFocused={false} />
      </div>

      {/* counselling */}
      <div className="space-y-1">
        <div className="flex flex-row flex-nowrap">
          <span className="card-title">Counselling</span>
        </div>
        <CounsellingCard />
      </div>

      <div>
        <div className="flex flex-row flex-nowrap">
          <span className="card-title">Weekly Bites</span>
          <Link
            className="ml-auto text-sm text-app-purple-300 font-medium"
            href="/resources"
          >
            See all
          </Link>
        </div>
        <div className="flex-1">
          <WeeklyBitesMobile />
        </div>
      </div>
    </div>
  );
};

export default DashboardMobile;
