"use client"

import { getPractitioners, Practitioner } from "@/serverActions/crudPractitioners";
import { useEffect, useState } from "react";
import PractitionerCard from "./PractitionerCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export default function AppBookingWidget() {
    const [selected, setSelected] = useState("inperson"); // always one selected

    const [practitioners, setPractitioners] = useState<Practitioner[]>([])
    useEffect(() => {
        getPractitioners()
            .then(r => {
                if (r.data) {
                    setPractitioners(r.data)
                }
            })
    }, [])

    return (
        <div className="w-full-sidebar space-y-10">
            <div className="flex w-full gap-4"> {/* adjust max-w as needed */}
                <ToggleGroup
                    type="single"
                    value={selected}
                    onValueChange={(value) => value && setSelected(value)} // prevent deselect
                    className="inline-flex w-full md:max-w-md border-2 border-primary/50 overflow-hidden"
                >
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


                </ToggleGroup>
                {selected == "online" &&
                    <Select>
                        <SelectTrigger className="w-[180px] !px-4 !py-2 !h-auto">
                            <SelectValue placeholder="Select a location" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ballarat">Ballarat</SelectItem>
                            <SelectItem value="bacchus_marsh">Bacchus Marsh </SelectItem>
                            <SelectItem value="geelong">Geelong</SelectItem>
                            <SelectItem value="melton">Melton</SelectItem>
                            <SelectItem value="melbourne">Melbourne</SelectItem>
                        </SelectContent>
                    </Select>
                }
            </div>
            {/* practitioners  */}

            <div>
                <div className="grid gap-5 gap-y-10 grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
                    {practitioners?.map((item) => (
                        <PractitionerCard key={item.id} item={item} />
                    ))}

                    {practitioners.length  < 3 && <>
                    <div></div>
                    <div></div>
                    </>}
                </div>
            </div>


        </div>
    );
}


