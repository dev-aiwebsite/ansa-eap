"use client";
import { slugifyName } from "@/lib/helper";
import { Category, getCategoryByType } from "@/serverActions/crudCategories";
import { getPosts, Post } from "@/serverActions/crudPosts";
import { getNews } from "@/serverActions/RssNews";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type PostServiceContextType = {
  generatePostLink: (post:Post)=> string,
  setCategories:Dispatch<SetStateAction<Category[]>>;
  categories: Category[];
  allPosts: Post[];
  setAllPosts: Dispatch<SetStateAction<Post[]>>;
  blogs: Post[];
  yogas: Post[];
  videoContents: Post[];
  healthNews: Post[];
  latestPosts: Post[];
};

const PostServiceContext = createContext<PostServiceContextType | null>(null);

export function PostServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [blogs, setBlogs] = useState<Post[]>([]);
  const [yogas, setYogas] = useState<Post[]>([]);
  const [videoContents, setVideoContents] = useState<Post[]>([]);
  const [healthNews, setHealthNews] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  // fetch data
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Run both requests in parallel
        const [newsRes, postsRes] = await Promise.all([getNews(), getPosts()]);

        // Format health news
        const formattedNews = (newsRes || []).map((i) => ({
          ...i,
          slug: `/learning-development/7p2v1Ur_O4~health-news/${slugifyName(
            i.title
          )}`,
        }));

        // Get posts
        const postsData = postsRes?.data ?? [];

        // Update state once
        setHealthNews(formattedNews);
        setAllPosts([...formattedNews, ...postsData]);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    }

    fetchPosts();

    async function fetchCategories() {
      const { data } = await getCategoryByType("post");

      if (data) {
        setCategories(data);
      }
    }

    fetchCategories();
  }, []);

  // derive categories once when allPosts changes
  useEffect(() => {
    if (!allPosts.length) return;
    setBlogs(allPosts.filter((p) => p.category === "7p2v1Ur_O6") as Post[]);
    setYogas(allPosts.filter((p) => p.category === "7p2v1Ur_O5") as Post[]);
    setVideoContents(
      allPosts.filter((p) => p.category === "7p2v1Ur_O1") as Post[]
    );
  }, [allPosts]);

  const latestPosts = [
    yogas.at(-1) ?? null,
    healthNews.at(-1) ?? null,
    blogs.at(-1) ?? null,
    videoContents.at(-1) ?? null,
  ].filter(Boolean) as Post[];

  function generatePostLink(post: Post) {
    return `/learning-development/${post.category}~${categories.find(c => c.id == post.category)?.label}/${post.id}~${post.title}`
  }

  return (
    <PostServiceContext.Provider
      value={{
        generatePostLink,
        setCategories,
        categories,
        allPosts,
        setAllPosts,
        blogs,
        yogas,
        videoContents,
        healthNews,
        latestPosts,
      }}
    >
      {children}
    </PostServiceContext.Provider>
  );
}

export function usePostServiceContext() {
  const ctx = useContext(PostServiceContext);
  if (!ctx) {
    throw new Error(
      "usePostServiceContext must be used within PostServiceProvider"
    );
  }
  return ctx;
}
