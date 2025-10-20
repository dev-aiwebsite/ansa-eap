"use client";
import { usePostServiceContext } from "@/context/postServiceContext";
import * as Icons from "@/icons";
import { slugifyName } from "@/lib/helper";
import { Button } from "../ui/button";
const ContentLibraryPageMobile = () => {
  const { categories } = usePostServiceContext();

  return (
    
      <div className="grid grid-cols-3 gap-6 pt-10">
        {categories.map(({ id, label, icon }) => {
          const Icon = Icons[icon as keyof typeof Icons] as
            | Icons.IconComponent
            | undefined;
          return (
            <Button
              href={`/learning-development/${id}~${slugifyName(label)}`}
              key={id}
              className="shadow-lg bg-white text-zinc-400 rounded-xl p-2 text-base flex-col aspect-square h-auto"
              variant="ghost"
            >
              {/* ✅ Only render Icon if it exists */}
              {Icon && (
                <Icon className="text-primary w-[40px] h-[40px] block" />
              )}

              <span className="uppercase text-[10px] font-[600] whitespace-normal">
                {label}
              </span>
            </Button>
          );
        })}
      </div>
    
  );
};

export default ContentLibraryPageMobile;
