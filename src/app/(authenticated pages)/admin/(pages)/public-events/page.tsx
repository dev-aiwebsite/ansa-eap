"use client"
import { PublicEventsColumns } from "@/components/dataTables/columns/ColumnPublicEvents";
import { DataTable } from "@/components/dataTables/dataTable";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getPublicEvents, PublicEvent } from "@/serverActions/crudPublicEvents";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
      const [events, setEvents] = useState<PublicEvent[]>([]);
      useEffect(() => {
        getPublicEvents({
          orderBy: 'date',
          order: 'DESC'
        }).then((res) => setEvents(res.data || []));
      }, []);
    
    return (
       <Container className="card w-full-sidebar">
              <div className="flex flex-row">
                <h2 className="mb-5">Public Events </h2>
                <Button href="/admin/public-events/new" className="ml-auto">
                  <PlusCircle /> Add New
                </Button>
              </div>
                <DataTable columns={PublicEventsColumns} data={events}/>              
        </Container>
    );
}

export default Page;