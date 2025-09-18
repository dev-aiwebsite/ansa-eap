"use client";

import { MOOD_STATEMENT_BANK } from "@/lib/const";
import Link from "next/link";

function getRandomStatement(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function MoodStatement({
  percentage,
}: {
  percentage: number | undefined;
}) {
  if (!percentage) return null;

  const isPositive = percentage >= 50; // threshold for mood
  const statement = isPositive
    ? getRandomStatement(MOOD_STATEMENT_BANK.above)
    : getRandomStatement(MOOD_STATEMENT_BANK.below);

  return (
    <div>
      <span>{statement} </span>
      {!isPositive && (
        <Link href="/learning-development" className="underline font-medium">
          Visit L&D
        </Link>
      )}
    </div>
  );
}
