"use client";

import { getCompanyByCode } from "@/serverActions/crudCompanies";
import { getPractitioners, Practitioner } from "@/serverActions/crudPractitioners";
import { getHalaxyPractitioners, HalaxyPractitioner } from "@/serverActions/halaxy/practitioners";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState
} from "react";
import { useAppServiceContext } from "./appServiceContext";


type TypeOrgId = string | null
type HalaxyBookingServiceContextType = {
    orgId: TypeOrgId;
    setOrgid: Dispatch<SetStateAction<string | null>>;
    halaxyPractitioners: HalaxyPractitioner[] | null;
    practitioners: Practitioner[] | null;
};

type HalaxyBookingServiceContextProviderProps = {
    children?: React.ReactNode;
};

const HalaxyBookingServiceContext = createContext<HalaxyBookingServiceContextType | null>(null);

export function HalaxyBookingServiceContextProvider({
    children
}: HalaxyBookingServiceContextProviderProps) {
    const { currentUser } = useAppServiceContext();
    const [halaxyPractitioners, setHalaxyPractitioners] = useState<HalaxyPractitioner[] | null>(null)
    const [orgId, setOrgid] = useState<TypeOrgId>(null)
    const [practitioners, setPractitioners] = useState<Practitioner[] | null>(null);


    useEffect(() => {
        async function fetchData() {
            try {
                const [companyRes, practitionersRes, halaxyPractionersRes] = await Promise.all([
                    getCompanyByCode(currentUser.company),
                    getPractitioners(),
                    getHalaxyPractitioners()
                ]);

                if (practitionersRes.success && companyRes) {
                    const companyResData = companyRes.data
                    const practitionersResData = practitionersRes.data
                    const companyPractitioners = practitionersResData?.filter((p) =>
                        companyResData?.practitioners.includes(p.id)
                    );

                       const filteredPracs: Practitioner[] = companyPractitioners
                    ?.map(p => {
                        const halaxyPractitioner = halaxyPractionersRes.find(hp => hp.email === p.email)
                        if (!halaxyPractitioner) return null // skip if not found

                        return {
                            ...p,
                            booking_link: `/health-services/booking/${halaxyPractitioner.roleId}`
                        } as Practitioner
                    })
                    .filter(Boolean) as Practitioner[]; // remove nulls

                    setPractitioners(filteredPracs || []);
                }
                setHalaxyPractitioners(halaxyPractionersRes);

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, [currentUser]);


    useEffect(() => {

        async function fetchData() {
            if (!orgId) return
            try {
                const halaxyPracitionersRes = await getHalaxyPractitioners(orgId)
                setHalaxyPractitioners(halaxyPracitionersRes);

                const filteredPracs: Practitioner[] = practitioners
                    ?.map(p => {
                        const halaxyPractitioner = halaxyPracitionersRes.find(hp => hp.email === p.email)
                        if (!halaxyPractitioner) return null // skip if not found

                        return {
                            ...p,
                            booking_link: `/health-services/booking/${halaxyPractitioner.roleId}`
                        } as Practitioner
                    })
                    .filter(Boolean) as Practitioner[]; // remove nulls

                setPractitioners(filteredPracs)

            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }



        fetchData();

    }, [orgId])




    return (
        <HalaxyBookingServiceContext.Provider
            value={{
                orgId,
                setOrgid,
                halaxyPractitioners,
                practitioners
                
            }}
        >
            {children}
        </HalaxyBookingServiceContext.Provider>
    );
}

export function useHalaxyBookingServiceContext() {
    const context = useContext(HalaxyBookingServiceContext);
    if (!context) {
        throw new Error(
            "useHalaxyBookingServiceContext must be used within a HalaxyBookingServiceContextProvider"
        );
    }
    return context;
}
