"use client";
import PostCards from "@/components/post/postCards";
import { usePostServiceContext } from "@/context/postServiceContext";
import { slugifyName } from "@/lib/helper";

const NewsPage = () => {
  const {healthNewsPosts:data} = usePostServiceContext()


  return (
    <div>
      <div className="grid">
        <div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 flex-wrap gap-5 gap-y-10 w-full-sidebar">
            <PostCards
              data={data.map(i => ({...i,  ...i,
                slug: `/learning-development/health-news/${slugifyName(
                  i?.title ?? ""
                )}`}))}
              id_prefix="health-news"
              actionText="read"
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default NewsPage;
