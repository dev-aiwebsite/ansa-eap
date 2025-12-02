"use client"


import { ColumnShortCourse } from "@/components/dataTables/columns/ColumnShortCourses";
import { DataTable } from "@/components/dataTables/dataTable";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { getShortCourses, ShortCourse } from "@/serverActions/crudShortCourses";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";

const Page = () => {
      const [events, setEvents] = useState<ShortCourse[]>([]);
      useEffect(() => {
        getShortCourses({
          orderBy: 'created_at',
          order: 'DESC'
        }).then((res) => setEvents(res.data || []));
      }, []);
    
    return (
       <Container className="card w-full-sidebar">
              <div className="flex flex-row">
                <h2 className="mb-5">Short Courses </h2>
                <Button href="/admin/short-courses/new" className="ml-auto">
                  <PlusCircle /> Add New
                </Button>
              </div>
                <DataTable columns={ColumnShortCourse} data={events}/>              
        </Container>
    );
}

export default Page;