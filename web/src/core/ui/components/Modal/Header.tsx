import { ModalHeader } from "reactstrap";

interface HeaderProps {
  children: React.ReactNode;
}
export function Header({ children }: HeaderProps) {
  return <ModalHeader>{children}</ModalHeader>;
}
