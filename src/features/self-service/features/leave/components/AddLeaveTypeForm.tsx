import { Form, Switch, Input, InputNumber, Button, Select } from "antd";
import { useCreateLeaveType } from "../hooks/useCreateLeaveType";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_LEAVE_TYPES } from "../hooks/useFetchLeaveTypes";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import {
  generalValidationRules,
  generalValidationRulesOp,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { GENDERS } from "constants/general";
import { useState } from "react";

const AddLeaveTypeForm = ({ handleClose }: { handleClose: Function }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreateLeaveType();
  const [employeesGetAllowance, setEmployeesGetAllowance] = useState(false);

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        employeesGetAllowance: !!data.employeesGetAllowance,
        calculation: data.calculation,
        percentageAmount: data.percentageAmount,
        gender: data.gender,
        length: data.length,
      },
      {
        onError: (err: any) => {
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
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LEAVE_TYPES],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <div>
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Type Name"
          rules={textInputValidationRules}
          name="name"
        >
          <Input placeholder="Type Name" />
        </Form.Item>
        <Form.Item label="Length" name="length" rules={generalValidationRules}>
          <InputNumber placeholder="Length" className="w-full" />
        </Form.Item>
        <Form.Item
          label="Employees Get Leave Allowance"
          name={`employeesGetAllowance`}
          rules={generalValidationRules}
        >
          <Switch
            unCheckedChildren="Yes"
            checkedChildren="No"
            onChange={setEmployeesGetAllowance}
          />
        </Form.Item>
        {employeesGetAllowance && (
          <>
            <Form.Item
              label="Percentage Amount"
              name={`percentageAmount`}
              rules={generalValidationRules}
            >
              <InputNumber placeholder="Percentage Amount" />
            </Form.Item>
            <Form.Item
              label="Calculation"
              name={`calculation`}
              rules={textInputValidationRules}
            >
              <Input placeholder="calculation" />
            </Form.Item>
          </>
        )}
        <Form.Item
          label="Gender"
          name={`gender`}
          rules={generalValidationRulesOp}
        >
          <Select options={GENDERS} allowClear />
        </Form.Item>

        <div className="flex flex-row justify-between items-center">
          <Button type="text" onClick={() => handleClose()}>
            Cancel
          </Button>
          <div className="flex flex-row gap-4">
            <AppButton type="submit" isLoading={isLoading} label="Submit" />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default AddLeaveTypeForm;
