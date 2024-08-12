import PageSubHeader from "components/layout/PageSubHeader";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const ProfileEditRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for profile edit requisition`}
      />
      <ProfileEditRequestPolicy />
    </div>
  );
};

const ProfileEditRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <ProfileEditRequestPolicyForm />
    </div>
  );
};

const ProfileEditRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="promotion" />;
};
