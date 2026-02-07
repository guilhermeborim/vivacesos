import { Modal, ModalBody, ModalFooter, ModalProps } from "reactstrap";

interface ModalBaseProps extends ModalProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ModalBase({ children, footer, ...props }: ModalBaseProps) {
  return (
    <Modal centered fade {...props}>
      <ModalBody>{children}</ModalBody>
      {footer && (
        <ModalFooter className="border border-top mt-3">{footer}</ModalFooter>
      )}
    </Modal>
  );
}
