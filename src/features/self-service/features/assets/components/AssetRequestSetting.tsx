import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const AssetRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <AssetRequestPolicy />
    </div>
  );
};

const AssetRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <AssetRequestPolicyForm />
    </div>
  );
};

const AssetRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="asset" />;
};
