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
          <Button href="/admin/services" variant="link">Services</Button>   
          <Button href="/admin/practitioners" variant="link">Practitioners</Button>   
      </div>
    </Container>
  );
};

export default Page;
