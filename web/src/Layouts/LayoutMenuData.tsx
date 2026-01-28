import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navdata = () => {
  const history = useNavigate();
  //state data
  const [isDashboard, setIsDashboard] = useState<boolean>(false);
  const [isApps, setIsApps] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isPages, setIsPages] = useState<boolean>(false);
  const [isBaseUi, setIsBaseUi] = useState<boolean>(false);
  const [isAdvanceUi, setIsAdvanceUi] = useState<boolean>(false);
  const [isForms, setIsForms] = useState<boolean>(false);
  const [isTables, setIsTables] = useState<boolean>(false);
  const [isCharts, setIsCharts] = useState<boolean>(false);
  const [isIcons, setIsIcons] = useState<boolean>(false);
  const [isMaps, setIsMaps] = useState<boolean>(false);
  const [isMultiLevel, setIsMultiLevel] = useState<boolean>(false);

  const [iscurrentState, setIscurrentState] = useState("Register");

  function updateIconSidebar(e: any) {
    if (e && e.target && e.target.getAttribute("sub-items")) {
      const ul: any = document.getElementById("two-column-menu");
      const iconItems: any = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("sub-items");
        const getID = document.getElementById(id) as HTMLElement;
        if (getID) getID.classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Register") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Apps") {
      setIsApps(false);
    }
    if (iscurrentState !== "Auth") {
      setIsAuth(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "BaseUi") {
      setIsBaseUi(false);
    }
    if (iscurrentState !== "AdvanceUi") {
      setIsAdvanceUi(false);
    }
    if (iscurrentState !== "Forms") {
      setIsForms(false);
    }
    if (iscurrentState !== "Tables") {
      setIsTables(false);
    }
    if (iscurrentState !== "Charts") {
      setIsCharts(false);
    }
    if (iscurrentState !== "Icons") {
      setIsIcons(false);
    }
    if (iscurrentState !== "Maps") {
      setIsMaps(false);
    }
    if (iscurrentState !== "MuliLevel") {
      setIsMultiLevel(false);
    }
    if (iscurrentState === "Widgets") {
      history("/widgets");
      document.body.classList.add("twocolumn-panel");
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isApps,
    isAuth,
    isPages,
    isBaseUi,
    isAdvanceUi,
    isForms,
    isTables,
    isCharts,
    isIcons,
    isMaps,
    isMultiLevel,
  ]);

  const menuItems: any = [
    {
      label: "Menu",
      isHeader: true,
    },
    {
      id: "register",
      label: "Recepção",
      icon: "ri-contacts-book-line",
      link: "#",
      stateVariables: isDashboard,
      click: function (e: any) {
        e.preventDefault();
        setIsDashboard(!isDashboard);
        setIscurrentState("Register");
        updateIconSidebar(e);
      },
      subItems: [
        {
          id: "patient",
          label: "Pacientes",
          link: "/patient",
          parentId: "register",
        },
        {
          id: "appointment",
          label: "Consultas",
          link: "/appointment",
          parentId: "register",
        },
      ],
    },
    {
      id: "maps",
      label: "Prontuários",
      icon: "ri-file-list-3-line",
      link: "#",
      click: function (e: any) {
        e.preventDefault();
        setIsMaps(!isMaps);
        setIscurrentState("Maps");
        updateIconSidebar(e);
      },
      stateVariables: isMaps,
      subItems: [
        {
          id: "medical-record",
          label: "Todos os Prontuários",
          link: "/medical-record",
          parentId: "maps",
        },
        {
          id: "medical-record-today",
          label: "Prontuários do Dia",
          link: "/medical-record/now",
          parentId: "maps",
        },
      ],
    },
    {
      id: "tables",
      label: "Financeiro",
      icon: "ri-wallet-3-line",
      link: "#",
      click: function (e: any) {
        e.preventDefault();
        setIsTables(!isTables);
        setIscurrentState("Tables");
        updateIconSidebar(e);
      },
      stateVariables: isTables,
      subItems: [
        {
          id: "basictables",
          label: "Receitas",
          link: "#",
          parentId: "tables",
        },
        { id: "listjs", label: "Despesas", link: "#", parentId: "tables" },
        {
          id: "reactdatatables",
          label: "Relatórios",
          link: "#",
          parentId: "tables",
        },
      ],
    },
    {
      id: "charts",
      label: "Administração",
      icon: "ri-lock-2-line",
      link: "#",
      click: function (e: any) {
        e.preventDefault();
        setIsCharts(!isCharts);
        setIscurrentState("Charts");
        updateIconSidebar(e);
      },
      stateVariables: isCharts,
      subItems: [
        {
          id: "basicelements",
          label: "Acessos",
          link: "#",
          parentId: "charts",
        },
        {
          id: "formselect",
          label: "Profissionais de Saúde",
          link: "#",
          parentId: "charts",
        },
        {
          id: "echarts",
          label: "Clínica",
          link: "/clinics",
          parentId: "charts",
        },
      ],
    },
    {
      id: "icons",
      label: "Integrações",
      icon: "ri-compasses-2-line",
      link: "#",
      click: function (e: any) {
        e.preventDefault();
        setIsIcons(!isIcons);
        setIscurrentState("Icons");
        updateIconSidebar(e);
      },
      stateVariables: isIcons,
      subItems: [
        { id: "remix", label: "WhatsApp", link: "#", parentId: "icons" },
        { id: "boxicons", label: "Google", link: "#", parentId: "icons" },
      ],
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
