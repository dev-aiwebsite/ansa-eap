import { categories } from "@/app/demo/demoData";
import { slugifyName } from "@/lib/helper";
import { Button } from "../ui/button";
import Container from "../ui/container";

const ContentLibraryPageMobile = () => {
  return (
    <Container>
      <div className="grid grid-cols-3 gap-6 pt-10">
        {[...categories].map(({ id, label }) => {
          return (
            <Button
              href={`/learning-development/${id}~${slugifyName(label)}`}
              key={id}
              className="bg-app-purple-300 shadow-lg text-white rounded-xl p-2 text-base flex-col aspect-square h-auto"
              variant="ghost"
            >
              <span className="font-bold capitalize text-sm whitespace-normal">{label}</span>
            </Button>
          );
        })}
      </div>
    </Container>
  );
};

export default ContentLibraryPageMobile;
