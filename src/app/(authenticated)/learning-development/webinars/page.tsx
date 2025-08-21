import PostCard from "@/components/post/postCard";
import { Button } from "@/components/ui/button";
import { getWebinars } from "@/serverActions/crudWebinars";
import { Plus } from "lucide-react";

const WebinarPage = async () => {
  const { data } = await getWebinars();


  return (
    <div>
      <Button href="/learning-development/blogs/new" className="flex ml-auto">
        {" "}
        <Plus /> Add New
      </Button>
      <div className="grid">
        <div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
            {data && data.map((item) => 
              <PostCard key={item.id} item={item} actionText="watch"/>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default WebinarPage;