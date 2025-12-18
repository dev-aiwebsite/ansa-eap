"use client";

import { useHalaxyBookingServiceContext } from "@/context/HalaxyBookingServiceContext";
import { useEffect, useState } from "react";
import PractitionerCard from "./PractitionerCard";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export default function AppBookingWidget() {

    const orgIds = {
        online: 'CL-1335519',

    }
    type OrgKeys = keyof typeof orgIds;

    const [appointmentType, setAppointmentType] = useState<"online" | "inperson">("online");
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);
    const {practitioners, orgId, setOrgid} = useHalaxyBookingServiceContext()



    const hasAvailable = practitioners?.length ?? 0;

    console.log('selected orgId:', orgId)
    console.log('practitioners', practitioners)

    useEffect(()=>{
        const selectedLocationKeys = selectedLocation as OrgKeys
        const selectedOrgId = appointmentType == 'online' ? orgIds['online'] : selectedLocationKeys ? orgIds[selectedLocationKeys] : ""
        setOrgid(selectedOrgId)

    },[appointmentType,selectedLocation])

    return (
        <div className="w-full-sidebar space-y-10">
            {/* MODE + LOCATION FILTER */}
            <div className="max-sm:flex-col flex w-full gap-4">

                {/* Toggle Online / In-person */}
                <ToggleGroup
                    type="single"
                    value={appointmentType}
                    onValueChange={(value) => value && setAppointmentType(value as "online" | "inperson")}
                    className="inline-flex w-full md:max-w-md border-2 border-primary/50 overflow-hidden"
                >
                    <ToggleGroupItem
                        value="online"
                        aria-label="Online (Telehealth)"
                        className="bg-white flex-1 text-center px-4 py-2 font-semibold text-primary 
                            data-[state=on]:bg-primary 
                            data-[state=on]:text-white
                            !rounded-none"
                    >
                        Online (Telehealth)
                    </ToggleGroupItem>

                    <ToggleGroupItem
                    disabled
                        value="inperson"
                        aria-label="In-Person"
                        className="bg-white flex-1 text-center px-4 py-2 font-semibold text-primary 
                            data-[state=on]:bg-primary 
                            data-[state=on]:text-white
                            !rounded-none"
                    >
                        In-Person
                    </ToggleGroupItem>
                </ToggleGroup>

                {/* Location dropdown (only for in-person) */}
                {appointmentType === "inperson" && (
                    <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}>
                        <SelectTrigger className="bg-white w-full md:w-[180px] !px-4 !py-2 !h-auto">
                            <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ballarat">Ballarat</SelectItem>
                            <SelectItem value="bacchus_marsh">Bacchus Marsh</SelectItem>
                            <SelectItem value="geelong">Geelong</SelectItem>
                            <SelectItem value="melton">Melton</SelectItem>
                            <SelectItem value="melbourne">Melbourne</SelectItem>
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* PRACTITIONER LIST */}
            <div>
                <div className="grid gap-5 gap-y-10 md:grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">

                    {hasAvailable === 0 &&
                        <>
                            {selectedLocation ?
                                <span>No Practitioner available</span>
                                :
                                <span>Select a location first</span>
                            }
                        </>
                    }

                    {hasAvailable > 0 && (
                        <>
                            {practitioners?.map((practitioner) => {

                                return <PractitionerCard key={practitioner.id} item={practitioner} />

                            })}

                            {/* Filler grid cells to keep layout aligned */}
                            {practitioners!.length < 3 && (
                                <>
                                    <div></div>
                                    <div></div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
