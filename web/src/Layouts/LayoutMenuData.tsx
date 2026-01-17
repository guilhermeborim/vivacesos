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
    // {
    //   id: "widgets",
    //   label: "Prontuários",
    //   icon: "ri-file-list-3-line",
    //   link: "/medical-record",
    //   click: function (e: any) {
    //     e.preventDefault();
    //     setIscurrentState("Widgets");
    //   },
    // },
    {
      id: "maps",
      label: "Prontuários Eletrônicos",
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
    // {
    //   id: "forms",
    //   label: "Pilates",
    //   icon: "ri-user-heart-line",
    //   link: "#",
    //   click: function (e: any) {
    //     e.preventDefault();
    //     setIsForms(!isForms);
    //     setIscurrentState("Forms");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isForms,
    //   subItems: [
    //     {
    //       id: "basicelements",
    //       label: "Turmas",
    //       link: "#",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "formselect",
    //       label: "Alunos",
    //       link: "#",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "checkboxsradios",
    //       label: "Visão das Aulas",
    //       link: "#",
    //       parentId: "forms",
    //     },
    //     {
    //       id: "inputmasks",
    //       label: "Relatório de Aulas",
    //       link: "#",
    //       parentId: "forms",
    //     },
    //   ],
    // },
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
          id: "chartjs",
          label: "Profissionais",
          link: "#",
          parentId: "charts",
        },
        { id: "echarts", label: "Clínica", link: "#", parentId: "charts" },
        { id: "echarts", label: "Permissões", link: "#", parentId: "charts" },
      ],
    },
    {
      label: "Conectar",
      isHeader: true,
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
    // {
    //   id: "maps",
    //   label: "Maps",
    //   icon: "ri-map-pin-line",
    //   link: "#",
    //   click: function (e: any) {
    //     e.preventDefault();
    //     setIsMaps(!isMaps);
    //     setIscurrentState("Maps");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMaps,
    //   subItems: [
    //     { id: "google", label: "Google", link: "#", parentId: "maps" },
    //   ],
    // },
    // {
    //   id: "multilevel",
    //   label: "Multi Level",
    //   icon: "ri-share-line",
    //   link: "#",
    //   click: function (e: any) {
    //     e.preventDefault();
    //     setIsMultiLevel(!isMultiLevel);
    //     setIscurrentState("MuliLevel");
    //     updateIconSidebar(e);
    //   },
    //   stateVariables: isMultiLevel,
    //   subItems: [
    //     {
    //       id: "level1.1",
    //       label: "Level 1.1",
    //       link: "#",
    //       parentId: "multilevel",
    //     },
    //     {
    //       id: "level1.2",
    //       label: "Level 1.2",
    //       link: "#",
    //       isChildItem: true,
    //       click: function (e: any) {
    //         e.preventDefault();
    //         setIsLevel1(!isLevel1);
    //       },
    //       stateVariables: isLevel1,
    //       childItems: [
    //         { id: 1, label: "Level 2.1", link: "#" },
    //         {
    //           id: "level2.2",
    //           label: "Level 2.2",
    //           link: "#",
    //           isChildItem: true,
    //           click: function (e: any) {
    //             e.preventDefault();
    //             setIsLevel2(!isLevel2);
    //           },
    //           stateVariables: isLevel2,
    //           childItems: [
    //             { id: 1, label: "Level 3.1", link: "#" },
    //             { id: 2, label: "Level 3.2", link: "#" },
    //           ],
    //         },
    //       ],
    //     },
    //   ],
    // },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
