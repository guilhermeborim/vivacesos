import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import Search from "./Search";

interface HeaderlistProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  href: string;
}

const HeaderList = ({ search, setSearch, href }: HeaderlistProps) => {
  return (
    <div className={"d-flex align-items-center justify-content-between"}>
      <Search
        searchTerm={search}
        onSearchChange={(value) => setSearch(value)}
      />
      <div className="d-flex gap-2 justify-content-between">
        <Button color="secondary">Dashboard</Button>
        <Button color="primary">Exportar</Button>
        <Link to={href}>
          <Button color="success">Cadastrar</Button>
        </Link>
      </div>
    </div>
  );
};

export default HeaderList;
