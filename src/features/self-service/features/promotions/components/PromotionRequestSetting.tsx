import PageSubHeader from "components/layout/PageSubHeader";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const PromotionRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for promotion requisition`}
      />
      <PromotionRequestPolicy />
    </div>
  );
};

const PromotionRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <PromotionRequestPolicyForm />
    </div>
  );
};

const PromotionRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="promotion" />;
};
