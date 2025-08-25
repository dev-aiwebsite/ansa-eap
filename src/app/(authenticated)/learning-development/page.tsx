"use client";
import PostCard, { Post } from "@/components/post/postCard";
import PostCardSkeleton from "@/components/post/postCardSkeleton";
import { iconMap } from "@/lib/icon-map";
import { getBlogs } from "@/serverActions/crudBlogs";
import { getWebinars } from "@/serverActions/crudWebinars";
import { getYogas } from "@/serverActions/crudYogas";
import { useEffect, useState } from "react";

export type LearningDevelopment = {
  name: string;
  icon: keyof typeof iconMap;
  lessons_count: string;
  total_time: string;
  status: string;
  link: string;
};
type PostCategory = "healthNews" | "yoga" | "video" | "threeMinute";
type Section = {
  id: string;       // DOM id for scroll
  title: string;    // UI label
  key: PostCategory // which posts to use
};
const sections: Section[] = [
  { id: "healthNews", title: "Allied Health News", key: "healthNews" },
  { id: "yoga", title: "Yoga", key: "yoga" },
  { id: "video", title: "Videos", key: "video" },
  { id: "threeMinute", title: "3-Minute Reads", key: "threeMinute" },
];



const ContentLibraryPage = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [posts, setPosts] = useState<Record<PostCategory, Post[]>>({
    healthNews: [],
    yoga: [],
    video: [],
    threeMinute: [],
  });
  
  useEffect(() => {
    getYogas().then((res) => {
      if (res.success && res.data) {
        setPosts((prev) => ({ ...prev, yoga: res.data as Post[] }));
      }
    });
  
    getWebinars().then((res) => {
      if (res.success && res.data) {
        setPosts((prev) => ({
          ...prev,
          video: res.data as Post[]
        }));
      }
    });
  
    getBlogs().then((res) => {
      if (res.success && res.data) {
        setPosts((prev) => ({ ...prev, threeMinute: res.data as Post[] }));
      }
    });
  }, []);

  
  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".scrollContainer"
    ) as HTMLElement | null;
    const scrollContainerOffsetTop = scrollContainer?.offsetTop ?? 0
  
    if (!scrollContainer) return;
  
    const handleScroll = () => {
      const scrollPos = scrollContainer.scrollTop + scrollContainerOffsetTop
      let current = sections[0].id;
  
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
  
        // offsetTop is relative to container, not window
        const elTop = el.offsetTop;
        if (elTop <= scrollPos) {
          current = section.id;
        }
      }
  
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };
  
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [activeSection]);
  
    
  
  
  

  // Smooth scroll when clicking tab
  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="card flex-1 px-0 h-full bg-transparent overflow-hidden">
      <div className="w-full-sidebar snap-y snap-proximity scrollContainer pb-[300px] rounded-xl flex-1 mx-h-webkit-fill overflow-auto">
        {/* Sticky Tabs */}
        <div className="stickyNav card sticky top-0 bg-white px-6 py-4 flex space-x-6 z-[999999]">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => handleClick(s.id)}
              className={`p-0 transition-colors ${
                activeSection === s.id ? "text-primary font-semibold" : "text-gray-500"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <SectionEl key={s.id} title={s.title} id={s.id} data={posts[s.key]}/>

        ))} 
      </div>
    </div>
  );
};

export default ContentLibraryPage;


function SectionEl({id,title,data}:{id:string,title:string,data:Post[]}){
  return <section id={id} className="snap-start py-4 px-6 relative mb-14">
  <h2 className="section-title mb-8">{title}</h2>
  <div className="w-full-sidebar flex w-full overflow-auto space-x-6">
  {data && data.length > 0 ? (
data.map((item) => (
<PostCard
className="w-[300px] inline-flex"
key={item.id + "health-news"}
item={item}
actionText="watch"
/>
))
) : (
Array.from({ length: 4 }).map((_, i) => (
<PostCardSkeleton key={i} className="w-[300px] inline-flex" />
))
)}

  </div>
</section>
}