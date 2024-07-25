import { Form, Select } from "antd";
import React from "react";
import { FormTimeOffPolicyInput } from "../../settings/timeOffPolicy/components/FormTimeOffPolicyInput";

export const TimeOffApproval = () => {
  return (
    <div>
      <div className="flex items-center gap-4 mt-3">
        <Select options={[]} placeholder="Status" className="w-40 -mt-6" />
        <FormTimeOffPolicyInput Form={Form} control={{ label: "", name: "" }} />
      </div>
    </div>
  );
};
