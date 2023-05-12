import React, { useEffect, useState } from "react";
import { TLeaveType } from "../types";
import { QUERY_KEY_FOR_LEAVE_TYPES } from "../hooks/useFetchLeaveTypes";
import { Form, Modal, Input, InputNumber, Switch, Select, Button } from "antd";
import { AppButton } from "components/button/AppButton";
import { GENDERS } from "constants/general";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import {
  textInputValidationRules,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateLeaveType } from "../hooks/useCreateLeaveType";
import { useUpdateLeaveType } from "../hooks/useUpdateLeaveType";

interface IProps extends IModalProps {
  data: TLeaveType;
  type?: "view" | "edit";
}
const ViewOrEditLeaveType: React.FC<IProps> = ({
  handleClose,
  open,
  data,
  type = "view",
}) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateLeaveType();
  const [employeesGetAllowance, setEmployeesGetAllowance] = useState(false);
  useEffect(() => {
    setEmployeesGetAllowance(!!data.employeesGetAllowance);
    form.setFieldsValue({
      name: data.name,
      employeesGetAllowance: !!data.employeesGetAllowance,
      calculation: data.calculation,
      percentageAmount: data.percentageAmount,
      gender: data.gender,
      length: data.length,
    });
  }, [form, data]);
  const handleSubmit = (formData: any) => {
    mutate(
      {
        data: {
          name: formData.name,
          employeesGetAllowance: !!formData.employeesGetAllowance,
          calculation: formData.calculation,
          percentageAmount: formData.percentageAmount,
          gender: formData.gender,
          length: formData.length,
        },
        id: data.id,
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
    <Modal
      open={open}
      style={{ top: 10 }}
      onCancel={() => handleClose()}
      footer={null}
      title={<span className="capitalize">{type} leave type</span>}
    >
      <Form
        labelCol={{ span: 24 }}
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        disabled={type === "view"}
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
            defaultChecked={!!data?.employeesGetAllowance}
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
          rules={generalValidationRules}
        >
          <Select options={GENDERS} />
        </Form.Item>

        <div className="flex flex-row justify-between items-center">
          <Button type="text" onClick={() => handleClose()}>
            Cancel
          </Button>
          <div className="flex flex-row gap-4">
            {type === "edit" && (
              <AppButton type="submit" isLoading={isLoading} label="Submit" />
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ViewOrEditLeaveType;
