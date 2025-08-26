import { PostServiceProvider } from "@/context/postServiceContext";

export default async function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    return (
        <PostServiceProvider>
            {children}
        </PostServiceProvider>
    );
}