"use client"

import AppointmentPicker from "@/components/AppointmentPIcker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAppServiceContext } from "@/context/appServiceContext";
import { useHalaxyBookingServiceContext } from "@/context/HalaxyBookingServiceContext";
import { useHalaxyServiceContext } from "@/context/HalaxyServiceContext";
import { bookAppointment, FhirAppointment, getAvailableAppointments } from "@/serverActions/halaxy/appointments";
import { FhirHealthcareService, getHalaxyServices } from "@/serverActions/halaxy/services";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import ImageWithFallback from "./ui/imageWithFallback";
import { ChevronLeft } from "lucide-react";


type HalaxyBookingWidgetProps = {
    practitioner_role: string;
}

export default function HalaxyBookingWidget({ practitioner_role }: HalaxyBookingWidgetProps) {
    console.log(practitioner_role)
    const router = useRouter()
    const { currentUser } = useAppServiceContext()
    const { setMyAppointments } = useHalaxyServiceContext()
    const { practitioners } = useHalaxyBookingServiceContext()

    const [services, setServices] = useState<FhirHealthcareService[]>([])
    const [availableAppointments, setAvailableAppointments] = useState<FhirAppointment[]>()

    // Form values
    const [service, setService] = useState<FhirHealthcareService | null>(null)
    const [appointmentSched, setAppointmentSched] = useState<Date | null>(null)

    // 
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // Init practitioners, services, and timezones
    useEffect(() => {
        async function fetchData() {
            const [halaxyServices] = await Promise.all([
                getHalaxyServices(),
            ]);
            setServices(halaxyServices)
        }
        fetchData()
    }, [])

    // Fetch available appointments when practitioner and service are selected
    useEffect(() => {
        if (!practitioner_role || !service) return

        const today = new Date()
        const oneMonthFromToday = new Date(today);
        oneMonthFromToday.setMonth(today.getMonth() + 1);

        const data = {
            practitionerRole: practitioner_role,
            start: today.toISOString(),
            end: oneMonthFromToday.toISOString(),
            duration: service.extension[0].valueQuantity?.value ?? 50,
        }

        getAvailableAppointments(data)
            .then(res => setAvailableAppointments(res))
            .catch(err => console.log(err))

    }, [practitioner_role, service])


    const handleBookAppointment = async () => {
        const myPatientId = currentUser.patient_id
        if (!appointmentSched || !availableAppointments) return
        setIsSubmitting(true)
        const selectedAppointment = availableAppointments.find(appointment => +new Date(appointment.start) == +appointmentSched)


        if (!selectedAppointment || !myPatientId || !service) {
            toast.error('Something went wrong, Contact Admin')
        } else {
            try {
                const createdAppt = await bookAppointment({
                    appointment: selectedAppointment,
                    patientId: myPatientId,
                    serviceId: service?.id
                })

                if (createdAppt.resourceType == "Appointment") {
                    setMyAppointments((prev) => {
                        return prev ? [...prev, createdAppt] : [createdAppt]
                    })
                }
                toast.success('Appointment booked successfully!', {
                    description: "You’ll receive a confirmation email shortly.",
                });

                router.push('/user/appointments')


            } catch (err) {

                console.log(err)
                toast.error('Something went wrong, Contact Admin')
            }

        }

        setIsSubmitting(false)
    }


    console.log(availableAppointments, 'available Appointments')
    const selectedPractitioner = practitioners?.find(p => p.booking_link?.includes(practitioner_role))
    return (
        <>
          <Button
          className="max-sm:hidden"
              href="/health-services/booking/"
              size="sm"
                variant="ghost">
                    <ChevronLeft />
                    Back
                </Button>
        <div className="w-full h-full">
            <div className="space-y-4 md:p-4">
                {/* Practitioner Select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Practitioner</label>
                    <div className="max-sm:w-full rounded-lg border border-border w-fit p-3 gap-2 flex flex-row flex-nowrap">
                        <div>
                            <ImageWithFallback
                            className="rounded-full h-[50px] w-[50px] object-cover object-top"
                                width={50}
                                height={50}
                                src={selectedPractitioner?.profile_img}
                                alt={selectedPractitioner?.first_name ?? ""}
                            />
                        </div>
                        <div>
                            <p className="font-medium">{selectedPractitioner?.first_name} {selectedPractitioner?.last_name}</p>
                            <p className="muted-text max-sm:text-xs">{selectedPractitioner?.profession}</p>
                        </div>

                    </div>
                </div>

                {/* Service Select */}
                <div>
                    <label className="block text-sm font-medium mb-1">Select Service</label>
                    <Select
                        value={service?.id || ""}
                        onValueChange={(val) => {
                            const selected = services.find(s => s.id === val) || null;
                            setService(selected);
                        }}
                    >
                        <SelectTrigger className="bg-white whitespace-normal text-start !h-fit">
                            <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent>
                            {services.map((s) => (
                                <SelectItem key={s.id} value={s.id}>
                                    {s.name} ({s.extension[0].valueQuantity?.value ?? 50} min)
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Appointment Date picker */}

                {availableAppointments && availableAppointments.length > 0 &&
                    <div className="border-border border rounded-lg">
                        <AppointmentPicker
                            availableTimestamps={availableAppointments.map(appointment => {
                                return new Date(appointment.start).getTime()
                            })}
                            onSelect={(date) => setAppointmentSched(date)}

                        />
                    </div>
                }

                {appointmentSched &&
                    <Button
                        isLoading={isSubmitting}
                        onClick={handleBookAppointment}

                        className="font-bold !px-4 float-right max-sm:h-16 max-sm:mb-4 max-sm:w-full"
                    >
                        Book Appointment
                    </Button>
                }
            </div>
        </div>
        </>
    );
}
