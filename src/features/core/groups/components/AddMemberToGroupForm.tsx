import { Form, Switch } from "antd";

import React from "react";
import { useQueryClient } from "react-query";
import { openNotification } from "utils/notifications";
import { useAddMemberToGroup } from "../hooks/useAddMemberToGroup";
import { TGroup } from "../types";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_SINGLE_GROUP_MEMBERS } from "../hooks/useFetchSingleGroupMembers";
import { FormEmployeeInput } from "features/core/employees/components/FormEmployeeInput";

interface IProps {
  group: TGroup;
}

export const AddMemberToGroupForm: React.FC<IProps> = ({ group }) => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const { mutate, isLoading } = useAddMemberToGroup();

  const handleSubmit = (data: any) => {
    mutate(
      {
        body: {
          employeeId: data.employeeId,

          isLead: !!data.isLead,
        },
        id: group.id as number,
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

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_GROUP_MEMBERS],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div className="">
      <Form layout="vertical" onFinish={handleSubmit}>
        <div className="flex gap-4 w-full">
          <FormEmployeeInput
            Form={Form}
            control={{ name: "employeeId", label: "Employee" }}
          />
          <Form.Item
            name="isLead"
            label="Is member a lead?"
            className="flex-auto"
          >
            <Switch unCheckedChildren="No" checkedChildren="Yes" />
          </Form.Item>
          <Form.Item label=".">
            <AppButton type="submit" label="Save" isLoading={isLoading} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
