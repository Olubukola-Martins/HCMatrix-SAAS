import PageSubHeader from "components/layout/PageSubHeader";
import { Tabs } from "antd";
import MyOnboarding from "./MyOnboarding";
import ManageOnboarding from "./ManageOnboarding";

export const OnboardingContainer = () => {
  const tabItems = [
    // TODO: When implementing role-permission resrictor remember to exempt isAdmin(isOwner) from my onboarding as its not applicable to the owner, initial purchaser of app
    {
      key: "My Onboarding",
      label: "My Onboarding",
      children: <MyOnboarding />,
    },
    {
      key: "Manage Onboarding",
      label: "Manage Onboarding",
      children: <ManageOnboarding />,
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <PageSubHeader
        description={`Access and manage onboarding within your organization`}
      />
      <Tabs items={tabItems} />
    </div>
  );
};
