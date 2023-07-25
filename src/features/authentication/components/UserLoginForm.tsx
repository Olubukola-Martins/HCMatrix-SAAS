import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { useSignIn } from "react-auth-kit";
import { useContext, useEffect } from "react";

import { BeatLoader } from "react-spinners";
import { useLoginUser } from "../hooks/useLoginUser";
import {
  TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "config/refreshTokenApi";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { IAuthDets, ILoginProps } from "../types";
import { saveMessagingDeviceToken } from "config/firebase/messaging";

const UserLoginForm = ({ autoLoginDetails }: ILoginProps) => {
  const signIn = useSignIn();
  const { mutate, isLoading } = useLoginUser();
  const globalCtx = useContext(GlobalContext);
  const { dispatch: globalDispatch } = globalCtx;
  const [form] = Form.useForm();
  useEffect(() => {
    if (autoLoginDetails) {
      form.setFieldsValue({
        emailOrEmpUid: autoLoginDetails.email,
        password: autoLoginDetails.password,
      });
      form.submit();
    }
  }, [autoLoginDetails, form]);

  const handleSignIn = (data: any) => {
    mutate(
      {
        emailOrEmpUid: data.emailOrEmpUid,

        password: data.password,
      },
      {
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
          const authUserDetails: IAuthDets = {
            user: {
              avatarUrl: result?.user?.avatarUrl,
              fullName: result?.user?.fullName,
              email: result?.user?.email,
              lastLogin: result?.user?.lastLogin,
              id: result?.user?.id,
              isAdmin: result?.user?.isAdmin,
              isSocial: result?.user?.isSocial,
              isVerified: result?.user?.isVerified,
            },
            companies: result?.payload?.map((item: any) => ({
              avatarUrl: item?.avatarUrl,
              id: item?.id,
              firstName: item?.firstName,
              lastName: item?.lastName,
              email: item?.email,
              hasSelfService: item?.hasSelfService,
              empUid: item?.empUid,
              roleId: item?.roleId,
              status: item?.status,
              companyId: item?.companyId,
              designationId: item?.designationId,
              userId: item?.userId,
              createdAt: item?.createdAt,
              updatedAt: item?.updatedAt,
              deletedAt: item?.deletedAt,
              departmentId: item?.departmentId,
              company: {
                id: item?.company?.id,
                name: item?.company?.name,
                label: item?.company?.label,
                email: item?.company?.email,
                phoneNumber: item?.company?.phoneNumber,
                isParent: item?.company?.isParent,
                isActive: item?.company?.isActive,
                color: item?.company?.color,
                industryId: item?.company?.industryId,
                userId: item?.company?.userId,
                addressId: item?.company?.addressId,
                logoUrl: item?.company?.logoUrl,
                website: item?.company?.website,
                parentId: item?.company?.parentId,
                createdAt: item?.company?.createdAt,
                updatedAt: item?.company?.updatedAt,
                deletedAt: item?.company?.deletedAt,
              },
              role: {
                id: item?.role?.id,
                name: item?.role?.name,
                companyId: item?.role?.companyId,
                createdAt: item?.role?.createdAt,
                updatedAt: item?.role?.updatedAt,
                permissions: item?.role?.permissions.map((pem: any) => ({
                  id: pem?.id,
                  permissionId: pem?.permissionId,
                  roleId: pem?.roleId,
                  createdAt: pem?.createdAt,
                  updatedAt: pem?.updatedAt,
                  permission: {
                    id: pem?.permission?.id,
                    name: pem?.permission?.name,
                    label: pem?.permission?.label,
                    categoryId: pem?.permission?.categoryId,
                    description: pem?.permission?.description,
                    createdAt: pem?.permission?.createdAt,
                    updatedAt: pem?.permission?.updatedAt,
                  },
                })),
              },
            })),
            userToken: result.accessToken,
          };

          if (
            signIn({
              token: result.accessToken,
              expiresIn: TOKEN_EXPIRES_IN, //indicates how long the auth token is valid for
              tokenType: "Bearer",
              authState: authUserDetails,
            })
          ) {
            globalDispatch({
              type: EGlobalOps.setCurrentCompanyId,
              payload: {
                id: authUserDetails.companies[0].company.id,
                name: authUserDetails.companies[0].company.name,
              },
            });
            saveMessagingDeviceToken({
              employeeId: authUserDetails.companies[0].id,
            });
          }
        },
      }
    );
  };
  return (
    <Form onFinish={handleSignIn} form={form}>
      <Form.Item name="emailOrEmpUid" rules={textInputValidationRules}>
        <Input
          prefix={<MailOutlined className="site-form-item-icon pr-1" />}
          placeholder="Employee ID or Work Email"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
          autoComplete="email"
          autoFocus
        />
      </Form.Item>
      <Form.Item name="password" rules={textInputValidationRules}>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon pr-1" />}
          placeholder="Password"
          className="rounded border-slate-400"
          style={{ padding: "6px 5px" }}
          autoComplete="new-password"
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
