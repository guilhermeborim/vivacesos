export type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  link?: string;
  isHeader?: boolean;
  children?: MenuItem[];
};

const menuData: MenuItem[] = [
  {
    id: "menu",
    label: "Menu",
    isHeader: true,
  },

  {
    id: "reception",
    label: "Recepção",
    icon: "ri-contacts-book-line",
    children: [
      { id: "patient", label: "Pacientes", link: "/patient" },
      { id: "appointment", label: "Consultas", link: "/appointment" },
    ],
  },

  {
    id: "medical_record",
    label: "Prontuários",
    icon: "ri-file-list-3-line",
    children: [
      {
        id: "medical-record",
        label: "Todos os Prontuários",
        link: "/medical-record",
      },
      {
        id: "medical-record-today",
        label: "Prontuários do Dia",
        link: "/medical-record/now",
      },
    ],
  },

  {
    id: "finances",
    label: "Financeiro",
    icon: "ri-wallet-3-line",
    children: [
      { id: "receitas", label: "Receitas", link: "/receitas" },
      { id: "despesas", label: "Despesas", link: "/despesas" },
      { id: "relatorios", label: "Relatórios", link: "/relatorio" },
    ],
  },

  {
    id: "administration",
    label: "Administração",
    icon: "ri-lock-2-line",
    children: [
      { id: "users", label: "Acessos", link: "/users" },
      {
        id: "professionals",
        label: "Profissionais da Saúde",
        link: "/professionals",
      },
      { id: "clinics", label: "Clínica", link: "/clinics" },
    ],
  },

  {
    id: "integrations",
    label: "Integrações",
    icon: "ri-compasses-2-line",
    children: [
      { id: "whatsapp", label: "WhatsApp", link: "/whatsapp" },
      { id: "google", label: "Google", link: "/google" },
    ],
  },
];

export default menuData;
