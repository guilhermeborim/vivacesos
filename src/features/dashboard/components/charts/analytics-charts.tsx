import { DashboardAnalytics } from "@/shared/types"
import { Col, Row } from "reactstrap"
import { CumulativeRevenueChart } from "./cumulative-revenue-chart"
import { PaymentMethodsChart } from "./payment-methods-chart"
import { ProfessionalRevenueChart } from "./professional-revenue-chart"
import { RevenueExpensesChart } from "./revenue-expenses-chart"

/** Gráficos da clínica (somente ADMIN). */
export function AnalyticsCharts({ analytics }: { analytics: DashboardAnalytics }) {
  return (
    <Row className="g-3 mb-3">
      <Col xl={7}>
        <RevenueExpensesChart series={analytics.monthlySeries} />
      </Col>
      <Col xl={5}>
        <CumulativeRevenueChart month={analytics.month} cumulative={analytics.cumulativeRevenue} />
      </Col>
      <Col xl={7}>
        <ProfessionalRevenueChart data={analytics.byProfessional} />
      </Col>
      <Col xl={5}>
        <PaymentMethodsChart data={analytics.byPaymentMethod} />
      </Col>
    </Row>
  )
}
