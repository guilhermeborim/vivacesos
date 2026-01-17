import React from "react";
import { Modal, ModalBody } from "reactstrap";

interface DeleteModalProps {
  show?: boolean;
  onDeleteClick?: () => void;
  onCloseClick?: () => void;
  recordId?: string;
  text: string;
  textButton: string;
  className?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  onDeleteClick,
  onCloseClick,
  text,
  textButton,
  className,
}) => {
  return (
    <Modal fade={true} isOpen={show} toggle={onCloseClick} centered={true}>
      <ModalBody className="py-3 px-5">
        <div className="mt-2 text-center">
          <i className="ri-delete-bin-line display-5 text-danger"></i>
          <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
            <h4>Atenção!</h4>
            <p className="text-muted mx-4 mb-0">{text}</p>
          </div>
        </div>
        <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
          <button
            type="button"
            className="btn w-sm btn-light material-shadow-none"
            data-bs-dismiss="modal"
            onClick={onCloseClick}
          >
            Cancelar
          </button>
          <button
            type="button"
            className={`btn w-sm material-shadow-none ${className}`}
            id="delete-record"
            onClick={onDeleteClick}
          >
            {textButton}
          </button>
        </div>
      </ModalBody>
    </Modal>
  ) as unknown as JSX.Element;
};

export default DeleteModal;
