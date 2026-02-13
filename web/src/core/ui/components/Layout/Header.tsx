import { CardHeader } from "reactstrap";

interface HeaderLayoutProps {
  children: React.ReactNode;
}

export function HeaderLayout({ children }: HeaderLayoutProps) {
  return (
    <CardHeader className="d-flex align-items-center">
      <div className="d-flex ms-auto gap-1">{children}</div>
    </CardHeader>
  );
}
