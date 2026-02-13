import { TableList } from "core/ui/components/Table";
import { useQueryProfessionals } from "features/professional/api/mutations";
import { createProfessionalColumns } from "./columns";

export default function ListProfessional() {
  const { dataProfessionals } = useQueryProfessionals();

  const columns = createProfessionalColumns({
    onEdit: () => console.log("editou"),
    onDelete: () => console.log("excluiu"),
  });

  return (
    <>
      <TableList.Root columns={columns} data={dataProfessionals || []} />
    </>
  );
}
