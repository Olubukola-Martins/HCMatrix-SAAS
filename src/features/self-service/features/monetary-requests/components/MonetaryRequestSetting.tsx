import PageSubHeader from "components/layout/PageSubHeader";
import React, { useEffect } from "react";
import { useQueryClient } from "react-query";
import {
  QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING,
  useGetSingleRequisitionSetting,
} from "../../requisitions/hooks/setting/useGetSingleRequisitionSetting";
import { useCreateOrUpdateRequisitionSetting } from "../../requisitions/hooks/setting/useCreateOrUpdateRequisitionSetting";
import { Form, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { FormWorkflowInput } from "features/core/workflows/components/FormWorkflowInput";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";
import { RequisitionPolicyForm } from "../../requisitions/components/RequisitionSetting";

export const MonetaryRequestSetting = () => {
  return (
    <div className="flex flex-col gap-4">
      <PageSubHeader
        description={`You can now select the workflow approval for monetary requisition`}
      />
      <MonetaryRequestPolicy />
    </div>
  );
};

const MonetaryRequestPolicy = () => {
  return (
    <div className="mt-4 bg-card py-6 px-6 flex flex-col gap-4">
      <MonetaryRequestPolicyForm />
    </div>
  );
};

const MonetaryRequestPolicyForm = () => {
  return <RequisitionPolicyForm type="money" />;
};
