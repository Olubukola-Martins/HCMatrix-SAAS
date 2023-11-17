// TO DO: REMOVE and refactor all mui icons used
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { TOKEN_EXPIRES_IN } from "config/refreshTokenApi";
import { useSignIn } from "react-auth-kit";
import { openNotification } from "utils/notifications";
import { useCreateEmployeeAccount } from "../hooks/useCreateEmployeeAccount";
import { IVerifyUserProps, IAuthDets } from "../types";
import { passwordValidationRules } from "utils/formHelpers/validation";
import { BeatLoader } from "react-spinners";

export const EmployeeRegistrationForm = ({
  token,
  email,
  uid,
}: IVerifyUserProps) => {
  const { mutate, isLoading } = useCreateEmployeeAccount();

  const [form] = Form.useForm();
  const signIn = useSignIn();

  const onFormSubmit = (data: any) => {
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
            user: result.user,
            companies: result.payload,
            userToken: result.accessToken,
          };
          if (
            signIn({
              token: result.accessToken,
              expiresIn: TOKEN_EXPIRES_IN, //indicates how long the auth token is valid for
              tokenType: "Bearer",
              authState: authUserDetails,
            })
          )
            openNotification({
              state: "success",
              title: "Success",
              description: res.message,
              // duration: 0.4,
            });

          form.resetFields();
        },
      }
    );
  };

  return (
    <div>
      <Form onFinish={onFormSubmit}>
        <Form.Item name="email" initialValue={email}>
          <Input
            prefix={<MailOutlined className="site-form-item-icon pr-1" />}
            placeholder="Employee ID or Work Email"
            className="rounded border-slate-400"
            style={{ padding: "6px 5px" }}
            disabled
            autoFocus
          />
        </Form.Item>
        <Form.Item name="password" rules={passwordValidationRules} hasFeedback>
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon pr-1" />}
            placeholder="Password"
            className="rounded border-slate-400"
            style={{ padding: "6px 5px" }}
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
                  "The two passwords that you entered does not match."
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

        <button className="authBtn w-full mt-4 mb-3">
          {isLoading ? <BeatLoader color="#fff" /> : "Sign Up"}
        </button>
      </Form>
    </div>
  );
};
