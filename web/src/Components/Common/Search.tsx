import React from "react";
import { Input } from "reactstrap";

interface SearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({ searchTerm, onSearchChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  return (
    <form className="app-search d-none d-md-block">
      <div className="position-relative">
        <Input
          type="text"
          className="form-control"
          placeholder="Pesquisar..."
          id="search-options"
          value={searchTerm}
          onChange={handleChange}
        />
        <span className="mdi mdi-magnify search-widget-icon"></span>
        <span
          className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
          id="search-close-options"
        ></span>
      </div>
    </form>
  );
};

export default Search;
