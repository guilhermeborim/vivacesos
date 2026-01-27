import { useAuth } from "context/auth/hooks/use-auth";
import ModalSelectClinic from "context/dashboard/components/modal_select_clinic";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";

//import images
const ProfileDropdown = () => {
  const { signOut, session } = useAuth();
  const [openSelectClinic, setOpenSelectClinic] = useState(false);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className="ms-sm-3 header-item topbar-user"
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {session?.user.name}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {session?.activeClinic
                  ? `${session.activeClinic.name} - ${session.role}`
                  : "Nenhuma clínica ativa"}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Bem Vindo!</h6>
          {session && session?.clinics.length > 1 && (
            <DropdownItem className="p-0">
              <button
                className="dropdown-item"
                onClick={() => setOpenSelectClinic(true)}
              >
                <i className="mdi mdi-swap-horizontal text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle">Mudar Clínica</span>
              </button>
            </DropdownItem>
          )}
          <div className="dropdown-divider"></div>
          <DropdownItem className="p-0">
            <Link to="#" className="dropdown-item" onClick={signOut}>
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Desconectar
              </span>
            </Link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {session && session?.clinics.length > 1 && (
        <ModalSelectClinic
          clinics={session.clinics}
          isOpen={openSelectClinic}
          onClose={() => setOpenSelectClinic(false)}
        />
      )}
    </React.Fragment>
  );
};

export default ProfileDropdown;
