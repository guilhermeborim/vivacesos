import { CardBody } from "reactstrap";

interface BodyLayoutProps {
  children: React.ReactElement;
}

export function BodyLayout({ children }: BodyLayoutProps) {
  return <CardBody>{children}</CardBody>;
}
