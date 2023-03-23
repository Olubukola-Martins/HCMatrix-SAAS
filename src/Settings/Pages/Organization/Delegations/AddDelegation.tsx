import { DatePicker, Form, Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Button from "GeneralComps/Button";
import { FormEmployeeInput } from "GeneralComps/FormEmployeeInput";
import { FormRolePermissionsInput } from "GeneralComps/FormRolePermissionsInput";
import { useApiAuth } from "Hooks/useApiAuth";
import { openNotification } from "NotificationHelpers";
import { useState } from "react";
import { useQueryClient } from "react-query";
import useSaveDelegation from "Settings/Pages/Organization/Delegations/hooks/useSaveDelegation";
import { IModalProps } from "../../../../AppTypes/Component";
import { generalValidationRules } from "../../../../FormHelpers/validation";
const { RangePicker } = DatePicker;

export const AddDelegation = ({ open, handleClose }: IModalProps) => {
  const [delegatorRoleId, setDelegatorRoleId] = useState<number>();
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useSaveDelegation();

  const handleSubmit = (data: any) => {
    if (companyId) {
      mutate(
        {
          companyId,
          token,
          delegateeId: data.delegateeId,
          delegatorId: data.delegatorId,
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
              queryKey: ["delegations"],
              // exact: true,
            });
          },
        }
      );
    }
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
          control={{ name: "delegatorId", label: "Delegator" }}
          handleSelect={(val, option) => {
            form.setFieldValue("permissionIds", []); //this is done to clear the permissions input on change
            setDelegatorRoleId(() => option?.roleId);
          }}
        />
        <FormEmployeeInput
          Form={Form}
          control={{ name: "delegateeId", label: "Delegatee" }}
        />

        <Form.Item
          name="period"
          label="Select Period"
          rules={generalValidationRules}
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

        <Button type="submit" isLoading={isLoading} />
      </Form>
    </Modal>
  );
};
