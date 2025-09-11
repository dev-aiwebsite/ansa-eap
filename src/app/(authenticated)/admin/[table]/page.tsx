import { Suspense } from "react";

interface DynamicRouteProps {
  params: { table: string };
}

const Page = ({ params }: DynamicRouteProps) => {

    const id = params.table
    console.log(id)
    return (
       <Suspense
      fallback={
        <div>loading</div>
      }
    >
      {id ? <WithData table={id} /> : <p>Practitioner not found</p>}
    </Suspense>
    );
}

export default Page;

async function WithData({table}:{table:string}){

    return <>
        this is the data {table}
    
    </>
}