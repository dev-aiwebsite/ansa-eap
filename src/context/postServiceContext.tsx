"use client";
import { slugifyName } from "@/lib/helper";
import { Category, getCategoryByType } from "@/serverActions/crudCategories";
import { createLike, deleteLike, getLikes, Like } from "@/serverActions/crudLikes";
import { getPosts, Post, Posts } from "@/serverActions/crudPosts";
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
  allPosts: Posts;
  setAllPosts: Dispatch<SetStateAction<Posts>>;
  blogs: Posts;
  yogas: Posts;
  videoContents: Posts;
  healthNews: Posts;
  latestPosts: Posts;
  allLikes: Like[];
  toggleLike: (postId: string, userId: string) => Promise<boolean>;
};

const PostServiceContext = createContext<PostServiceContextType | null>(null);

export function PostServiceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [allPosts, setAllPosts] = useState<Posts>([]);
  const [blogs, setBlogs] = useState<Posts>([]);
  const [yogas, setYogas] = useState<Posts>([]);
  const [videoContents, setVideoContents] = useState<Posts>([]);
  const [healthNews, setHealthNews] = useState<Posts>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allLikes,setAllLikes] = useState<Like[]>([])
  // fetch data
  useEffect(() => {
    async function fetchPosts() {
      try {
        // Run both requests in parallel
        const [newsRes, postsRes] = await Promise.all([getNews(), getPosts()]);

        // Format health news
        const formattedNews = (newsRes || []).map((i) => ({
          ...i,
          slug: `/resources/7p2v1Ur_O4~health-news/${slugifyName(
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
    async function fetchLikes(){

     const { data } = await getLikes();

      if (data) {
        setAllLikes(data)
    }
  }
    fetchLikes()

  }, []);

  // derive categories once when allPosts changes
  useEffect(() => {
    if (!allPosts.length) return;
    setBlogs(allPosts.filter((p) => p.category === "7p2v1Ur_O6") as Posts);
    setYogas(allPosts.filter((p) => p.category === "7p2v1Ur_O5") as Posts);
    setVideoContents(
      allPosts.filter((p) => p.category === "7p2v1Ur_O1") as Posts
    );
  }, [allPosts]);

  const latestPosts = [
    yogas.at(-1) ?? null,
    healthNews.at(-1) ?? null,
    blogs.at(-1) ?? null,
    videoContents.at(-1) ?? null,
  ].filter(Boolean) as Posts;

  function generatePostLink(post: Post) {
    return `/resources/${post.category}~${categories.find(c => c.id == post.category)?.label}/${post.id}~${post.title}`
  }


  const toggleLike = async (postId:string, userId:string) => {
    const isLiked = allLikes.some(l => l.post_id == postId && l.user_id == userId)
    
    const res = isLiked ? unLikePost(postId, userId) : likePost(postId, userId)
    return res

  }

  const likePost = async (postId:string, userId:string) => {
    const {data, success, message} = await createLike(userId, postId)
    console.log(message)
    if(success && data){
      setAllLikes((prev) => ([...prev, data]))
    }
    return success
  }

  const unLikePost = async (postId:string, userId:string) => {
    const {data, success, message} = await deleteLike(userId, postId)
    console.log(message)
    if(success && data){
      setAllLikes((prev) => {
        const filtered = prev.filter(like => like.id !== data.id)
        return filtered
      })
    }
    return success
  }

  return (
    <PostServiceContext.Provider
      value={{
        allLikes,
        toggleLike,
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
