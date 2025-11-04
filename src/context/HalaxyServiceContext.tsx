"use client";
import { Appointment, getUserAppointments, updateAppointmentStatus } from "@/serverActions/halaxy/appointments";
import { getUserPatientRecord, PatientEntry } from "@/serverActions/halaxy/patients";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { useAppServiceContext } from "./appServiceContext";
import { useConfirmDialog } from "./ConfirmContext";


type MyRecord = PatientEntry | null
type Appointments = Appointment[] | null
type HalaxyServiceContextType = {
myRecord: MyRecord;
  myAppointments: Appointments;
  setMyAppointments: Dispatch<SetStateAction<Appointments>>;
  cancelAppointment: (appointmentId:string) => void;
  rebookAppointment: (appointmentId:string) => void;
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
    const {currentUser} = useAppServiceContext()
    const [myRecord, setMyRecord] = useState<MyRecord>(null)
    const [myAppointments, setMyAppointments] = useState<Appointments>(null);
    const confirm = useConfirmDialog()
   
    useEffect(()=>{
        const getRecord = async () => {
            const res = await getUserPatientRecord(currentUser.email)
            if(res){
                setMyRecord(res)
            }
        }
        getRecord()

    }, [currentUser])

    useEffect(()=>{
        if(!myRecord) return
        const myPatientId = myRecord.id;
        const getMyAppointments = async() => {
              const res = await getUserAppointments(myPatientId);
            setMyAppointments(res)
            console.log(res)
        }
        getMyAppointments()

    },[myRecord])

    async function cancelAppointment(appointmentId:string){
      if(!myRecord) return
        const myPatientId = myRecord.id
         const ok = await confirm({
      title: "Cancel appointment?",
      description: "Are you sure you want to cancel this appointment?",
      okText: "Yes",
      cancelText: "No",
    })

    if (!ok) return
      toast.promise(updateAppointmentStatus('cancelled',appointmentId, myPatientId)
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
    async function rebookAppointment(appointmentId:string){
      if(!myRecord) return
        const myPatientId = myRecord.id
         const ok = await confirm({
      title: "Book appointment?",
      description: "Are you sure you want to rebook this appointment?",
      okText: "Yes",
      cancelText: "No",
    })

    if (!ok) return
      toast.promise(updateAppointmentStatus('booked',appointmentId, myPatientId)
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
    const creditLimit = currentUser.maxCredit || 0
    const creditUsed = myAppointments?.length || 0
    const remainingCredit = creditLimit && creditUsed ? creditLimit - creditUsed : undefined
  return (
    <HalaxyServiceContext.Provider
      value={{
        myRecord,
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
