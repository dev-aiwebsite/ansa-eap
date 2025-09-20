"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const Page = () => {
  return (
    <Container>
      <div>
          <Button href="/admin/posts" variant="link">Posts</Button>   
          <Button href="/admin/featured-contents" variant="link">Featured Contents</Button>   
          <Button href="/admin/companies" variant="link">Companies</Button>   
      </div>
    </Container>
  );
};

export default Page;
