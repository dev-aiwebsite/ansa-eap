"use server";
import { halaxyFetch } from "./credentials";

export type Appointment = {
    id: string;
    start: string;
    [key: string]: unknown;
};


export type FhirAppointment = {
        "start": string,
        "end": string,
        "minutesDuration": number,
        // "participant": [
        //   {
        //     "actor": {
        //       "reference": string,
        //       "type": "PractitionerRole"
        //     }
        //   }
        // ],
        "id": string,
        "resourceType": "Appointment"
      }

export type AppointmentsResponse = {
  total: number;
  entry: {resource:FhirAppointment}[];
};


// Example: book an appointment parameter
// parameter: [
//       {
//         name: "appt-resource",
//         resource: {
//           start: "2025-11-15T15:00:00+10:00",
//           end: "2025-11-15T16:00:00+10:00",
//           minutesDuration: 60,
//           resourceType: "Appointment",
//           participant: [
//             {
//               actor: {
//                 reference: "https://au-api.halaxy.com/main/PractitionerRole/PR-3331559", // elevate adam 
//                 type: "PractitionerRole",
//               },
//             },
//           ],
//         },
//       },
//       {
//         name: "patient-id",
//         valueReference: {
//           reference: "https://au-api.halaxy.com/main/Patient/150899633", //allaine@aiwebsiteservices.com
//           type: "Patient",
//         },
//       },
//       {
//         name: "healthcare-service-id",
//         valueReference: {
//           reference: "https://au-api.halaxy.com/main/HealthcareService/557057", //Elevate by ANSA Appointment
//           type: "HealthcareService",
//         },
//       },
//       {
//         name: "location-type",
//         valueCode: "clinic",
//       },
//       {
//         name: "status",
//         valueCode: "booked",
//       },
//       // {
//       //   name: "charge-item-definition-id",
//       //   valueReference: {
//       //     reference: "https://au-api.halaxy.com/main/ChargeItemDefinition/123456",
//       //     type: "ChargeItemDefinition",
//       //   },
//       // },
//     ],
type BookAppointmentProps = {
  appointment: FhirAppointment;
  patientId: string;
  serviceId: string;
}
export async function bookAppointment({
appointment,
patientId,
serviceId
}:BookAppointmentProps) {

  return await halaxyFetch("/Appointment/$book", {
    method: "POST",
    payload: {
    resourceType: "Parameters",
    parameter: [
      {
        name: "appt-resource",
        resource: appointment,
      },
      {
        name: "patient-id",
        valueReference: {
          reference: `https://au-api.halaxy.com/main/Patient/${patientId}`, //allaine@aiwebsiteservices.com
          type: "Patient",
        },
      },
      {
        name: "healthcare-service-id",
        valueReference: {
          reference: `https://au-api.halaxy.com/main/HealthcareService/${serviceId}`, //Elevate by ANSA Appointment
          type: "HealthcareService",
        },
      },
      {
        name: "location-type",
        valueCode: "clinic",
      },
      {
        name: "status",
        valueCode: "booked",
      },
      // {
      //   name: "charge-item-definition-id",
      //   valueReference: {
      //     reference: "https://au-api.halaxy.com/main/ChargeItemDefinition/123456",
      //     type: "ChargeItemDefinition",
      //   },
      // },
    ],
  },
  });


}


export async function getUserAppointments(patient_id: string) {
  // const res = await halaxyFetch(`/Appointment?page=1&_count=30&patient=${patient_id}&part-status=booked`) as AppointmentsResponse
  const res = await halaxyFetch(`/Appointment?page=1&_count=30&patient=${patient_id}`) as AppointmentsResponse
  if(res.total === 0) return []
  return res.entry.map(i => i.resource)
}


export async function updateAppointmentStatus(
  status: "booked" | "cancelled" | "tentative" | "accepted",
  appointmentId: string,
  patientId: string,
) {
  const res = await halaxyFetch(`/Appointment/${appointmentId}`, {
    method: "PATCH",
    payload: {
      participant: [
        {
          actor: {
            reference: `https://au-api.halaxy.com/main/Patient/${patientId}`,
            type: "Patient",
          },
          modifierExtension: [
            {
              url: "https://terminology.halaxy.com/StructureDefinition/appointment-participant-status",
              valueCoding: {
                system: "https://au-api.halaxy.com/presets/CodeSystem/appointment-participant-status",
                code: status,
                display: status,
              },
            },
          ],
        },
      ],
      description:
        status === "cancelled"
          ? "Cancelled by patient"
          : status === "booked"
          ? "Rebooked by patient"
          : undefined,
    },
  });

  return res as Appointment
}


export async function getAvailableAppointments({practitionerRole,start,end,duration}: {practitionerRole: string, start: string, end: string, duration: number}) {

      const bookedAppointments = await halaxyFetch(
        `/Appointment?page=1&_count=100&part-status=booked&practitioner-role=${practitionerRole}&_sort=date`
      ) as AppointmentsResponse;

  
      const slots = await halaxyFetch(
    `/Appointment/$find?start=${start}&end=${end}&practitioner-role=${practitionerRole}` +
    `&duration=${duration}` +
    `&apply-buffer-time=true` +
    `&include-overbooked=false`
  ) as AppointmentsResponse;
  
    if(slots.total === 0) return []

  const availableSlots = slots.entry.filter(slot => {
    const slotResource = slot.resource
    return !bookedAppointments.entry.some(appt => {
      const apptResource = appt.resource
      return (
        new Date(slotResource.start) < new Date(apptResource.end) &&
        new Date(slotResource.end) > new Date(apptResource.start)
      )
    }
    )
  }
  );


    return availableSlots.map(i => i.resource)
    
}