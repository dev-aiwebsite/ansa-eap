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
import { OrgId } from "@/serverActions/halaxy/types";

type HalaxyBookingServiceContextType = {
    orgId: OrgId;
    setOrgid: Dispatch<SetStateAction<OrgId>>;
    setConsentAgreed: Dispatch<SetStateAction<boolean>>;
    consentAgreed: boolean;
    halaxyPractitioners: HalaxyPractitioner[] | null;
    practitioners: Practitioner[] | null;
    isFetching: boolean;

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
    const [orgId, setOrgid] = useState<OrgId>(null)
    const [companyPractitioners, setCompanyPractitioners] = useState<Practitioner[] | null>(null)
    const [practitioners, setPractitioners] = useState<Practitioner[] | null>(null);
    const [consentAgreed, setConsentAgreed] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    console.log(companyPractitioners)

    useEffect(() => {
        async function fetchData() {
            setIsFetching(true)
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
                    setCompanyPractitioners(companyPractitioners || null)

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
            } finally {
                setIsFetching(false)
            }
        }

        fetchData();
    }, [currentUser]);


    useEffect(() => {

        async function fetchData() {
            if (!orgId) {
                setPractitioners([])
                return
            }
            try {
                setIsFetching(true)
                const halaxyPracitionersRes = await getHalaxyPractitioners(orgId)
                setHalaxyPractitioners(halaxyPracitionersRes);

                const filteredPracs: Practitioner[] = companyPractitioners
                    ?.map(p => {

                        const halaxyPractitioner = halaxyPracitionersRes.find(hp => {
                            // todos - need to udpate since practitioners have different ids on every halaxy group/account
                           return hp.email === p.email || hp.id === p.halaxy_id;
                        })
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
            } finally {
                setIsFetching(false)
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
                practitioners,
                consentAgreed,
                setConsentAgreed,
                isFetching
                
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
