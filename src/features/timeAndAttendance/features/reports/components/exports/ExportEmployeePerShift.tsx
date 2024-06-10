import {
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Select,
} from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_EXPORT_PAGE_SIZE } from "constants/general";
import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import {
  generalValidationRules,
  numberHasToBeGreaterThanValueRule,
} from "utils/formHelpers/validation";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { useExportEmployeePerShift } from "../../hooks/exports/useExportEmployeePerShift";
import { getEmployeePerShift } from "../../hooks/useGetEmployeePerShift";
import { FormDepartmentInput } from "features/core/departments/components/FormDepartmentInput";

type TFormData = Omit<Parameters<typeof getEmployeePerShift>[0], "auth">;

const ExportEmployeePerShift: React.FC<{
  trigger?: React.ReactNode;
}> = ({
  trigger = <Button icon={<TbFileExport className="text-2xl" />} type="text" />,
}) => {
  const [open, setOpen] = useState(false);
  const [empUid, setEmpUid] = useState<string>();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [form] = Form.useForm<TFormData>();
  const { mutate, isLoading } = useExportEmployeePerShift({
    handleSuccess: () => {
      form.resetFields();
      handleClose();
    },
  });
  const handleSubmit = (data: any) => {
    const startD = data.duration ? data.duration[0].format("YYYY-MM-DD") : null;
    const endD = data.duration ? data.duration[1].format("YYYY-MM-DD") : null;
    mutate({
      fileName: "Per_shift_Report.xlsx",
      props: {
        pagination: data.pagination,
        filter: {
          departmentId: data.departmentId,
          shiftTypes: data.shiftTypes,
          endDate: endD,
          startDate: startD,
        //   empUid: empUid,
        },
      },
    });
  };
  return (
    <>
      <Drawer
        open={open}
        onClose={() => handleClose()}
        title="Export Timesheet"
      >
        <Themes>
          <Form
            requiredMark={false}
            layout="vertical"
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              pagination: {
                limit: DEFAULT_EXPORT_PAGE_SIZE,
              },
            }}
          >
            <Form.Item name="pagination">
              <Input.Group>
                <Form.Item
                  name={["pagination", "limit"]}
                  label="Limit"
                  rules={[numberHasToBeGreaterThanValueRule(0)]}
                >
                  <InputNumber
                    placeholder="What is max limit of dataset"
                    className="w-full"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>

            <FormEmployeeInput
              Form={Form}
              optional={true}
              handleSelect={(_, val) => setEmpUid(val?.empUid)}
            />

            <FormDepartmentInput Form={Form} optional={true} />
            <Form.Item name="shiftTypes" label="Shifts">
              <Select
                options={[
                  { value: "morning", label: "Morning" },
                  { value: "afternoon", label: "Afternoon" },
                  { value: "night", label: "Night" },
                ]}
                allowClear
                placeholder="Select"
              />
            </Form.Item>
            <Form.Item name="duration" label="Duration" requiredMark="optional">
              <DatePicker.RangePicker className="w-full" format="MM/DD/YYYY" />
            </Form.Item>

            <div className="flex justify-end">
              <div className="flex gap-2">
                <AppButton
                  label="Cancel"
                  type="button"
                  variant="transparent"
                  handleClick={() => {
                    form.resetFields();
                  }}
                />
                <AppButton label="Export" type="submit" isLoading={isLoading} />
              </div>
            </div>
          </Form>
        </Themes>
      </Drawer>
      <div className="cursor-pointer" onClick={handleOpen}>
        {trigger}
      </div>
    </>
  );
};

export default ExportEmployeePerShift;
