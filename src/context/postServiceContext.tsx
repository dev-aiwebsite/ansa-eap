"use client";
import { slugifyName } from "@/lib/helper";
import { getPosts, Post } from "@/serverActions/crudPosts";
import { getNews } from "@/serverActions/RssNewsWellBeing";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type PartialPost = (Partial<Post> & { category?: string });

type PostServiceContextType = {
  allPosts: PartialPost[];
  setAllPosts: Dispatch<SetStateAction<PartialPost[]>>;
  blogs: Post[];
  yogas: Post[];
  videoContents: Post[];
  healthNews: PartialPost[];
  latestPosts: PartialPost[];
  addOrUpdatePost: (post: Partial<Post>) => void;
};

const PostServiceContext = createContext<PostServiceContextType | null>(null);

export function PostServiceProvider({ children }: { children: React.ReactNode }) {
  const [allPosts, setAllPosts] = useState<PartialPost[]>([]);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [yogas, setYogas] = useState<Post[]>([]);
  const [videoContents, setVideoContents] = useState<Post[]>([]);
  const [healthNews, setHealthNews] = useState<PartialPost[]>([]);

  // fetch data
  useEffect(() => {
    if (!healthNews.length) {
      getNews().then((res) => {
        const formatted = res.map((i) => ({
          ...i,
          slug: `/learning-development/health-news/${slugifyName(i.title)}`,
        }));
        setHealthNews(formatted);
      });
    }

    if (!allPosts.length) {
      getPosts().then((r) => {
        const data = r.data ?? [];
        setAllPosts(data);
      });
    }
  }, []);

  // derive categories once when allPosts changes
  useEffect(() => {
    if (!allPosts.length) return;

    setBlogs(allPosts.filter((p) => p.category === "7p2v1Ur_O6") as Post[]);
    setYogas(allPosts.filter((p) => p.category === "7p2v1Ur_O5")  as Post[]);
    setVideoContents(allPosts.filter((p) => p.category === "7p2v1Ur_O1") as Post[]);
  }, [allPosts]);

  const latestPosts = [
    yogas.at(-1) ?? null,
    healthNews.at(-1) ?? null,
    blogs.at(-1) ?? null,
    videoContents.at(-1) ?? null,
  ].filter(Boolean) as PartialPost[];

  // update or insert post into allPosts (and derived categories auto-update)
  const addOrUpdatePost = (post: Partial<Post>) => {
    setAllPosts((prev) => {
      const exists = prev.findIndex((p) => p.id === post.id);
      if (exists !== -1) {
        const updated = [...prev];
        updated[exists] = { ...updated[exists], ...post };
        return updated;
      }
      return [...prev, post];
    });
  };

  return (
    <PostServiceContext.Provider
      value={{
        allPosts,
        setAllPosts,
        blogs,
        yogas,
        videoContents,
        healthNews,
        latestPosts,
        addOrUpdatePost,
      }}
    >
      {children}
    </PostServiceContext.Provider>
  );
}

export function usePostServiceContext() {
  const ctx = useContext(PostServiceContext);
  if (!ctx) {
    throw new Error("usePostServiceContext must be used within PostServiceProvider");
  }
  return ctx;
}
