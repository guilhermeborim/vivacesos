import { Card, Container } from "reactstrap";
import { BreadCrumb } from "../BreadCrumb/BreadCrumb";

interface RootLayoutProps {
  title: string;
  pageTitle: string;
  modals?: React.ReactElement;
  children: React.ReactNode;
}

export function RootLayout({
  children,
  modals,
  pageTitle,
  title,
}: RootLayoutProps) {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={title} pageTitle={pageTitle} />
          <Card>
            {children}
            {/* {header && header}
            <CardBody>{children}</CardBody>
            {footer && <CardFooter className="mt-3">{footer}</CardFooter>} */}
          </Card>
        </Container>
      </div>
      {modals}
    </>
  );
}
