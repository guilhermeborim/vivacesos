export type StatusCounts = { total: number; byStatus: Record<string, number> }

export type DashboardOverview = {
  month: string
  appointments: {
    today: StatusCounts
    month: StatusCounts & { absenceRate: number | null }
  }
  unpaid: { count: number; amount: number }
  patients: { total: number; newInMonth: number }
  revenue: { received: number; receivable: number }
  /** Só para quem tem acesso ao financeiro. */
  expenses?: { paid: number; pending: number }
  balance?: number
  /** Só para o papel PROFISSIONAL: o que ele vai receber de repasse. */
  payout?: {
    percent: number | null
    toLaunch: { count: number; grossAmount: number; amount: number | null }
    launchedPending: number
    receivedInMonth: number
  }
  pendingRecords: {
    appointmentId: string
    startsAt: string
    patientId: string
    patientName: string
  }[]
}

export type DashboardAnalytics = {
  month: string
  profitEstimate: number
  /** Repasses sobre a receita do mês que ainda não viraram despesa (já descontados do lucro). */
  payoutsToLaunch: number
  /** Variação % sobre o mês anterior; `null` quando não há base de comparação. */
  growth: { revenue: number | null; appointments: number | null; patients: number | null }
  monthlySeries: { month: string; revenue: number; expenses: number }[]
  cumulativeRevenue: {
    current: { day: number; total: number | null }[]
    previous: { day: number; total: number | null }[]
  }
  byProfessional: { professionalId: string; name: string | null; received: number; count: number }[]
  byPaymentMethod: { method: string | null; total: number; count: number }[]
}
