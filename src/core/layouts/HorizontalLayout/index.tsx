import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Collapse } from "reactstrap";
import { useAuth, useMyProfessional } from "@/shared/hooks";
import menuData, { MenuItem } from "../LayoutMenuData";

/** Todos os links do menu (inclusive os de grupos). */
const collectLinks = (items: MenuItem[]): string[] =>
  items.flatMap((item) => [
    ...(item.link ? [item.link] : []),
    ...collectLinks(item.children ?? []),
  ]);
const allLinks = collectLinks(menuData);

/** O link mais específico que casa com a rota: evita dois itens marcados (ex.: /medical-record e /medical-record/now). */
const findActiveLink = (pathname: string) =>
  allLinks
    .filter((link) => pathname === link || pathname.startsWith(`${link}/`))
    .sort((a, b) => b.length - a.length)[0];

const HorizontalLayout = () => {
  const location = useLocation();
  const activeLink = findActiveLink(location.pathname);
  const { hasPermission, session } = useAuth();
  const { isProfessional } = useMyProfessional();
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

  const isVisible = (item: MenuItem): boolean =>
    (!item.permission || hasPermission(item.permission)) &&
    (!item.requiresProfessional || isProfessional) &&
    !(session && item.hiddenForRoles?.includes(session.role)) &&
    (!item.children || item.children.some(isVisible));

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items
      .filter(isVisible)
      .map((item) => {
        if (item.isHeader) {
          return (
            <li key={item.id} className="menu-title">
              <span>{item.label}</span>
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
                <span>{item.label}</span>
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
              className={() =>
                `nav-link ${item.link && item.link === activeLink ? "active" : ""}`
              }
            >
              {item.icon && <i className={item.icon}></i>}
              <span>{item.label}</span>
            </NavLink>
          </li>
        );
      });
  };

  return <>{renderMenuItems(menuData)}</>;
};

export default HorizontalLayout;
