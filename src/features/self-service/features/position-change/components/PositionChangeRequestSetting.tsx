import PageSubHeader from "components/layout/PageSubHeader";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const PositionChangeRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for position change requisition`}
      />
      <PositionChangeRequestPolicy />
    </div>
  );
};

const PositionChangeRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <PositionChangeRequestPolicyForm />
    </div>
  );
};

const PositionChangeRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="position-change" />;
};
