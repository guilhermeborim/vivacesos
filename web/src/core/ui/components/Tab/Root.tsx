import { TabContent } from "reactstrap";

type RootProps = {
  children: React.ReactNode;
  activeTab: string | number;
};
export function Root({ activeTab, children }: RootProps) {
  return <TabContent activeTab={activeTab}>{children}</TabContent>;
}
