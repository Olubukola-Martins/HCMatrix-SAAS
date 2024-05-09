import PageSubHeader from "components/layout/PageSubHeader";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const TravelRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for travel requisition`}
      />
      <TravelRequestPolicy />
    </div>
  );
};

const TravelRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <TravelRequestPolicyForm />
    </div>
  );
};

const TravelRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="travel" />;
};
