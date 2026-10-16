import { ModalFooter } from "reactstrap";

interface FooterProps {
  children: React.ReactNode;
}
export function Footer({ children }: FooterProps) {
  return (
    <ModalFooter className="border border-top py-3">{children}</ModalFooter>
  );
}
