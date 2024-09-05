import React from "react";
import { boxStyle, boxTitle } from "styles/reused";
import { Form, Radio } from "antd";
import { generalValidationRules } from "utils/formHelpers/validation";
import AppTooltip from "components/tooltip/AppTooltip";

const PaymentDisbursementConfiguration: React.FC<{
  Form: typeof Form;
}> = ({ Form }) => {
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Payment Disbursement</h5>
      </div>
      <AppTooltip
        children={
          <p className="text-sm">
            Will you use the application to disburse payments?
          </p>
        }
        tooltipProps={{
          title: `Checking "Yes" allows you to configure compliance settings, enabling the use use of this application for disbursing payments.Please ensure you upload all required documents and information for verification and approval in the payroll compliance setting.`,
        }}
      />

      <div>
        <div className="flex flex-col gap-4 mt-5">
          <Form.Item name="disbursePayments" rules={generalValidationRules}>
            <Radio.Group defaultValue={false}>
              <Radio.Button value={true}>Yes</Radio.Button>
              <Radio.Button value={false}>No</Radio.Button>
            </Radio.Group>
          </Form.Item>
        </div>
      </div>
    </div>
  );
};

export default PaymentDisbursementConfiguration;
