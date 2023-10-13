// TO DO: REMOVE and refactor all mui icons used
import { MailOutlined, LockOutlined } from "@mui/icons-material";
import { Form, Input } from "antd";
import {
  TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "config/refreshTokenApi";
import { useSignIn } from "react-auth-kit";
import { useQueryClient, useMutation } from "react-query";
import { openNotification } from "utils/notifications";
import { createEmployeeAccount } from "../hooks/useCreateEmployeeAccount";
import { IVerifyUserProps, IAuthDets } from "../types";

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
        onSuccess: (res: any) => {
          const result = res.data.data;
          const authUserDetails: IAuthDets = {
            user: {
              avatarUrl: result?.user?.avatarUrl,
              fullName: result?.user?.fullName,
              email: result?.user?.email,
              lastLogin: result?.user?.lastLogin,
              id: result?.user?.id,
              isOwner: result?.user?.isOwner,
              isSocial: result?.user?.isSocial,
              isVerified: result?.user?.isVerified,
            },
            companies: result?.payload?.map((item: any) => ({
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
