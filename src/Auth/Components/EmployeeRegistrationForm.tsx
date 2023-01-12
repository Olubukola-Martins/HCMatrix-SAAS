import { MailOutlined, LockOutlined } from "@mui/icons-material";
import { Form, Input } from "antd";
import { useSignIn } from "react-auth-kit";
import { useQueryClient, useMutation } from "react-query";
import { IVerifyUserProps } from "../../ApiRequesHelpers/Auth";
import {
  createEmployeeAccount,
  ICreateEmpProps,
} from "../../ApiRequesHelpers/Auth/employees";
import { openNotification } from "../../NotificationHelpers";

export const EmployeeRegistrationForm = ({
  token,
  email,
  uid,
}: IVerifyUserProps) => {
  const { mutate, isLoading } = useMutation(createEmployeeAccount);

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const signIn = useSignIn();

  const onFormSubmit = (data: any) => {
    const props: ICreateEmpProps = {
      password: data.password,
      confirmPassword: data.confirmPassword,
      token,
      uid,
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
        const result = res.data.data;
        const authUserDetails = {
          user: result.user,
          companies: result?.payload,
        };
        if (
          signIn({
            token: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: process.env.REACT_APP_SESSION_TIME as unknown as number,
            refreshTokenExpireIn: process.env
              .REACT_APP_REFRESH_TOKEN_EXPIRY_TIME as unknown as number,
            tokenType: "Bearer",
            authState: authUserDetails,
          })
        )
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

        form.resetFields();
        queryClient.invalidateQueries({
          queryKey: ["employeeAccount"],
          exact: true,
        });
      },
    });
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
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            {
              min: 6,
              message: "password must be at least 6 characters",
            },
          ]}
          hasFeedback
        >
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
          {isLoading ? "Loading" : "Sign Up"}
        </button>
      </Form>
    </div>
  );
};
