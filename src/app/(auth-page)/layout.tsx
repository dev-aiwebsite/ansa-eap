import { Suspense } from "react";
import Container from "../../components/ui/container";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Container>
        <Suspense fallback={<p>Loading...</p>}>
          {children}
        </Suspense>
        </Container>
    </div>
  );
}
