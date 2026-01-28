import { Modal, ModalBody, ModalProps } from "reactstrap";

interface ModalBaseProps extends ModalProps {
  children: React.ReactNode;
}

export function ModalBase({ children, ...props }: ModalBaseProps) {
  return (
    <Modal centered fade {...props}>
      <ModalBody>{children}</ModalBody>
    </Modal>
  );
}
