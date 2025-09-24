import BookingWidget from "@/components/bookingWidget";
import Container from "@/components/ui/container";

export default function Page() {
    return (
        <Container className="card bg-[#e9ecef]">
            <BookingWidget link="https://www.halaxy.com/book/widget/elevate-by-ansa/location/1328509" />
        </Container>
    );
}