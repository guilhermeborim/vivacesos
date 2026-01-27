import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

export const OptionsListClinic = () => {
  return (
    <UncontrolledDropdown className="dropdown">
      <DropdownToggle
        role="button"
        tag="button"
        className="btn btn-soft-info btn-sm dropdown"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="ri-more-fill align-middle"></i>
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end" container={"body"}>
        <li>
          <DropdownItem
            className="edit-item-btn"
            to="#editClinicModal"
            data-bs-toggle="modal"
          >
            <i className="mdi mdi-pencil-outline me-1" />
            Editar
          </DropdownItem>
        </li>
        <li>
          <DropdownItem
            className="remove-item-btn"
            to="#deleteClinicModal"
            data-bs-toggle="modal"
          >
            <i className="mdi mdi-delete-outline me-1" />
            Deletar
          </DropdownItem>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};
