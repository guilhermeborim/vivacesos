import { ButtonPrimitive, ModalComponent } from "core/ui";
import { TableList } from "core/ui/components/Table";
import {
  useQueryClinic,
  useQueryClinicById,
} from "features/clinic/api/mutations";
import { useEditClinic } from "features/clinic/hooks/use-edit-clinic";
import FormClinic from "../form";
import { createClinicColumns } from "./columns";

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

  const columns = createClinicColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  });

  return (
    <>
      <TableList.Root columns={columns} data={dataClinics || []} />

      <ModalComponent.Root isOpen={modalOpen} toggle={toggleModal} size="xl">
        <ModalComponent.Body>
          <h5>Atualize os dados da clínica</h5>
          <div className="p-4">
            <FormClinic formClinic={formUpdateClinic} defaultValues={clinic} />
          </div>
        </ModalComponent.Body>
        <ModalComponent.Footer>
          <form onSubmit={formUpdateClinic.handleSubmit(onSubmitClinicUpdate)}>
            <ButtonPrimitive variant="success">Atualizar</ButtonPrimitive>
          </form>
        </ModalComponent.Footer>
      </ModalComponent.Root>
    </>
  );
}
