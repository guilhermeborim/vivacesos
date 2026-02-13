import { CardFooter } from "reactstrap";

interface FooterLayoutProps {
  children: React.ReactElement;
}

export function FooterLayout({ children }: FooterLayoutProps) {
  return <CardFooter className="py-3">{children}</CardFooter>;
}
