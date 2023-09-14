import { Form, Input, Select, Skeleton } from "antd";
import { AppButton } from "components/button/AppButton";
import { useGetPayrollTemplateInfo } from "features/payroll/hooks/templates/information/useGetPayrollTemplateInfo";
import { useChangeInfoFromPayrollTemplate } from "features/payroll/hooks/templates/management/useChangeInfoFromPayrollTemplate";
import { TAddPayrollTemplateData } from "features/payroll/hooks/templates/useAddPayrollTemplate";
import {
  TChangeInfoFromPayrollTemplateAction,
  TPayrollTemplate,
  TPayrollTemplateInfoType,
} from "features/payroll/types/template";
import React, { useEffect } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

const PayrollReportTemplate: React.FC<{
  handleSubmit?: {
    fn: (data: TAddPayrollTemplateData) => void;
    isLoading?: boolean;
  };
  template?: TPayrollTemplate;
  disabled?: boolean;
}> = ({ handleSubmit, template, disabled = false }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (!template) return;
    form.setFieldsValue({
      name: template.name,
      description: template.description,
      employeeInformation: template.employeeInformation.map(
        (item) => item.templateInformationId
      ),
      payrollInformation: template.payrollInformation.map(
        (item) => item.templateInformationId
      ),
    });
  }, [form, template]);

  const onFinish = (data: any) => {
    handleSubmit?.fn({
      description: data.description,
      name: data.name,
      employeeInformation: data.employeeInformation.map((id: number) => ({
        templateInformationId: id,
      })),
      payrollInformation: data.payrollInformation.map((id: number) => ({
        templateInformationId: id,
      })),
    });
  };
  const { data: employeeInformation, isFetching: empLoading } =
    useGetPayrollTemplateInfo({ type: "employee" });
  const { data: payrollInformation, isFetching: payLoading } =
    useGetPayrollTemplateInfo({ type: "payroll" });
  const { mutate: empInfoMutate } = useChangeInfoFromPayrollTemplate();

  const handleInformationChange = (props: {
    value: number;
    action: TChangeInfoFromPayrollTemplateAction;
    infoType: TPayrollTemplateInfoType;
  }) => {
    if (!template) return;
    const { value, action, infoType } = props;
    empInfoMutate(
      {
        action,
        infoType,
        templateId: template.id,
        templateInfoId: value,
        type: "payroll",
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
        },
      }
    );
  };

  return (
    <div className="bg-card px-2 md:px-5 py-3 rounded-md text-accent">
      <Skeleton loading={empLoading || payLoading} paragraph={{ rows: 12 }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          requiredMark={false}
          disabled={disabled}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {handleSubmit && (
              <div className="col-span-2 flex justify-end">
                <AppButton
                  type="submit"
                  isLoading={handleSubmit?.isLoading}
                  label="Save"
                />
              </div>
            )}
            <Form.Item
              rules={textInputValidationRules}
              name="name"
              label="Name"
            >
              <Input className="w-full" placeholder="Template Name" />
            </Form.Item>

            <Form.Item
              rules={generalValidationRules}
              name="employeeInformation"
              label="Employee Information"
            >
              <Select
                options={employeeInformation?.map((item) => ({
                  label: <span className="capitalize">{item.name}</span>,
                  value: item.id,
                }))}
                loading={empLoading}
                onSelect={(val: number) =>
                  handleInformationChange({
                    action: "add",
                    value: val,
                    infoType: "employee",
                  })
                }
                onDeselect={(val: number) =>
                  handleInformationChange({
                    action: "delete",
                    value: val,
                    infoType: "employee",
                  })
                }
                mode="multiple"
                className="w-full"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                placeholder="Employee Information to display in report"
              />
            </Form.Item>
            <Form.Item
              rules={textInputValidationRules}
              name="description"
              label="Description"
            >
              <Input.TextArea
                className="w-full"
                placeholder="Describe the report template"
              />
            </Form.Item>
            <Form.Item
              rules={generalValidationRules}
              name="payrollInformation"
              label="Payroll Information"
            >
              <Select
                options={payrollInformation?.map((item) => ({
                  label: <span className="capitalize">{item.name}</span>,
                  value: item.id,
                }))}
                loading={payLoading}
                onSelect={(val: number) =>
                  handleInformationChange({
                    action: "add",
                    value: val,
                    infoType: "payroll",
                  })
                }
                onDeselect={(val: number) =>
                  handleInformationChange({
                    action: "delete",
                    value: val,
                    infoType: "payroll",
                  })
                }
                mode="multiple"
                className="w-full"
                getPopupContainer={(triggerNode) => triggerNode.parentElement}
                placeholder="Payroll Information to display in report"
              />
            </Form.Item>
          </div>
        </Form>
      </Skeleton>
    </div>
  );
};

export default PayrollReportTemplate;
