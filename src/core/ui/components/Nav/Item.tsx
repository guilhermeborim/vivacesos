import { NavItem } from "reactstrap";

type ItemProps = {
  children: React.ReactElement;
};

export function Item({ children }: ItemProps) {
  return <NavItem>{children}</NavItem>;
}
