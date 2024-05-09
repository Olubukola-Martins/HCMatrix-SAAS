import { PageIntro } from "components/layout/PageIntro";
import { appRoutes } from "config/router/paths";

const LeaveSettingsHeader = () => {
  return <PageIntro title="Leave Settings" link={appRoutes.leaveHome} />;
};

export default LeaveSettingsHeader;
