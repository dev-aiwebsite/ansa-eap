"use client"
import DailyCheckIn from "@/components/forms/dailyCheckin/dailyCheckIn";
import { Calendar } from "@/components/ui/calendar";
import WeeklyBites from "@/components/weeklyBites";
import FeaturedWidget from "@/components/widgets/FeaturedWidget";
import MoodWidget from "@/components/widgets/MoodWidget";
import { useEffect } from "react";

const DashboardPage = () => {
  useEffect(() => {
    const dailyCheckingEl = document.querySelector('.will-focused')
    if(dailyCheckingEl){
      addFocused(dailyCheckingEl)
    }
    function removeFocusedClass(e:PointerEvent) {
      console.log(e, "pointerdown");
      const target = e.target as HTMLElement | null;
      const willFocused = target?.closest(".will-focused");
      

      if (!willFocused) {
        // remove the 'focused' class from any element that has it
        document.querySelectorAll(".focused").forEach(el => {
          el.classList.remove("focused");
        });

        setTimeout(()=>{
          document.querySelectorAll('.overflow-auto.overflow-visible').forEach( el => {
            el.classList.remove("overflow-visible")
          })

        }, 500)
      } else {
        addFocused(willFocused)
      }

   
    }

    function addFocused(willFocused:Element){
      const hasFocused = willFocused.classList.contains('focused')
      if(!hasFocused){
        document.querySelectorAll('.overflow-auto').forEach( el => {
          el.classList.add("overflow-visible")
        })
        willFocused.classList.add("focused")
      }
      }
    document.addEventListener("pointerdown", removeFocusedClass);

    return () => {
      document.removeEventListener("pointerdown", removeFocusedClass);
    };


},[])
  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="flex flex-row h-full gap-6">
        <div className="flex-1 gap-6 flex flex-col flex-nowrap overflow-auto">
          <div className="will-focused card bg-primary h-fit text-white w-full">
            <DailyCheckIn/>
          </div>

          <div className="flex flex-row flex-wrap basis-full min-h-[290px] max-h-fit gap-6">
            <div className="card p-0 w-1/3 min-w-[300px]">
             <FeaturedWidget className="card h-full"/>
            </div>

            <div className="card bg-white flex-1">
              <MoodWidget />
            </div>
          </div>

          <div className="card bg-white flex-1">
            <WeeklyBites />
          </div>
        </div>

        <div className="right-sidebar">
          <Calendar className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
