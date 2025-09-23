import Link from "next/link";
import AppointmentList from "../appointmentList";
import DailyCheckInMobile from "../forms/dailyCheckin/dailyCheckInMobile";
import PublicEventsList from "../publicEvents/publicEventsList";
import WeeklyBitesMobile from "../weeklyBitesMobile";

const DashboardMobile = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex flex-row flex-nowrap">
          <p className="card-title">Upcoming Appointment</p>
          <Link
            className="ml-auto text-sm text-app-purple-300 font-medium"
            href="/my-appointments"
          >
            See all
          </Link>
        </div>
        <AppointmentList count={1} />
      </div>
      <div className="space-y-4">
        <div className="flex flex-row flex-nowrap">
          <p className="card-title">Public Sessions</p>
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
      <div>
        <div className="flex flex-row flex-nowrap">
          <p className="card-title">Weekly Bites</p>
          <Link
            className="ml-auto text-sm text-app-purple-300 font-medium"
            href="/learning-development"
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
