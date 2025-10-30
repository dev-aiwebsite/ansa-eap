"use client"
import AppointmentList from "@/components/appointmentList";
import Container from "@/components/ui/container";

export default function MyAppointmentsPage() {
    return (
        <Container className="card">
            <h3 className="section-title">My Appointments</h3>
            <div className="p-4">
                <AppointmentList itemClassName="bg-gray-50" showCancel />
            </div>
        </Container>
    );
}