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
  useMemo,
  useState,
} from "react";

type PartialPost = (Partial<Post> & { category?: string })[];

type PostServiceContextType = {
  allPosts: PartialPost;
  setAllPosts: Dispatch<SetStateAction<PartialPost>>;
  latestPosts: PartialPost;
  healthNews: PartialPost;
  setHealthNews: Dispatch<SetStateAction<PartialPost>>;
  videoContents: PartialPost;
  yogas: PartialPost;
  blogs: PartialPost;
  addPosts: (posts: PartialPost) => void;
};

type AppServiceContextProviderProps = {
  children?: React.ReactNode;
  data?: PartialPost;
};

const PostServiceContext = createContext<PostServiceContextType | null>(null);

export function PostServiceProvider({ children, data }: AppServiceContextProviderProps) {
  const [allPosts, setAllPosts] = useState<PartialPost>([]);
  const [healthNews, setHealthNews] = useState<PartialPost>(data ?? []);

  useEffect(() => {
    if (!healthNews.length) {
      getNews().then((res) => {
        const formattedSlug = res.map((i) => ({
          ...i,
          slug: `/learning-development/health-news/${slugifyName(i.title)}`,
        }));
        setHealthNews(formattedSlug);
      });
    }

    if (!allPosts.length) {
      getPosts().then((r) => {
        const data = r.data;
        if (data) {
          setAllPosts(data);
        }
      });
    }
  }, []);

  const blogs = useMemo<PartialPost>(
    () => allPosts.filter((p) => p.category === "7p2v1Ur_O6"),
    [allPosts]
  );

  const yogas = useMemo<PartialPost>(
    () => allPosts.filter((p) => p.category === "7p2v1Ur_O5"),
    [allPosts]
  );

  const videoContents = useMemo<PartialPost>(
    () => allPosts.filter((p) => p.category === "7p2v1Ur_O1"),
    [allPosts]
  );

  const latestPosts = useMemo<PartialPost>(() => {
    return [
      yogas.at(-1) ?? null,
      healthNews.at(-1) ?? null,
      blogs.at(-1) ?? null,
      videoContents.at(-1) ?? null,
    ].filter(Boolean) as PartialPost;
  }, [allPosts, healthNews, blogs, yogas, videoContents]);

  const addPosts = (posts: PartialPost) => {
    setAllPosts((prev) => {
      const existingIds = new Set(prev.map((p) => p.id));
      const deduped = posts.filter((p) => !existingIds.has(p.id));
      return [...prev, ...deduped];
    });
  };

  return (
    <PostServiceContext.Provider
      value={{
        allPosts,
        setAllPosts,
        latestPosts,
        healthNews,
        setHealthNews,
        videoContents,
        yogas,
        blogs,
        addPosts,
      }}
    >
      {children}
    </PostServiceContext.Provider>
  );
}

export function usePostServiceContext() {
  const context = useContext(PostServiceContext);
  if (!context) {
    throw new Error("usePostServiceContext must be used within a PostServiceProvider");
  }
  return context;
}
