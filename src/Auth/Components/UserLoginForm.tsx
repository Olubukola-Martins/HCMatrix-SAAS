import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useMutation } from "react-query";
import { IUserLoginProps, loginUser } from "../../ApiRequesHelpers/Auth";
import { textInputValidationRules } from "../../FormHelpers/validation";
import { LoadingOutlined } from "@ant-design/icons";
import { openNotification } from "../../NotificationHelpers";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import {
  EGlobalOps,
  GlobalContext,
} from "../../Contexts/GlobalContextProvider";
import { BeatLoader } from "react-spinners";

const UserLoginForm = () => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { mutate, isLoading } = useMutation(loginUser);
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;

  const handleSignIn = (data: any) => {
    const props: IUserLoginProps = {
      emailOrEmpUid: data.emailOrEmpUid,

      password: data.password,
    };
    openNotification({
      state: "info",
      title: "Wait a second ...",
      // description: <Progress percent={80} status="active" />,
      description: <LoadingOutlined />,
    });
    mutate(props, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res) => {
        const result = res.data.data;

        const authUserDetails = {
          user: result.user,
          companies: result?.payload,
        };
        if (
          signIn({
            token: result.token,
            expiresIn: 120000000000,
            tokenType: "Bearer",
            authState: authUserDetails,
          })
        ) {
          openNotification({
            state: "success",

            title: "Success",
            description: "Logged in successfully!",
          });
          if (!globalState.currentCompany) {
            globalDispatch({
              type: EGlobalOps.setCurrentCompanyId,
              payload: {
                id: authUserDetails.companies[0].id,
                name: authUserDetails.companies[0].name,
              },
            });
          }
          navigate("/");
        }
      },
    });
  };
  return (
    <Form onFinish={handleSignIn}>
      <Form.Item
        name="emailOrEmpUid"
        rules={textInputValidationRules}
        hasFeedback
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon pr-1" />}
          placeholder="Employee ID or Work Email"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
        />
      </Form.Item>
      <Form.Item name="password" rules={textInputValidationRules} hasFeedback>
        <Input
          prefix={<LockOutlined className="site-form-item-icon pr-1" />}
          placeholder="Password"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
        />
      </Form.Item>

      <button
        className="authBtn w-full mt-4 mb-3"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? <BeatLoader color="#fff" /> : "Sign In"}
      </button>
    </Form>
  );
};

export default UserLoginForm;
