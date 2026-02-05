import { useQueryClinicById } from "features/clinic/api/mutations";
import { useEditClinic } from "features/clinic/hooks/use-edit-clinic";
import { useQueryProfessionals } from "features/professional/api/mutations";
import { useState } from "react";
import { TableContainer } from "shared/components";
import { columnsListProfessional } from "./columns";

export default function ListProfessional() {
  const [editProfessionalId, setEditProfessionalId] = useState<string | null>(
    null,
  );
  const { clinic } = useQueryClinicById(editProfessionalId);
  const { formUpdateClinic, onSubmitClinicUpdate } = useEditClinic(
    editProfessionalId || null,
  );
  const { dataProfessionals } = useQueryProfessionals();
  const [modalOpen, setModalOpen] = useState(false);

  function handleEdit(professionalId: string) {
    setModalOpen(true);
    setEditProfessionalId(professionalId);
  }

  function handleDelete(id: string) {
    console.log("Deletar clínica", id);
  }

  return (
    <>
      <TableContainer
        columns={columnsListProfessional({
          onEdit: handleEdit,
          onDelete: handleDelete,
        })}
        data={dataProfessionals?.data || []}
        customPageSize={6}
        divClass="table-card mb-3"
        tableClass="table align-middle table-nowrap mb-0"
        theadClass="table-light"
      />
      {/* <Modal
        centered
        isOpen={modalOpen}
        toggle={() => {
          setModalOpen(!modalOpen);
          setEditProfessionalId(null);
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
      </Modal> */}
    </>
  );
}
