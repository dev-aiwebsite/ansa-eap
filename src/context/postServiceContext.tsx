"use client";
import { Post } from "@/components/post/postCard";
import { getBlogs } from "@/serverActions/crudBlogs";
import { getWebinars } from "@/serverActions/crudWebinars";
import { getYogas } from "@/serverActions/crudYogas";
import { getNews } from "@/serverActions/RssNewsWellBeing";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type PartialPost = Partial<Post>[];

type PostServiceContextType = {
  healthNewsPosts: PartialPost;
  setHealthNewsPosts: Dispatch<SetStateAction<PartialPost>>;
  videoContents: PartialPost;
  setVideoContents: Dispatch<SetStateAction<PartialPost>>;
  yogas: PartialPost;
  setYogas: Dispatch<SetStateAction<PartialPost>>;
  blogs: PartialPost;
  setBlogs: Dispatch<SetStateAction<PartialPost>>;
};

type AppServiceContextProviderProps = {
  children?: React.ReactNode;
  data?: PartialPost;
};

const PostServiceContext = createContext<PostServiceContextType | null>(null);

export function PostServiceProvider({ children, data }: AppServiceContextProviderProps) {
  const [healthNewsPosts, setHealthNewsPosts] = useState<PartialPost>(data ?? []);
  const [videoContents, setVideoContents] = useState<PartialPost>(data ?? []);
  const [yogas, setYogas] = useState<PartialPost>(data ?? []);
  const [blogs, setBlogs] = useState<PartialPost>(data ?? []);


  useEffect(()=> {

    if(!healthNewsPosts.length){
      getNews()
      .then(res => {
        setHealthNewsPosts(res)
      })
    }

    if(!videoContents.length){
      getWebinars()
      .then(r => {
        const data= r.data
        if(data){
          setVideoContents(data)
        }
      })
    }

    if(!yogas.length){
      getYogas()
      .then(r => {
        const data= r.data
        if(data){
          setYogas(data)
        }
      })
    }

    if(!blogs.length){
      getBlogs()
      .then(r => {
        const data= r.data
        if(data){
          setBlogs(data)
        }
      })
    }

  },[])

  return (
    <PostServiceContext.Provider
      value={{
        healthNewsPosts,
        setHealthNewsPosts,
        videoContents,
        setVideoContents,
        yogas,
        setYogas,
        blogs,
        setBlogs,
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
