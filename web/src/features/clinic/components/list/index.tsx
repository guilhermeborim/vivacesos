import { ButtonPrimitive } from "core/ui";
import {
  useQueryClinic,
  useQueryClinicById,
} from "features/clinic/api/mutations";
import { useEditClinic } from "features/clinic/hooks/use-edit-clinic";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { TableContainer } from "shared/components";
import FormClinic from "../form";
import { columnsListClinic } from "./columns";

export default function ListClinic() {
  const {
    formUpdateClinic,
    onSubmitClinicUpdate,
    handleDelete,
    handleEdit,
    modalOpen,
    toggleModal,
    editClinicId,
  } = useEditClinic();
  const { clinic } = useQueryClinicById(editClinicId);
  const { dataClinics } = useQueryClinic();

  return (
    <>
      <TableContainer
        columns={columnsListClinic({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={dataClinics || []}
        customPageSize={6}
        divClass="table-card mb-3"
        tableClass="table align-middle table-nowrap mb-0"
        theadClass="table-light"
      />
      <Modal centered isOpen={modalOpen} toggle={toggleModal} size="xl">
        <ModalBody>
          <h5>Atualize os dados da clínica</h5>
          <div className="p-4">
            <FormClinic formClinic={formUpdateClinic} defaultValues={clinic} />
          </div>
        </ModalBody>
        <ModalFooter className="border-top">
          <form
            className="mt-3"
            onSubmit={formUpdateClinic.handleSubmit(onSubmitClinicUpdate)}
          >
            <ButtonPrimitive variant="success">Atualizar</ButtonPrimitive>
          </form>
        </ModalFooter>
      </Modal>
    </>
  );
}
