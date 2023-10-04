import { DatePicker, Form, Modal, Input, Skeleton } from "antd";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";
import { FormRolePermissionsInput } from "features/core/roles-and-permissions/components/FormRolePermissionsInput";
import moment from "moment";
import { useState, useEffect } from "react";
import { IModalProps } from "types";
import { generalValidationRules } from "utils/formHelpers/validation";
import { useFetchSingleDelegation } from "../hooks/useFetchSingleDelegation";

const { RangePicker } = DatePicker;

interface IProps extends IModalProps {
  id: number;
}
export const DelegationDetail: React.FC<IProps> = ({
  open,
  handleClose,
  id,
}) => {
  const [delegatorRoleId, setDelegatorRoleId] = useState<number>();
  const [form] = Form.useForm();

  const { data, isFetching } = useFetchSingleDelegation({ id });

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        delegateeId: data.delegatee.id,
        delegatorId: data.delegator.id,
        description: data.description,
        period: [moment(data.startDate), moment(data.endDate)],
        permissions: data.permissions.map((item) => item.permissionId),
      });
    }
  }, [data, form]);

  return (
    <Modal
      title="View Delegation"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
      style={{ top: 10 }}
    >
      <Skeleton loading={isFetching} paragraph={{ rows: 12 }}>
        <Form layout="vertical" requiredMark={false} form={form} disabled>
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
            <Input.TextArea
              rows={3}
              className="generalInputStyle"
              placeholder="Enter Description"
            />
          </Form.Item>
        </Form>
      </Skeleton>
    </Modal>
  );
};
