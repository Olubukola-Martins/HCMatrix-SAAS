import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
} from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useCreatePayGradeCategory } from "features/payroll/hooks/payGrades/category/useCreatePayGradeCategory";
import { QUERY_KEY_FOR_PAY_GRADE_CATEGORIES } from "features/payroll/hooks/payGrades/category/useGetPayGradeCategories";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { FormPayrollReportTemplateInput } from "./templates/FormPayrollReportTemplateInput";
import { IModalProps } from "types";

const PAYROLL_SCHEME_OPTIONS = [
  { label: "Direct Salary", value: "direct-salary" },
  { label: "Office", value: "office" },
  { label: "Wages", value: "wages" },
  { label: "Project", value: "project" },
];

const AddPayrollReport: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useCreatePayGradeCategory();

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        maxGrossPay: data.maxGrossPay,
        minGrossPay: data.minGrossPay,
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
          navigate(appRoutes.addPayrollReport);

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_PAY_GRADE_CATEGORIES],
            // exact: true,
          });
        },
      }
    );
  };
  const [showAllSchemes, setShowAllSchemes] = useState(true);
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Create Payroll Report"}
      style={{ top: 10 }}
    >
      <Form
        layout="horizontal"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
        colon={false}
      >
        <Form.Item
          rules={textInputValidationRules}
          name="name"
          label="Report Name"
          labelCol={{ span: 24 }}
        >
          <Input className="w-full" placeholder="Report Name" />
        </Form.Item>

        <Form.Item
          rules={generalValidationRules}
          name="reportDuration"
          label="Report Duration"
          labelCol={{ span: 24 }}
        >
          <DatePicker.RangePicker
            placeholder={["From", "To"]}
            className="w-full"
          />
        </Form.Item>
        <FormPayrollReportTemplateInput
          Form={Form}
          control={{ name: "templateId", label: "Select a template" }}
        />

        <>
          <Form.Item
            label="Do you want to include all payroll schemes ?"
            labelAlign="left"
          >
            <div className="flex justify-end">
              <Switch
                checked={showAllSchemes}
                onChange={(val) => setShowAllSchemes(val)}
              />
            </div>
          </Form.Item>
          {showAllSchemes === false && (
            <Form.Item rules={generalValidationRules}>
              <Select
                options={PAYROLL_SCHEME_OPTIONS}
                mode="multiple"
                placeholder="Select Payroll Scheme(s) to include in report"
              />
            </Form.Item>
          )}
        </>
        <Form.Item
          rules={textInputValidationRules}
          name="description"
          label="Report Description"
          labelCol={{ span: 24 }}
        >
          <Input.TextArea className="w-full" placeholder="Report Description" />
        </Form.Item>

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} label="Create" />
        </div>
      </Form>
    </Modal>
  );
};

export default AddPayrollReport;
