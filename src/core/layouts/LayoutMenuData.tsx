export type MenuItem = {
  id: string;
  label: string;
  icon?: string;
  link?: string;
  isHeader?: boolean;
  children?: MenuItem[];
  /** Item visível só para quem tem a permissão. */
  permission?: string;
  /** Item visível só para quem tem perfil de profissional ativo (inclui o ADMIN que atende). */
  requiresProfessional?: boolean;
  /** Item escondido para estes papéis (ex.: PROFISSIONAL não acessa Administração). */
  hiddenForRoles?: string[];
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
      { id: "patient", label: "Pacientes", link: "/patients" },
      { id: "agenda", label: "Agendas", link: "/schedule" },
    ],
  },

  {
    id: "medical_record",
    label: "Atendimento",
    icon: "ri-stethoscope-line",
    permission: "RECORD_VIEW",
    children: [
      {
        id: "waiting-room",
        label: "Sala de Espera",
        link: "/medical-record/now",
        requiresProfessional: true,
      },
      {
        id: "medical-record",
        label: "Todos os Prontuários",
        link: "/medical-record",
        requiresProfessional: true,
      },
    ],
  },

  {
    id: "finances",
    label: "Financeiro",
    icon: "ri-wallet-3-line",
    children: [
      { id: "receitas", label: "Receitas", link: "/receitas" },
      {
        id: "despesas",
        label: "Despesas",
        link: "/despesas",
        permission: "FINANCE_VIEW",
      },
      { id: "relatorios", label: "Relatórios", link: "/relatorio" },
    ],
  },

  {
    id: "administration",
    label: "Administração",
    icon: "ri-lock-2-line",
    hiddenForRoles: ["PROFISSIONAL"],
    children: [
      { id: "users", label: "Acessos", link: "/users" },
      {
        id: "professionals",
        label: "Profissionais da Saúde",
        link: "/professionals",
      },
      { id: "clinics", label: "Clínica", link: "/clinics" },
      {
        id: "medical-record-audit",
        label: "Auditoria",
        link: "/medical-record/audit",
        permission: "AUDIT_VIEW",
      },
    ],
  },

  {
    id: "integrations",
    label: "Integrações",
    icon: "ri-compasses-2-line",
    permission: "INTEGRATIONS_MANAGE",
    children: [
      { id: "whatsapp", label: "WhatsApp", link: "/whatsapp" },
      { id: "google", label: "Google", link: "/google" },
    ],
  },

  {
    id: "settings",
    label: "Configurações",
    icon: "ri-settings-3-line",
    children: [
      { id: "settings-general", label: "Geral", link: "/settings" },
      {
        id: "my-schedule",
        label: "Minha agenda",
        link: "/settings/my-schedule",
        requiresProfessional: true,
      },
      {
        id: "record-templates",
        label: "Modelos de Ficha",
        link: "/settings/record-templates",
        permission: "RECORD_WRITE",
        requiresProfessional: true,
      },
    ],
  },
];

export default menuData;
