"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useAppServiceContext } from "@/context/appServiceContext";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
const questions = [
  {
    id: "dcq1",
    question: "How would you rate your energy today?",
    labels: {
      min: "Flat",
      max: "Energized",
    },
    min: 0,
    max: 5,
    rangeClassName: "bg-app-red-200",
    thumbClassName: "bg-app-red-200",
  },
  {
    id: "dcq2",
    question: "How stressed are you feeling right now?",
    labels: {
      min: "Not at all",
      max: "Extemely",
    },
    min: 0,
    max: 5,
    rangeClassName: "bg-app-blue-400",
    thumbClassName: "bg-app-blue-400",
  },
  {
    id: "dcq3",
    question: "How are you feeling today overall?",
    labels: {
      min: "Very low",
      max: "Great",
    },
    min: 0,
    max: 5,
    rangeClassName: "bg-app-yellow-400",
    thumbClassName: "bg-app-yellow-400",
  },
];

type DailyCheckInProps = {
  isFocused: boolean;
  focusOnChange: (value: boolean) => void; // <-- the setter function type
};
export default function DailyCheckIn({
  isFocused = false,
  focusOnChange,
}: DailyCheckInProps) {
  const didInitRef = useRef(false);
  const { saveDailyCheckIns, currentUser, dailyCheckIns } =
    useAppServiceContext();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>(
    Array(questions.length).fill(3)
  );

  const entryToday = getEntryToday(dailyCheckIns);

  const handleSliderChange = (value: number[]) => {
    const updated = [...answers];
    updated[step] = value[0];
    setAnswers(updated);
  };

  const next = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async () => {
    alert(`"Daily check-in answers:", ${answers}`);

    const formData = questions.map((q, index) => {
      return {
        question: q.question,
        answer: answers[index],
      };
    });

    saveDailyCheckIns(formData)
      .then((r) => {
        console.log(r);
      })
      .catch((err) => console.log(err));
  };

  function removeFocused() {
    
    focusOnChange(false);
  }

  useEffect(() => {
    
    if (didInitRef.current) return; 
    didInitRef.current = true;

    if (!entryToday.length) {
      focusOnChange(true);
    }
  }, [entryToday]);

  return (
    <div className="w-full flex flex-row">
      {entryToday.length <= 0 && (
        <>
          <div className="md:min-w-[300px] pr-10">
            <h1 className="text-3xl">Hi {currentUser?.first_name},</h1>
            <p className="text-lg mb-4">{questions[step].question}</p>
            {isFocused && (
              <Button
                onClick={removeFocused}
                size="sm"
                className="!ring-1 ring-white opacity-80 hover:opacity-100 bg-transparent text-white hover:text-white"
                variant="outline"
              >
                Do it later
              </Button>
            )}
          </div>
          <div className="w-full">
            <div className="flex flex-row gap-10">
              <div className="flex-1 formItem">
                <div className="mb-2 text-sm flex flex-row w-full">
                  <p>{questions[step].labels.min}</p>
                  <p className="ml-auto">{questions[step].labels.max}</p>
                </div>
                <div className="relative mb-4 h-6">
                  <div className="absolute w-full top-0 flex justify-between px-1 text-xs text-gray-500">
                    {Array.from({ length: 6 }, (_, i) => i + 1).map((n) => {
                      const currentNum = n - 1;

                      return (
                        <div
                          key={currentNum}
                          className="text-lg text-background flex flex-col items-center w-0"
                        >
                          {currentNum != 0 && (
                            <>
                              <span>{currentNum}</span>
                              {/* <div className="h-3 w-[1px] bg-white mb-[2px]" /> */}
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Slider
                  value={[answers[step]]}
                  onValueChange={handleSliderChange}
                  min={questions[step].min}
                  max={questions[step].max}
                  step={1}
                  className="mb-2 ring-white"
                  rangeClassName={questions[step].rangeClassName}
                  thumbClassName={cn(
                    questions[step].thumbClassName,
                    "!h-6 !w-6"
                  )}
                  trackClassName="!h-3"
                />
              </div>

              <div className="flex gap-2 flex-col justify-end">
                <p className="text-xs w-fit mx-auto">
                  {step + 1}/{questions.length} <span>Questions</span>
                </p>

                {step < questions.length - 1 ? (
                  <Button
                    variant="secondary"
                    onClick={next}
                    className="bg-white text-primary rounded-xl !py-[3px] min-w-[11ch]"
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="secondary"
                    onClick={handleSubmit}
                    className="bg-white text-primary rounded-xl !py-[3px] min-w-[11ch]"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {entryToday.length > 0 && <div>Glad to know your mood is looking great today.</div>}
    </div>
  );
}

function getEntryToday(entries: Record<"created_at", string>[]) {
  if (!entries.length) return [];
  const today = new Date().toISOString().split("T")[0]; // "2025-08-27"

  return entries.filter((entry) => {
    const entryDate = new Date(entry.created_at).toISOString().split("T")[0];
    return entryDate === today;
  });
}
