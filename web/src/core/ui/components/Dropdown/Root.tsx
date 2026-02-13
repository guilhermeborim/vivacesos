import { UncontrolledDropdown } from "reactstrap";

interface RootProps {
  children: React.ReactNode;
}

export function Root({ children }: RootProps) {
  return <UncontrolledDropdown>{children}</UncontrolledDropdown>;
}
