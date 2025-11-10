import AppointmentPicker from "@/components/AppointmentPIcker";


const page = () => {
  const availableTimestamps = [
  new Date("2025-11-10T10:00:00").getTime(), // Nov 10, 2025 10:00 AM
  new Date("2025-11-10T14:00:00").getTime(), // Nov 10, 2025 2:00 PM
  new Date("2025-11-11T09:30:00").getTime(), // Nov 11, 2025 9:30 AM
  new Date("2025-11-12T13:00:00").getTime(), // Nov 12, 2025 1:00 PM
  new Date("2025-11-13T15:30:00").getTime(), // Nov 13, 2025 3:30 PM
];
  return (
    <div className="p-10">
      <AppointmentPicker availableTimestamps={availableTimestamps} />
      {/* <div className="bg-white max-w-[800px] grid md:grid-cols-7 h-[600px]">
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="text-sm flex flex-col flex-nowrap items-center justiyf-center">
            <span>Sun</span>
            <span>16 Nov</span>
          </div>
          <div>
            <p className="muted-text">Unavailable</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="flex flex-col flex-nowrap items-center justiyf-center">
            <span>Mon</span>
            <span>17 Nov</span>
          </div>
          <div>
            <Button
              variant="ghost"
              className="bg-gray-100 h-fit !p-2">
              <span>10:00 am</span>
            </Button>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="flex flex-col flex-nowrap items-center justiyf-center">
            <span>Sun</span>
            <span>16 Nov</span>
          </div>
          <div>
            <p className="muted-text">Unavailable</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="flex flex-col flex-nowrap items-center justiyf-center">
            <span>Sun</span>
            <span>16 Nov</span>
          </div>
          <div>
            <p className="muted-text">Unavailable</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="flex flex-col flex-nowrap items-center justiyf-center">
            <span>Sun</span>
            <span>16 Nov</span>
          </div>
          <div>
            <p className="muted-text">Unavailable</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="flex flex-col flex-nowrap items-center justiyf-center">
            <span>Sun</span>
            <span>16 Nov</span>
          </div>
          <div>
            <p className="muted-text">Unavailable</p>
          </div>
        </div>
        <div className="flex flex-col flex-nowrap items-center justiyf-center">
          <div className="flex flex-col flex-nowrap items-center justiyf-center">
            <span>Sun</span>
            <span>16 Nov</span>
          </div>
          <div>
            <p className="muted-text">Unavailable</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default page;