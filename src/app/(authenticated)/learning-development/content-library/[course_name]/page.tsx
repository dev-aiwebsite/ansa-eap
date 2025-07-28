"use client";
import { useParams } from "next/navigation";
import { slugifyName } from "@/lib/helper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { coursesData } from "@/app/demo/demoData";

const CourseSinglePage = () => {
  const params = useParams();
  const course_name = params.course_name;
  const courseData = coursesData.filter(
    (i) => slugifyName(i.name) == course_name
  )[0];

  console.log(courseData, "courseData");
  return (
    <div className="flex gap-6 h-full">
      <div className="card flex-1 overflow-auto">
        <div>
          <Image
          className="w-full"
          src="/assets/images/video.png"
          width={400}
          height={200}
          alt="sample"/>
        </div>
        <h2 className="mt-4 text-2xl font-medium">{courseData.name}</h2>
        <div className="space-x-2 text-sm text-muted-foreground">
          <p>{courseData.author}</p>
        </div>

        <Tabs defaultValue="overview" className="w-full text-sm">
          <TabsList variant="underlined" className="bg-transparent gap-10 ">
            <TabsTrigger
              className="!px-0 text-muted-foreground"
              variant="underlined"
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="!px-0 text-muted-foreground"
              variant="underlined"
              value="faq"
            >
              FAQ
            </TabsTrigger>
            <TabsTrigger
              className="!px-0 text-muted-foreground"
              variant="underlined"
              value="discussion"
            >
              Discussion
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6 pt-6">
            <div>
              <p className="text-base font-medium">Course Description</p>
              <p className="text-muted-foreground">
                Endorsed by Osteopathy Australia, this 18 module course created
                by Dr. Jade Scott, Osteopath and GrowthRx Founder is packed with
                everything you need to take your practice from Good to GREAT! 
              </p>
            </div>
            <div>
              <p className="text-base font-medium">Course Takeaways</p>
              <ul className="list-disc pl-4 text-sm text-muted-foreground marker:text-primary columns-2 gap-x-6">
                <li>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Placeat, iusto.
                </li>
                <li>
                  Odio illo facilis adipisci libero voluptatum quam, dolorem
                  temporibus. Non?
                </li>
                <li>
                  Ad nulla non ipsam explicabo numquam odit commodi amet
                  corporis.
                </li>
                <li>
                  Quidem soluta exercitationem mollitia optio iure, quo
                  distinctio eum iste!
                </li>
                <li>
                  Doloribus vitae eligendi adipisci odit alias quae mollitia
                  nemo tempora?
                </li>
                <li>
                  Tenetur dicta quis, repudiandae voluptate veniam facilis earum
                  molestiae quos.
                </li>
              </ul>
            </div>
            <div>
              <p className="text-base font-medium">Course Description</p>
              <p className="text-muted-foreground">
                Clinic owners. Supervisor. Managers. Leaders
              </p>
            </div>
          </TabsContent>
          <TabsContent value="faq">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi
            nam voluptatem atque natus illo quo, sapiente pariatur recusandae
            rem possimus nulla omnis laboriosam, quas est illum! Voluptates eius
            sint alias.
          </TabsContent>
          <TabsContent value="discussion">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla odit
            quas sint nam deserunt vel distinctio corporis aliquid mollitia
            harum illum at dolore nostrum labore, quia minima officia ab neque?
          </TabsContent>
        </Tabs>
      </div>
      <div className="card md:w-[340px] md:max-w-[340px]">
        Course Content
      </div>
    </div>
  );
};

export default CourseSinglePage;
