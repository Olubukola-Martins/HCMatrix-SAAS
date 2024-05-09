import { Form, Drawer, Skeleton } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useApiAuth } from "hooks/useApiAuth";
import { useQueryClient } from "react-query";
import { IDrawerProps } from "types";
import { isEmailValid } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useInviteEmployees } from "../hooks/useInviteEmployees";
import { IEmpInviteProps } from "../types";
import { AppButton } from "components/button/AppButton";
import { QUERY_KEY_FOR_INVITED_EMPLOYEES } from "../hooks/useFetchInvitedEmployees";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "../hooks/useFetchEmployees";
import { useGetEmployeeLicenseCountLeft } from "features/billing/hooks/company/employeeLicense/count/useGetEmployeeLicenseCountLeft";

export const AddMultipleEmployees = ({ open, handleClose }: IDrawerProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useInviteEmployees();
  const { data: employeeCountData, isLoading: isLoadingEmployeeCount } =
    useGetEmployeeLicenseCountLeft();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: IEmpInviteProps = {
        token,
        companyId,
        emails: data.emails,
      };

      mutate(props, {
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
          });
          form.resetFields();
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_INVITED_EMPLOYEES],
            // exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_LIST_OF_EMPLOYEES],
            // exact: true,
          });
        },
      });
    }
  };

  return (
    <Drawer
      title="Invite Multiple Employees"
      open={open}
      onClose={() => handleClose(false)}
      footer={null}
      drawerStyle={{ background: "#f6f7fb" }}
    >
      <div>
        <Skeleton loading={isLoadingEmployeeCount} paragraph={{ rows: 2 }}>
          <div className="bg-red-200 py-2 rounded flex justify-between text-sm px-2">
            <span>
              License count left: {employeeCountData?.licensedEmployeeCountLeft}
            </span>
            <span>
              Unlicense count left:{" "}
              {employeeCountData?.unlicensedEmployeeCountLeft}
            </span>
          </div>
        </Skeleton>
        <p className="text-sm py-6">
          Enter several email addresses separated by a comma. Users are invited
          via email and will become members of the organization once they accept
          the invitation.
        </p>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item
            name="emails"
            rules={[
              {
                validator: async (_, value) => {
                  // non required
                  if (typeof value !== "string") {
                    throw new Error("Please enter a valid email!");
                  }

                  const emailValues = value
                    .split(",")
                    .map((item) => item.trim());

                  emailValues.forEach((item, i) => {
                    if (isEmailValid(item) === false) {
                      throw new Error(`Please enter a valid email at ${i + 1}`);
                    }
                  });

                  return true;
                },
              },
            ]}
          >
            <TextArea
              className="rounded"
              rows={7}
              placeholder="Enter email addresses and separated with comma,"
            />
          </Form.Item>

          <AppButton label="Send Invite" type="submit" isLoading={isLoading} />
        </Form>
      </div>
    </Drawer>
  );
};
