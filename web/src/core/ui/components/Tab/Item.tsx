import { TabPane } from "reactstrap";

type ItemProps = {
  children: React.ReactNode;
  tabId: number;
};

export function Item({ children, tabId }: ItemProps) {
  return <TabPane tabId={tabId}>{children}</TabPane>;
}
