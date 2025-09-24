import { categories } from "@/app/demo/demoData";
import { slugifyName } from "@/lib/helper";
import { Button } from "../ui/button";
import Container from "../ui/container";


const ContentLibraryPageMobile = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-6 pt-10">
        {[...categories].map(({ id, label, icon:Icon }) => {
          return (
            <Button
              href={`/learning-development/${id}~${slugifyName(label)}`}
              key={id}
              className="shadow-lg bg-white text-zinc-400 rounded-xl p-2 text-base flex-col aspect-square h-auto"
              variant="ghost"
            >
                   <Icon
                      
                      className="text-primary !w-[40px] !h-[40px] block"
                    />
              <span className="uppercase text-[10px] font-[600] whitespace-normal">{label}</span>
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

export default ContentLibraryPageMobile;
