"use client";
import { Search } from "lucide-react";
import { Button } from "./button";
import PageTitle from "./pageTitle";

const MainHeader = () => {
  return (
    <div className="flex flex-row items-center gap-4 py-6 h-header">
      <h1 className="text-lg font-bold">
        <PageTitle />
      </h1>
      <div>
        <Button
          className="rounded-full bg-white aspect-square !p-5 text-primary"
          size="icon"
          variant="secondary"
        >
          <Search />
        </Button>
      </div>
    </div>
  );
};

export default MainHeader;
