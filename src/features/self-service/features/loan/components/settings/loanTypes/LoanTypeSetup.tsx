import { Form, Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle, inputStyle } from "styles/reused";
import { textInputValidationRules } from "utils/formHelpers/validation";
import LoanTypeTable from "./LoanTypeTable";
import {
  QUERY_KEY_FOR_LOAN_TYPES,
  useGetLoanTypes,
} from "../../../hooks/type/useGetLoanTypes";
import { useQueryClient } from "react-query";
import { useAddLoanType } from "../../../hooks/type/useAddLoanType";
import { LoadingOutlined } from "@ant-design/icons";
import { openNotification } from "utils/notifications";
import { usePagination } from "hooks/usePagination";

const LoanTypeSetup = () => {
  const [loanTypeSwitch, setLoanTypeSwitch] = useState(false);
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useAddLoanType();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
      },
      {
        onError: (err: any) => {
          openNotification({
            key: "employee-payroll",
            state: "info",
            title: "Employee Payroll Job Information",
            description:
              "Ensure all employees have a payroll job information set up!",
          });
          openNotification({
            key: "loan-config",
            state: "info",
            title: "Payroll Loan Configuration",
            description:
              "Ensure loan congiguration in payroll is set up correctly and try again",
          });
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });
          form.resetFields();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LOAN_TYPES],
            // exact: true,
          });
        },
      }
    );
  };

  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetLoanTypes({
    pagination,
  });
  return (
    <div className={`${boxStyle} text-sm`}>
      <div className="flex items-center justify-between">
        <h5 className={boxTitle}>Set Loan Types</h5>
        <Switch
          checked={loanTypeSwitch}
          onChange={(value) => {
            setLoanTypeSwitch(value);
          }}
        />
      </div>
      <p className="text-sm pt-2">
        Define the various loan types that employees will be able to apply for
      </p>

      {loanTypeSwitch && (
        <Form className="mt-4" form={form} onFinish={handleSubmit}>
          <Form.Item name="name" rules={textInputValidationRules}>
            <input
              type="text"
              placeholder="Enter Loan Name"
              className={inputStyle}
            />
          </Form.Item>
          <span
            onClick={() => form.submit()}
            className="text-sm cursor-pointer text-caramel font-medium text-right block pt-2 underline"
          >
            {!isLoading ? "+ Add" : <LoadingOutlined />}
          </span>

          <div className="mt-4">
            <LoanTypeTable
              pagination={pagination}
              onChange={onChange}
              data={data?.data}
              total={data?.total}
              loading={isFetching}
            />
          </div>
          <div className="flex items-center justify-between mt-6 mb-2">
            <button
              type="button"
              onClick={() => setLoanTypeSwitch(false)}
              className="transparentButton"
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default LoanTypeSetup;
