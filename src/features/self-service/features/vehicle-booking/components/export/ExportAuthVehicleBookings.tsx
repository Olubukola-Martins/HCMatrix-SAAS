import { Button, Drawer, Form, Input, InputNumber, Select } from "antd";
import Themes from "components/Themes";
import { AppButton } from "components/button/AppButton";
import { DEFAULT_EXPORT_PAGE_SIZE } from "constants/general";
import React, { useState } from "react";
import { TbFileExport } from "react-icons/tb";
import { numberHasToBeGreaterThanValueRule } from "utils/formHelpers/validation";
import {
  TExportAuthVehicleBookingProps,
  useExportAuthVehicleBookings,
} from "../../hooks/export/useExportAuthVehicleBookings";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";

type TFormData = TExportAuthVehicleBookingProps["data"];
const ExportAuthVehicleBookings: React.FC<{
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
  const { mutate, isLoading } = useExportAuthVehicleBookings({
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
          status: data?.status,
        },
      },
    });
  };
  return (
    <>
      <Drawer
        open={open}
        onClose={() => handleClose()}
        title="Export Vehicle Bookings"
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
            <Form.Item name="status" label="Status">
              <Select
                placeholder="Select Status"
                options={APPROVAL_STATUS_OPTIONS}
              />
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

export default ExportAuthVehicleBookings;
