import { CardHeader } from "reactstrap";

interface HeaderListProps {
  actions: React.ReactNode;
}

export function HeaderList({ actions }: HeaderListProps) {
  return (
    <CardHeader className="d-flex align-items-center">
      <div className="d-flex ms-auto gap-1">{actions}</div>
    </CardHeader>
  );
}
