import BookingWidget from "@/components/bookingWidget";

export default function Page() {
  return (
    <div className="h-full flex-1 overflow-hidden card bg-[#e9ecef]">
      <div className="h-full max-h-webkit-fill">
        <BookingWidget link="https://www.halaxy.com/book/widget/elevate-by-ansa/location/1328509" />
      </div>
    </div>
  );
}
