import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import Link from "next/link";

const CriticalResponsePage = () => {
  return (
    <Container>
      <div className="flex gap-6">
        <Link className="card min-h-[200px] w-[350px]" href={"#"}>
        <div className="flex flex-col h-full gap-2">
          <p>Debriefing</p>
          <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, tempore.</p>
          <div className="mt-auto">
            <Button>Button</Button>  
          </div>
        </div>
        </Link >
        <Link href={"#"} className="card min-h-[200px] w-[350px]">
        <div className="flex flex-col h-full gap-2">
          <p>Suicide & Sudden Death</p>
          <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, tempore.</p>
          <div className="mt-auto">
            <Button>Button</Button>  
          </div>
        </div>
        </Link>
        <Link href={"#"} className="card min-h-[200px] w-[350px]">
        <div className="flex flex-col h-full gap-2">
          <p>Organisational Transition and Change</p>
          <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, tempore.</p>
          <div className="mt-auto">
            <Button>Button</Button>  
          </div>
        </div>
        </Link>
      </div>
    </Container>
  );
};

export default CriticalResponsePage;
