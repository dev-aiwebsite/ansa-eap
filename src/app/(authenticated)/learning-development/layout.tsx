import LayoutWithBreadcrumb, {
  LayoutWithChildrenProps,
} from "@/components/layouts/layoutWIthBreadCrumb";
import Container from "@/components/ui/container";
import { UserActivityProvider } from "@/context/userActivitiesContext";

const Layout = ({ children }: LayoutWithChildrenProps) => {
  return (
    <Container>
    <UserActivityProvider>
      <LayoutWithBreadcrumb>{children}</LayoutWithBreadcrumb>
    </UserActivityProvider>
    </Container>
  );
};

export default Layout;
