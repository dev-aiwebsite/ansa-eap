import Container from "../../components/ui/container";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen">
      <Container>{children}</Container>
    </div>
  );
}
