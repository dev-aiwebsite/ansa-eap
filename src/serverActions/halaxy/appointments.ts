"use server";
import { halaxyFetch } from "./credentials";

export type Appointment = {
    id: string;
    start: string;
    [key: string]: unknown;
};

export type AppointmentsResponse = {
  total: number;
  entry: Appointment[];
};


// Example: book an appointment
export async function bookAppointment() {

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  // Convert to ISO string for the API
  const startISO = startDate.toISOString();
  const endISO = endDate.toISOString();
  const duration = 30;
  const practitionerRoleId = "PR-3314603";

  const findAppointmentsResponse = await halaxyFetch(
    `/Appointment/$find?start=${encodeURIComponent(startISO)}&end=${encodeURIComponent(endISO)}&duration=${duration}&practitioner-role=${practitionerRoleId}`
  );

  console.log(startISO, endISO)
  console.log(JSON.stringify(findAppointmentsResponse, null, 2))


  const timestamp = Math.floor(Date.now() / 1000);
  const proposedId = `proposed-${timestamp}-${duration}`;


  const testAppointment = {
    "fullUrl": "https://au-api.halaxy.com/main/Appointment/proposed-1757485800-30",
    "resource": {
      "start": "2025-09-10T06:30:00+00:00",
      "end": "2025-09-10T07:00:00+00:00",
      "minutesDuration": 30,
      "id": "proposed-1757485800-30",
      "resourceType": "Appointment",
      "participant": [
        {
          "actor": {
            "reference": "https://au-api.halaxy.com/main/PractitionerRole/PR-3314603",
            "type": "PractitionerRole"
          }
        }
      ]
    }
  }



  return await halaxyFetch("/Appointment/$book", {
    method: "POST",
    payload: {
      resourceType: "Parameters",
      parameter: [
        {
          name: "appt-resource",
          resource: {
            "start": testAppointment.resource.start,
            "end": testAppointment.resource.end,
            "minutesDuration": testAppointment.resource.minutesDuration,
            "id": proposedId,
            resourceType: "Appointment",
            participant: [
              { actor: { reference: "PractitionerRole/PR-3314603", type: "PractitionerRole" } }
            ],
          },
        },
        {
          "name": "app-id",
          "valueReference": {
            "reference": "Appointment/1",
            "type": "Appointment"
          }
        },
        { name: "patient-id", valueReference: { reference: "Patient/150003003", type: "Patient" } },
        { name: "healthcare-service-id", valueReference: { reference: "HealthcareService/558363", type: "HealthcareService" } },
        { name: "location-type", valueCode: "clinic" },
        { name: "status", valueCode: "booked" },
      ],
    },
  });


}


// export async function getAppointments() {
//   // const locationId = '1335519'
//   // CL-1335519
//   const locationId = '615081'
//   const res = await halaxyFetch(`/Appointment?page=1&_count=100&pagination=false&location=https://au-api.halaxy.com/main/Location/${locationId}`) as AppointmentsResponse
//   if(res.total === 0) return []
//   return res.entry.map(i => i.resource) as Appointment[]
// }

// export async function getAppointments() {
//   const practitionerRoleId = "PR-3331559"; // Elevate by ANSA role

//   const res = await halaxyFetch(
//     `/Appointment?page=1&_count=100&pagination=false&&practitioner-role=${practitionerRoleId}`
//   ) as AppointmentsResponse;

//   if (!res || res.total === 0) return [];
//   return res.entry.map((i) => i.resource) as Appointment[];
// }


export async function getUserAppointments(patient_id: string) {
  // const res = await halaxyFetch(`/Appointment?page=1&_count=30&patient=${patient_id}&part-status=booked`) as AppointmentsResponse
  const res = await halaxyFetch(`/Appointment?page=1&_count=30&patient=${patient_id}`) as AppointmentsResponse
  if(res.total === 0) return []
  return res.entry.map(i => i.resource) as Appointment[]
}


export async function bookAppointment2() {
  const url = "https://www.halaxy.com/api/v2/open/booking/appointments";

  const payload = {
    practitionerId: 1273761,
    clinicId: 1328509,
    dateTimeKey: "20250905-110000", // YYYYMMDD-HHmmss
    duration: 30,
    linkpagId: "150001691",
    notes: "This is a test from server",
    phoneNumber: "+639289847923",
    appointmentTypeId: 558363,
    sourceLinkAPrPaGKey: null
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
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



// export async function cancelAnAppointment(appointmentId: string, patientId: string) {
//   const res = await halaxyFetch(`/Appointment/${appointmentId}`, {
//     method: "PATCH",
//     payload: {
//       participant: [
//         {
//           actor: {
//             reference: `https://au-api.halaxy.com/main/Patient/${patientId}`,
//             type: "Patient",
//           },
//           modifierExtension: [
//             {
//               url: "https://terminology.halaxy.com/StructureDefinition/appointment-participant-status",
//               valueCoding: {
//                 system: "https://au-api.halaxy.com/presets/CodeSystem/appointment-participant-status",
//                 code: "cancelled",
//                 display: "cancelled",
//               },
//             },
//           ],
//         },
//       ],
//       description: "Cancelled by patient",
//     },
//   });

//   if (res) {
//     return true;
//   } else {
//     return false;
//   }
// }

