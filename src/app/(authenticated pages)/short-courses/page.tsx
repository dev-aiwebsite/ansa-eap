import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/imageWithFallback";

export default function Page() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-10">
                 <Button
                          href={`/short-courses/partners`}
                          className="border border-primary overflow-hidden shadow-xxs h-full bg-white rounded-3xl p-4 text-base flex-col items-start justify-start text-start"
                          variant="ghost"
                        >
                          
                          <ImageWithFallback
                          className="!w-full rounded-lg !h-auto aspect-[296/193] object-cover object-[center_30%] block border-b border-gray-200"
                          src="https://ucarecdn.com/764be359-8774-4c7e-b4bf-64e7d51024c8/Deepbreathing.png"
                          alt="partners"
                          />
            
                          <span className="text-sm capitalize whitespace-normal">
                            Partners
                            {/* <span className="block text-xs muted-text">{count} Resources</span> */}
                          </span>
                          <div className="mt-auto flex w-full justify-end items-center">
                            <span className="block -mr-4 -mb-4 py-2 px-6 text-sm text-white bg-primary cursor-pointer">View</span>
                          </div>
                        </Button>
                 <Button
                          href={`/short-courses/marli`}
                          className="border border-primary overflow-hidden shadow-xxs h-full bg-white rounded-3xl p-4 text-base flex-col items-start justify-start text-start"
                          variant="ghost"
                        >
                          
                          <ImageWithFallback
                          className="!w-full rounded-lg !h-auto aspect-[296/193] object-cover object-[center_30%] block border-b border-gray-200"
                          src="https://ucarecdn.com/6107324c-b506-40e8-975f-9bcd094eef07/Slide16_95.png"
                          alt="partners"
                          />
            
                          <span className="text-sm capitalize whitespace-normal">
                            Marli
                            {/* <span className="block text-xs muted-text">{count} Resources</span> */}
                          </span>
                          <div className="mt-auto flex w-full justify-end items-center">
                            <span className="block -mr-4 -mb-4 py-2 px-6 text-sm text-white bg-primary cursor-pointer">View</span>
                          </div>
                        </Button>
        </div>
    );
}