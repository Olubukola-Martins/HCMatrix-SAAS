import { Form, Input } from "antd";
import React from "react";
import { useAddChat } from "../hooks/useAddChat";
import { AppButton } from "components/button/AppButton";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { useFetchSingleEmployee } from "features/core/employees/hooks/useFetchSingleEmployee";
import { openNotification } from "utils/notifications";

export const TestChatBot = () => {
  const { mutate, isLoading } = useAddChat();
  const { currentCompanyEmployeeDetails: employee } = useMostRecentApiAuth();
  const employeeId = employee?.id;
  const { data: singleEmployee } = useFetchSingleEmployee({
    employeeId: employeeId || 0,
  });
  const handleSubmit = (val: any) => {
    mutate(
      {
        user_query: val.user_query,
        audio: false,
        chat_id: "123456",
        employee_metadata: {
          department_id:
            singleEmployee?.designation?.department?.id.toString() || "",
          role_id: singleEmployee?.roleId.toString() || "",
          group_id: singleEmployee?.userGroups?.[0]?.id.toString() || "",
          company_id: singleEmployee?.companyId.toString() || "",
          id: singleEmployee?.id.toString() || "",
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          //   form.resetFields();
        },
      }
    );
  };
  return (
    <div>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="user_query" label="User Query">
          <Input />
        </Form.Item>

        <AppButton type="submit" isLoading={isLoading} />
      </Form>
    </div>
  );
};
