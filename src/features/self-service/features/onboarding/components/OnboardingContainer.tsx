import PageSubHeader from "components/layout/PageSubHeader";
import { Tabs } from "antd";
import MyOnboarding from "./MyOnboarding";
import ManageOnboarding from "./ManageOnboarding";
import { useApiAuth } from "hooks/useApiAuth";

export const OnboardingContainer = () => {
  const { authUserData } = useApiAuth();
  const tabItems = [
    {
      key: "My Onboarding",
      label: "My Onboarding",
      children: <MyOnboarding />,
      hidden: authUserData.isOwner === true, //hides onboarding if employee isOwner
    },
    {
      key: "Manage Onboarding",
      label: "Manage Onboarding",
      children: <ManageOnboarding />,
      hidden: false, //TODO: Add Permission
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      <PageSubHeader
        description={`Access and manage onboarding within your organization`}
      />
      <Tabs items={tabItems.filter((item) => item.hidden === false)} />
    </div>
  );
};
