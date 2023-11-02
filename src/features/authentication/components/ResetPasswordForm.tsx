import { LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useSignIn } from "react-auth-kit";
import { BeatLoader } from "react-spinners";
import { useResetPassword } from "../hooks/useResetPassword";
import { TOKEN_EXPIRES_IN } from "config/refreshTokenApi";
import { passwordValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { IVerifyUserProps, IAuthDets } from "../types";

export const ResetPasswordForm = ({ token, uid }: IVerifyUserProps) => {
  const { mutate, isLoading } = useResetPassword();
  const [form] = Form.useForm();
  const signIn = useSignIn();

  const handleSubmit = (data: any) => {
    mutate(
      {
        password: data.password,
        confirmPassword: data.confirmPassword,
        token,
        uid,
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
        onSuccess: (res) => {
          const result = res.data;
          const authUserDetails: IAuthDets = {
            user: result?.user,
            companies: result?.payload,
            userToken: result?.accessToken,
          };
          if (
            signIn({
              token: result.accessToken,
              expiresIn: TOKEN_EXPIRES_IN, //log person out after 2 hrs

              tokenType: "Bearer",
              authState: authUserDetails,
            })
          )
            openNotification({
              state: "success",
              title: "Success",
              description: res.message,
            });

          form.resetFields();
        },
      }
    );
  };

  return (
    <Form onFinish={handleSubmit} form={form}>
      <Form.Item name="password" rules={passwordValidationRules} hasFeedback>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon pr-1" />}
          placeholder="New Password"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
          autoFocus
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          {
            required: true,
            message: "Field is required",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                "The two passwords that you entered do not match."
              );
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon pr-1" />}
          placeholder="Confirm Password"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
        />
      </Form.Item>
      <button
        className="authBtn w-full mt-4 mb-3"
        type="submit"
        // disabled={isLoading}
      >
        {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
      </button>
    </Form>
  );
};
