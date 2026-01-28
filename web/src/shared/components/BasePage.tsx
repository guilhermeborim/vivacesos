import { Card, CardBody, Container } from "reactstrap";
import { BreadCrumb } from "./BreadCrumb";

interface BasePageProps {
  title: string;
  pageTitle: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  modals?: React.ReactNode;
}

export function BasePage({
  title,
  pageTitle,
  header,
  children,
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
          </Card>
        </Container>
      </div>
      {modals && modals}
    </>
  );
}
