import { Button, Drawer, Form, Input, InputNumber } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_EXPORT_PAGE_SIZE } from "constants/general";
import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import { numberHasToBeGreaterThanValueRule } from "utils/formHelpers/validation";
import { FormVehicleStatusInput } from "../form/FormVehicleStatusInput";
import { FormVehicleTypeInput } from "../form/FormVehicleTypeInput";
import { getEmployeeVehicleAssigneeHistory } from "../../hooks/assignee-history/useGetEmployeeVehicleAssigneeHistory";
import { useExportEmployeeVehicleAssigneeHistory } from "../../hooks/export/useExportEmployeeVehicleAssigneeHistory";

type TFormData = Omit<
  Parameters<typeof getEmployeeVehicleAssigneeHistory>[0],
  "auth"
>["data"];
const ExportEmployeeVehicleAssigneeHistory: React.FC<{
  trigger?: React.ReactNode;
}> = ({
  trigger = <Button icon={<TbFileExport className="text-2xl" />} type="text" />,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [form] = Form.useForm<TFormData>();
  const { mutate, isLoading } = useExportEmployeeVehicleAssigneeHistory({
    handleSuccess: () => {
      form.resetFields();
      handleClose();
    },
  });
  const handleSubmit = (data: TFormData) => {
    mutate({
      props: {
        data: {
          pagination: data?.pagination,
        },
      },
    });
  };
  return (
    <>
      <Drawer open={open} onClose={() => handleClose()} title="Export Vehicles">
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

            <FormVehicleStatusInput
              Form={Form}
              optional={true}
              control={{ name: "status", label: "Status" }}
            />
            <FormVehicleTypeInput
              Form={Form}
              optional={true}
              control={{ name: "type", label: "Type" }}
            />

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

export default ExportEmployeeVehicleAssigneeHistory;
