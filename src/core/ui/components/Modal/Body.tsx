import { ModalBody } from "reactstrap";

interface BodyProps {
  children: React.ReactNode;
}
export function Body({ children }: BodyProps) {
  return <ModalBody>{children}</ModalBody>;
}
