"use client";

import { useAppServiceContext } from "@/context/appServiceContext";
import { Company, getCompanyByCode } from "@/serverActions/crudCompanies";
import { getPractitioners, Practitioner } from "@/serverActions/crudPractitioners";
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
    const [selected, setSelected] = useState<"online" | "inperson">("online");
    const [selectedLocation, setSelectedLocation] = useState<string | undefined>(undefined);

    const [company, setCompany] = useState<Company | undefined>(undefined);
    const [practitioners, setPractitioners] = useState<Practitioner[] | undefined>(undefined);

    const { currentUser } = useAppServiceContext();

    useEffect(() => {
        async function fetchData() {
            try {
                const [companyRes, practitionersRes] = await Promise.all([
                    getCompanyByCode(currentUser.company),
                    getPractitioners(),
                ]);

                if (companyRes.success) setCompany(companyRes.data);
                if (practitionersRes.success) setPractitioners(practitionersRes.data || []);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, [currentUser]);

    /** Practitioners belonging to this company */
    const companyPractitioners = practitioners?.filter((p) =>
        company?.practitioners.includes(p.id)
    );

    /** Apply location filter only if in-person */
    let filteredPractitioners = companyPractitioners

    if (selected === "inperson" && selectedLocation) {
        filteredPractitioners = companyPractitioners?.filter((p) => p.locations?.includes(selectedLocation))
    } else if (selected === "inperson" && !selectedLocation) {
        filteredPractitioners = undefined
    }


    const hasAvailable = filteredPractitioners?.length ?? 0;


    return (
        <div className="w-full-sidebar space-y-10">
            {/* MODE + LOCATION FILTER */}
            <div className="flex w-full gap-4">

                {/* Toggle Online / In-person */}
                <ToggleGroup
                    type="single"
                    value={selected}
                    onValueChange={(value) => value && setSelected(value as "online" | "inperson")}
                    className="inline-flex w-full md:max-w-md border-2 border-primary/50 overflow-hidden"
                >
                    <ToggleGroupItem
                        value="online"
                        aria-label="Online (Telehealth)"
                        className="flex-1 text-center px-4 py-2 font-semibold text-primary 
                            data-[state=on]:bg-primary 
                            data-[state=on]:text-white
                            !rounded-none"
                    >
                        Online (Telehealth)
                    </ToggleGroupItem>

                    <ToggleGroupItem
                        value="inperson"
                        aria-label="In-Person"
                        className="flex-1 text-center px-4 py-2 font-semibold text-primary 
                            data-[state=on]:bg-primary 
                            data-[state=on]:text-white
                            !rounded-none"
                    >
                        In-Person
                    </ToggleGroupItem>
                </ToggleGroup>

                {/* Location dropdown (only for in-person) */}
                {selected === "inperson" && (
                    <Select
                        value={selectedLocation}
                        onValueChange={setSelectedLocation}>
                        <SelectTrigger className="w-[180px] !px-4 !py-2 !h-auto">
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
                <div className="grid gap-5 gap-y-10 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">

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
                            {filteredPractitioners?.map((item) => (
                                <PractitionerCard key={item.id} item={item} />
                            ))}

                            {/* Filler grid cells to keep layout aligned */}
                            {filteredPractitioners!.length < 3 && (
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
