import { Card, CardBody, CardFooter, Container } from "reactstrap";
import { BreadCrumb } from "./BreadCrumb";

interface BasePageProps {
  title: string;
  pageTitle: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  modals?: React.ReactNode;
}

export function BasePage({
  title,
  pageTitle,
  header,
  children,
  footer,
  modals,
}: BasePageProps) {
  return (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={title} pageTitle={pageTitle} />
          <Card>
            {header && header}
            <CardBody>{children}</CardBody>
            {footer && <CardFooter className="mt-3">{footer}</CardFooter>}
          </Card>
        </Container>
      </div>
      {modals && modals}
    </>
  );
}
