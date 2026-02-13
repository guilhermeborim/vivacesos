import { DropdownMenu } from "reactstrap";

interface MenuProps {
  children: React.ReactNode;
}

export function Menu({ children }: MenuProps) {
  return (
    <DropdownMenu end container="body">
      {children}
    </DropdownMenu>
  );
}
