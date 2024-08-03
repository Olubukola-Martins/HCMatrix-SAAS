import { Drawer, Form, Input } from "antd";
import { IDrawerProps } from "types";
import TextArea from "antd/es/input/TextArea";
import { TShiftSwapRequest } from "../types";
import { useEffect } from "react";
import { getEmployeeFullName } from "features/core/employees/utils/getEmployeeFullName";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import ApproveOrRejectButton from "features/core/workflows/components/approval-request/ApproveOrRejectButton";
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_MY_SHIFT_REQUEST } from "../hooks/useGetMyShiftSwapRequest";
import { QUERY_KEY_FOR_GENERAL_SHIFT_SWAP_APPROVAL } from "../hooks/useGetGeneralRequest";

type IProps = IDrawerProps & {
  data?: TShiftSwapRequest;
  approvalRequest?: TApprovalRequest;
};
export const ViewShiftSwapRequest = ({
  handleClose,
  open,
  data,
  approvalRequest,
}: IProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  useEffect(() => {
    form.setFieldsValue({
      shiftFrom: data?.shiftFrom.name,
      shiftTo: data?.shiftTo.name,
      shiftPartner: getEmployeeFullName(data?.shiftPartner),
      reason: data?.reason,
      status: data?.status,
    });
  }, [data, form]);

  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      title={`View Shift Request`}
    >
      <ApproveOrRejectButton
        className="flex justify-end"
        request={approvalRequest}
        handleSuccess={() => {
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_MY_SHIFT_REQUEST],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_GENERAL_SHIFT_SWAP_APPROVAL],
            // exact: true,
          });

          handleClose();
        }}
      />
      <Form
        form={form}
        layout="vertical"
        className="mt-4"
        disabled
        requiredMark={false}
      >
        <Form.Item name="shiftFrom">
          <Input />
        </Form.Item>
        <Form.Item name="shiftTo">
          <Input />
        </Form.Item>

        <Form.Item name={"status"} label="Status">
          <Input
            className="capitalize"
            style={{
              color: getAppropriateColorForStatus(data?.status ?? ""),
            }}
          />
        </Form.Item>

        <Form.Item name="shiftPartner">
          <Input />
        </Form.Item>

        <Form.Item label="Reason" name="reason">
          <TextArea className="w-full " rows={3} />
        </Form.Item>
      </Form>
    </Drawer>
  );
};
