import { TableList } from "@/core/ui/components/Table";
import { useQueryPatients } from "../../api/mutations";
import { createPatientColumns } from "./columns";

export function ListPatient() {
  const { dataPatients } = useQueryPatients();

  const columns = createPatientColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  });

  return (
    <>
      <TableList.Root columns={columns} data={dataPatients || []} />
    </>
  );
}
