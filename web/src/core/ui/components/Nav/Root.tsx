import { AriaRole } from "react";
import { Nav } from "reactstrap";

type RootProps = {
  role?: AriaRole;
  children: React.ReactNode;
};

export function Root({ children, role = "tablist" }: RootProps) {
  return (
    <Nav className="nav-pills progress-bar-tab custom-nav" role={role}>
      {children}
    </Nav>
  );
}
