import { Form, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React from "react";
import { IModalProps } from "types";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { TVehicle } from "../hooks/useFetchVehicles";
import { useEditVehicle } from "../hooks/useEditVehicle";
import { QUERY_KEY_FOR_SINGLE_VEHICLE } from "../hooks/useFetchSingleVehicle";

interface IProps extends IModalProps {
  vehicle: TVehicle;
}
export const UnassignVehicle: React.FC<IProps> = ({
  open,
  handleClose,
  vehicle,
}) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();

  const { mutate, isLoading } = useEditVehicle();

  const handleSubmit = (values: any) => {
    const data = vehicle;
    mutate(
      {
        data: {
          type: data?.type,
          brand: data?.brand,
          model: data?.model,
          plateNumber: data?.plateNumber,
          color: data?.color,
          description: data?.description,
          purchaseDate: data?.purchaseDate,
          dateAssigned: null,
          cost: data?.cost,
          status: "unassigned",
          assigneeId: null,
        },
        id: vehicle.id,
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
            queryKey: [QUERY_KEY_FOR_SINGLE_VEHICLE],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Unassign User"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <div className="flex flex-col gap-3">
          <div>
            <span className="text-center text-base">
              Are you sure you want to unassign this vehicle?
            </span>
          </div>

          <div className="flex justify-end">
            <AppButton type="submit" isLoading={isLoading} />
          </div>
        </div>
      </Form>
    </Modal>
  );
};
