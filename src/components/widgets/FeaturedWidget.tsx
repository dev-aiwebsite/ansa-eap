"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";

const data = {
  bg_color: "#26cec4",
  bg_image: "/assets/images/img4.png",
  title: "WEBINAR:",
  text_content:
    "Supporting Autistic, ADHD & Neurodivergent Clients in Your Healthcare Practice",
  btn_text: "Register",
  btn_link: "#",
};

const FeaturedWidget = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("text-sm", className)}
      style={{
        backgroundColor: data.bg_color ?? "",
        backgroundImage: data.bg_image ? `url(${data.bg_image})` : undefined,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="pr-[30%] h-full space-y-10">
        <h2 className="card-title font-medium text-background">
          Featured Content
        </h2>
        <p className="text-background">
          <strong>{data.title ?? ""} </strong>
          {data.text_content ?? ""}
        </p>
        <Link
          className="decoration-none block w-fit rounded-md ring-1 ring-white py-2 px-5 text-center text-white"
          href={data.btn_link ?? "#"}
        >
          {data.btn_text ?? "Register"}
        </Link>
      </div>
    </div>
  );
};

export default FeaturedWidget;
