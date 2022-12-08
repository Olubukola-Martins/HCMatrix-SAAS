import { LockOutlined } from "@mui/icons-material";
import { Form, Input } from "antd";
import { useSignIn } from "react-auth-kit";
import { useMutation, useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { IVerifyUserProps } from "../../ApiRequesHelpers/Auth";
import {
  IResetUserPProps,
  resetUserPassword,
} from "../../ApiRequesHelpers/Auth/resetPassword";
import { openNotification } from "../../NotificationHelpers";

export const ResetPasswordForm = ({ token, uid }: IVerifyUserProps) => {
  const { mutate, isLoading } = useMutation(resetUserPassword);
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const signIn = useSignIn();

  const handleSubmit = (data: any) => {
    const props: IResetUserPProps = {
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
            token: result.token,
            expiresIn: process.env.REACT_APP_SESSION_TIME as unknown as number,
            tokenType: "Bearer",
            authState: authUserDetails,
          })
        )
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });

        form.resetFields();
        queryClient.invalidateQueries({
          queryKey: ["resetUserPassword"],
          exact: true,
        });
      },
    });
  };

  return (
    <Form onFinish={handleSubmit} form={form}>
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
          placeholder="New Password"
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
