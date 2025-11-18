"use client";
import { Appointment, getUserAppointments, updateAppointmentStatus } from "@/serverActions/halaxy/appointments";
import { createPatient } from "@/serverActions/halaxy/patients";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useAppServiceContext } from "./appServiceContext";
import { useConfirmDialog } from "./ConfirmContext";
import { updateUser } from "@/serverActions/crudUsers";


type Appointments = Appointment[] | null
type HalaxyServiceContextType = {
  myAppointments: Appointments;
  setMyAppointments: Dispatch<SetStateAction<Appointments>>;
  cancelAppointment: (appointmentId: string) => void;
  rebookAppointment: (appointmentId: string) => void;
  creditLimit: number;
  creditUsed: number;
  remainingCredit?: number;
};

type HalaxyServiceContextProviderProps = {
  children?: React.ReactNode;
};

const HalaxyServiceContext = createContext<HalaxyServiceContextType | null>(null);

export function HalaxyServiceContextProvider({
  children
}: HalaxyServiceContextProviderProps) {
  const { currentUser, setCurrentUser } = useAppServiceContext()
  const [myAppointments, setMyAppointments] = useState<Appointments>(null);
  const confirm = useConfirmDialog()
  const patientCreatedRef = useRef(false);

useEffect(() => {
  if (!currentUser || patientCreatedRef.current) return;

  const handlePatient = async () => {
    const myPatientId = currentUser.patient_id;

    if (!myPatientId) {
      try {
        const cpRes = await createPatient({
          givenName: currentUser.first_name,
          familyName: currentUser.last_name,
          email: currentUser.email,
        });
        const patientId = cpRes.id;

        if (patientId) {
          await updateUser(currentUser.id, { patient_id: patientId });
          setCurrentUser((prev) => ({ ...prev, patient_id: patientId }));
          patientCreatedRef.current = true; // prevent loop
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  handlePatient();
}, [currentUser]);

useEffect(() => {
  const patientId = currentUser?.patient_id;
  if (!patientId) return;

  const fetchAppointments = async () => {
    try {
      const res = await getUserAppointments(patientId);
      setMyAppointments(res);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    }
  };

  fetchAppointments();
}, [currentUser?.patient_id]);




  async function cancelAppointment(appointmentId: string) {
    const myPatientId = currentUser.patient_id
    if (!myPatientId) return
    const ok = await confirm({
      title: "Cancel appointment?",
      description: "Are you sure you want to cancel this appointment?",
      okText: "Yes",
      cancelText: "No",
    })

    if (!ok) return
    toast.promise(updateAppointmentStatus('cancelled', appointmentId, myPatientId)
      .then(
        (updatedAppt) => {
          // ✅ Merge the updated appointment into local state
          setMyAppointments((prev) =>
            prev
              ? prev.map((appt) =>
                appt.id === appointmentId ? updatedAppt : appt
              )
              : [updatedAppt]
          );
          return updatedAppt;
        }
      ), {
      loading: "Cancelling appointment...",
      success: "Appointment cancelled",
      error: "Failed to cancel",
    })
  }
  async function rebookAppointment(appointmentId: string) {
    const myPatientId = currentUser.patient_id
    if (!myPatientId) return

    const ok = await confirm({
      title: "Book appointment?",
      description: "Are you sure you want to rebook this appointment?",
      okText: "Yes",
      cancelText: "No",
    })

    if (!ok) return
    toast.promise(updateAppointmentStatus('booked', appointmentId, myPatientId)
      .then(
        (updatedAppt) => {
          // ✅ Merge the updated appointment into local state
          setMyAppointments((prev) =>
            prev
              ? prev.map((appt) =>
                appt.id === appointmentId ? updatedAppt : appt
              )
              : [updatedAppt]
          );
          return updatedAppt;
        }
      ), {
      loading: "Booking appointment...",
      success: "Appointment booked",
      error: "Failed to book",
    })
  }
  const creditLimit = currentUser.maxCredit ?? 0
  const creditUsed = myAppointments?.length ?? 0
  const remainingCredit = myAppointments ? creditLimit - creditUsed : undefined


  console.log(currentUser, 'currentUser')
  return (
    <HalaxyServiceContext.Provider
      value={{
        myAppointments,
        setMyAppointments,
        cancelAppointment,
        rebookAppointment,
        creditLimit,
        creditUsed,
        remainingCredit,
      }}
    >
      {children}

    </HalaxyServiceContext.Provider>
  );
}

export function useHalaxyServiceContext() {
  const context = useContext(HalaxyServiceContext);
  if (!context) {
    throw new Error(
      "useHalaxyServiceContext must be used within a HalaxyServiceContextProvider"
    );
  }
  return context;
}
