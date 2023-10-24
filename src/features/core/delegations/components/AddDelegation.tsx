import { DatePicker, Form, Modal, Input } from "antd";
import { AppButton } from "components/button/AppButton";
import { useQueryClient } from "react-query";
import { IModalProps } from "types";
import { dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import useSaveDelegation from "../hooks/useSaveDelegation";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRolePermissionsInput } from "features/core/roles-and-permissions/components/FormRolePermissionsInput";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_DELEGATED_DELEGATIONS } from "../hooks/useGetAllDelegatedDelegations";
import { QUERY_KEY_FOR_DELEGATIONS_DELEGATED } from "../hooks/useGetAllDelegationsDelegated";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

export const AddDelegation = ({ open, handleClose }: IModalProps) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useSaveDelegation();
  const { currentCompanyEmployeeDetails: delegator } = useApiAuth();
  const delegatorRoleId = delegator?.roleId;

  const handleSubmit = (data: any) => {
    mutate(
      {
        delegateeId: data.delegateeId,
        description: data.description,
        startDate: data.period[0].toString(),
        endDate: data.period[1].toString(),
        permissions: data.permissionIds.map((item: number) => ({
          permissionId: item,
        })),
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
            queryKey: [QUERY_KEY_FOR_DELEGATED_DELEGATIONS],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_DELEGATIONS_DELEGATED],
            // exact: true,
          });
        },
      }
    );
  };
  return (
    <Modal
      title="Add Delegation"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
      style={{ top: 10 }}
    >
      <Form
        layout="vertical"
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
      >
        <FormEmployeeInput
          Form={Form}
          control={{ name: "delegateeId", label: "Delegatee" }}
        />

        <Form.Item
          name="period"
          label="Select Period"
          rules={[dateHasToBeGreaterThanOrEqualToCurrentDayRuleForRange]}
        >
          <RangePicker className="generalInputStyle" />
        </Form.Item>

        {delegatorRoleId ? (
          <FormRolePermissionsInput
            Form={Form}
            roleId={delegatorRoleId}
            control={{ name: "permissionIds", label: "Permissions" }}
          />
        ) : null}

        <Form.Item
          name="description"
          label="Description (Optional)"
          requiredMark="optional"
        >
          <TextArea
            rows={3}
            className="generalInputStyle"
            placeholder="Enter Description"
          />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
