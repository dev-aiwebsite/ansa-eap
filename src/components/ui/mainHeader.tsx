import PageTitle from "./pageTitle";
import { GlobalSearch } from "@/components/ui/globalSearch";

const MainHeader = () => {
  return (
    <div className="flex flex-row items-center gap-4 py-6 h-header">
      <h1 className="text-lg font-bold">
        <PageTitle />
      </h1>
      <div>
        <GlobalSearch />
      </div>
    </div>
  );
};

export default MainHeader;
