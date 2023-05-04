import { Form, Spin, Drawer } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useApiAuth } from "hooks/useApiAuth";
import { useQueryClient } from "react-query";
import { IDrawerProps } from "types";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useInviteEmployees } from "../hooks/useInviteEmployees";
import { IEmpInviteProps } from "../types";

export const AddMultipleEmployees = ({ open, handleClose }: IDrawerProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const [form] = Form.useForm();
  const { mutate } = useInviteEmployees();

  const handleSubmit = (data: any) => {
    if (companyId) {
      const props: IEmpInviteProps = {
        token,
        companyId,
        emails: data.emails,
      };
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
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
            queryKey: ["invited-employees"],
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
        <div className="bg-red-200 py-2 rounded flex justify-between text-sm px-2">
          <span>Employees Added: 4</span>
          <span>License count left: 2</span>
        </div>
        <p className="text-sm py-6">
          Enter several email addresses separated by a comma. Users are invited
          via email and will become members of the organization once they accept
          the invitation.
        </p>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item name="emails" rules={textInputValidationRules}>
            <TextArea
              className="rounded"
              rows={7}
              placeholder="Enter email addresses and separated with comma,"
            />
          </Form.Item>

          <button type="submit" className="button">
            Send Invite
          </button>
        </Form>
      </div>
    </Drawer>
  );
};
