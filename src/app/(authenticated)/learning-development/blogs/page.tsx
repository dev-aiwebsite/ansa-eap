import PostCard from "@/components/post/postCard";
import { Button } from "@/components/ui/button";
import { getBlogs } from "@/serverActions/crudBlogs";
import { Plus } from "lucide-react";

const BlogPage = async () => {
  const { data } = await getBlogs();

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
              <PostCard key={item.id} item={item} />
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BlogPage;


