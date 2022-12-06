import { MailOutlined, LockOutlined } from "@mui/icons-material";
import { Form, Input, Spin } from "antd";
import axios from "axios";
import { useContext } from "react";
import { useQueryClient, useMutation } from "react-query";
import { IVerifyUserProps } from "../../ApiRequesHelpers/Auth";
import { ICreateEmpProps } from "../../ApiRequesHelpers/Auth/employees";
import { GlobalContext } from "../../Contexts/GlobalContextProvider";
import { openNotification } from "../../NotificationHelpers";

export const EmployeeRegistrationForm = ({
  token,
  email,
}: IVerifyUserProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id;

  const createEmployeeAccount = async (props: ICreateEmpProps) => {
    const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/user/verification/employee`;
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "x-company-id": props.companyId,
      },
    };

    const data: any = {
      password: props.password,
      confirmPassword: props.confirmPassword,
    };

    const response = await axios.post(url, data, config);
    return response;
  };

  const { mutate, isLoading } = useMutation(createEmployeeAccount);

  const queryClient = useQueryClient();
  const [form] = Form.useForm();

  const onFormSubmit = (data: any) => {
    if (companyId) {
      const props: ICreateEmpProps = {
        companyId,
        password: data.password,
        confirmPassword: data.confirmPassword,
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
    }
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
          <Input
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
          <Input
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
