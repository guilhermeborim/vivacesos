import { ButtonPrimitive } from "core/ui";
import {
  useQueryClinic,
  useQueryClinicById,
} from "features/clinic/api/mutations";
import { useEditClinic } from "features/clinic/hooks/use-edit-clinic";
import { useState } from "react";
import { Modal, ModalBody, ModalFooter } from "reactstrap";
import { TableContainer } from "shared/components";
import FormClinic from "../form";
import { columnsListClinic } from "./columns";

export default function ListClinic() {
  const [editClinicId, setEditClinicId] = useState<string | null>(null);
  const { clinic } = useQueryClinicById(editClinicId);
  const { formUpdateClinic, onSubmitClinicUpdate } = useEditClinic(
    editClinicId || null,
  );
  const { dataClinics } = useQueryClinic();
  const [modalOpen, setModalOpen] = useState(false);

  function handleEdit(clinicId: string) {
    setModalOpen(true);
    setEditClinicId(clinicId);
  }

  function handleDelete(id: string) {
    console.log("Deletar clínica", id);
  }

  return (
    <>
      <TableContainer
        columns={columnsListClinic({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={dataClinics?.data || []}
        customPageSize={6}
        divClass="table-card mb-3"
        tableClass="table align-middle table-nowrap mb-0"
        theadClass="table-light"
      />
      <Modal
        centered
        isOpen={modalOpen}
        toggle={() => {
          setModalOpen(!modalOpen);
          setEditClinicId(null);
        }}
        size="xl"
      >
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
