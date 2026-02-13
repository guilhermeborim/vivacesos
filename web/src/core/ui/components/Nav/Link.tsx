import classnames from "classnames";
import { NavLink } from "reactstrap";

type LinkProps = {
  text: string;
  activeTab: number;
  tab: number;
  maxTabs: number;
};

export function Link({ text, activeTab, maxTabs, tab }: LinkProps) {
  return (
    <NavLink
      id="pills-gen-info-tab"
      className={classnames(
        {
          active: activeTab === tab,
          done: activeTab <= maxTabs && activeTab >= tab,
        },
        "rounded-pill",
      )}
      tag="button"
      type="button"
    >
      {text}
    </NavLink>
  );
}
