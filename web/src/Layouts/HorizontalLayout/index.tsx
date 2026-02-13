import { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "reactstrap";
import menuData, { MenuItem } from "../LayoutMenuData";

type Props = {
  t: (key: string) => string;
};

const HorizontalLayout = ({ t }: Props) => {
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  return <>{renderMenuItems(menuData)}</>;
};

export default withTranslation()(HorizontalLayout);
