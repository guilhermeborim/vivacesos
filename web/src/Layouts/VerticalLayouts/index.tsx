import { useCallback, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "reactstrap";
import { createSelector } from "reselect";
import menuData, { MenuItem } from "../LayoutMenuData";

type Props = {
  t: (key: string) => string;
};

const VerticalLayout = ({ t }: Props) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  /*
  ========================
  REDUX LAYOUT SETTINGS
  ========================
  */

  const selectLayoutState = (state: any) => state.Layout;

  const selectLayoutProperties = createSelector(
    selectLayoutState,
    (layout) => ({
      leftsidbarSizeType: layout.leftsidbarSizeType,
      sidebarVisibilitytype: layout.sidebarVisibilitytype,
      layoutType: layout.layoutType,
    }),
  );

  const { leftsidbarSizeType, sidebarVisibilitytype, layoutType } = useSelector(
    selectLayoutProperties,
  );

  /*
  ========================
  RESPONSIVE SIDEBAR
  ========================
  */

  const resizeSidebarMenu = useCallback(() => {
    const windowSize = document.documentElement.clientWidth;
    const hamburgerIcon = document.querySelector(".hamburger-icon");

    if (windowSize >= 1025) {
      document.documentElement.setAttribute(
        "data-sidebar-size",
        leftsidbarSizeType,
      );

      if (
        (sidebarVisibilitytype === "show" ||
          layoutType === "vertical" ||
          layoutType === "twocolumn") &&
        hamburgerIcon
      ) {
        hamburgerIcon.classList.remove("open");
      } else if (hamburgerIcon) {
        hamburgerIcon.classList.add("open");
      }
    } else if (windowSize < 1025 && windowSize > 767) {
      document.body.classList.remove("twocolumn-panel");
      document.documentElement.setAttribute("data-sidebar-size", "sm");
      hamburgerIcon?.classList.add("open");
    } else {
      document.body.classList.remove("vertical-sidebar-enable");
      document.documentElement.setAttribute("data-sidebar-size", "lg");
      hamburgerIcon?.classList.add("open");
    }
  }, [leftsidbarSizeType, sidebarVisibilitytype, layoutType]);

  useEffect(() => {
    resizeSidebarMenu();
    window.addEventListener("resize", resizeSidebarMenu);
    return () => window.removeEventListener("resize", resizeSidebarMenu);
  }, [resizeSidebarMenu]);

  /*
  ========================
  MENU STATE
  ========================
  */

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  /*
  ========================
  RENDER MENU RECURSIVO
  ========================
  */

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map((item) => {
      if (item.isHeader) {
        return (
          <li key={item.id} className="menu-title">
            <span>{t(item.label)}</span>
          </li>
        );
      }

      const hasChildren = item.children && item.children.length > 0;
      const isOpen = openMenus[item.id];

      if (hasChildren) {
        return (
          <li key={item.id} className="nav-item">
            <a
              href="/#"
              onClick={(e) => {
                e.preventDefault();
                toggleMenu(item.id);
              }}
              className={`nav-link menu-link ${isOpen ? "active" : ""}`}
            >
              {item.icon && <i className={item.icon}></i>}
              <span>{t(item.label)}</span>
            </a>

            <Collapse isOpen={isOpen} className="menu-dropdown">
              <ul className="nav nav-sm flex-column">
                {renderMenuItems(item.children!, level + 1)}
              </ul>
            </Collapse>
          </li>
        );
      }

      return (
        <li key={item.id} className="nav-item">
          <NavLink
            to={item.link || "/#"}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {item.icon && <i className={item.icon}></i>}
            <span>{t(item.label)}</span>
          </NavLink>
        </li>
      );
    });
  };

  /*
  ========================
  SCROLL TOP ON ROUTE CHANGE
  ========================
  */

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return <>{renderMenuItems(menuData)}</>;
};

export default withTranslation()(VerticalLayout);
