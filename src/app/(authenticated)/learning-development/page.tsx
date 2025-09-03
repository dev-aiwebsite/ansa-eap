"use client";

import PostCards from "@/components/post/postCards";
import { usePostServiceContext } from "@/context/postServiceContext";
import { Post } from "@/serverActions/crudPosts";
import { useEffect, useState } from "react";

type PostCategory = "healthNews" | "yoga" | "video" | "threeMinute";
type Section = {
  id: string; // DOM id for scroll
  title: string; // UI label
  key: PostCategory; // which posts to use
  actionText: "watch" | "read";
};
const sections: Section[] = [
  { id: "healthNews", title: "Allied Health News", key: "healthNews", "actionText": "read" },
  { id: "yoga", title: "Yoga", key: "yoga", "actionText": "watch" },
  { id: "video", title: "Videos", key: "video", "actionText": "watch" },
  { id: "threeMinute", title: "3-Minute Reads", key: "threeMinute", "actionText": "read" },
];

const ContentLibraryPage = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  // 👇 Use context instead of fetching here
  const { healthNews, yogas, videoContents, blogs } = usePostServiceContext();

  // Map context data into the sections object shape
  const posts: Record<PostCategory, Partial<Post>[]> = {
    healthNews: healthNews ?? [],
    yoga: yogas ?? [],
    video: videoContents ?? [],
    threeMinute: blogs ?? [],
  };

  // --- ScrollSpy ---
  useEffect(() => {
    const scrollContainer = document.querySelector(
      ".scrollContainer"
    ) as HTMLElement | null;
    const scrollContainerOffsetTop = scrollContainer?.offsetTop ?? 0;

    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollPos = scrollContainer.scrollTop + scrollContainerOffsetTop;
      let current = sections[0].id;

      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;

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
                activeSection === s.id
                  ? "text-primary font-semibold"
                  : "text-gray-500"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <SectionEl actionText={s.actionText} key={s.id} title={s.title} id={s.id} data={posts[s.key]} />
        ))}
      </div>
    </div>
  );
};

export default ContentLibraryPage;

function SectionEl({
  id,
  title,
  data,
  actionText,
}: {
  id: string;
  title: string;
  data: Partial<Post>[];
  actionText: "watch" | "read";
}) {
  return (
    <section id={id} className="snap-start py-4 px-6 relative mb-14">
      <h3 className="section-title mb-8">{title}</h3>
      <div className="w-full-sidebar flex w-full overflow-auto space-x-6">
        <PostCards
        className="max-w-[280px]"
        data={data}
        id_prefix={id}
        actionText={actionText}/>
      </div>
    </section>
  );
}
