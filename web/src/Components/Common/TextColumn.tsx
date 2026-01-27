export const textColumn = (header: string, accessorKey: string) => {
  return {
    header: header,
    accessorKey: accessorKey,
    enableColumnFilter: false,
    cell: (cell: any) => {
      return <span>{cell.getValue()}</span>;
    },
  };
};
