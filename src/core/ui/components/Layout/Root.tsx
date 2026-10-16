import { Card, Container } from "reactstrap";
import { BreadCrumb } from "../BreadCrumb/BreadCrumb";
import { TableProvider } from "../Table/TableContext";

interface RootLayoutProps {
  title: string;
  pageTitle: string;
  modals?: React.ReactElement;
  children: React.ReactNode;
  tableProvider?: boolean;
}

export function RootLayout({
  children,
  modals,
  pageTitle,
  title,
  tableProvider = true,
}: RootLayoutProps) {
  const content = (
    <>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title={title} pageTitle={pageTitle} />
          <Card>{children}</Card>
        </Container>
      </div>
      {modals}
    </>
  );

  return tableProvider ? <TableProvider>{content}</TableProvider> : content;
}
