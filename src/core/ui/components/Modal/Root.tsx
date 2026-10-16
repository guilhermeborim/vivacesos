import { Modal, ModalProps } from "reactstrap";

interface RootProps extends ModalProps {
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}
export function Root({
  isOpen = false,
  toggle,
  children,
  ...props
}: RootProps) {
  return (
    <Modal isOpen={isOpen} toggle={toggle} centered {...props}>
      {children}
    </Modal>
  );
}
