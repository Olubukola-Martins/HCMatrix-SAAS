import { useContext } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import {
  TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "config/refreshTokenApi";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";
import { IAuthDets, IVerifyUserProps } from "../types";
import { verifyUserToken } from "../hooks/useVerifyUserToken";

const VerificationStatus = ({ token, uid }: IVerifyUserProps) => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch: globalDispatch } = globalCtx;

  const signIn = useSignIn();
  const { isError, isSuccess } = useQuery(
    "user-auth-details",
    () => verifyUserToken({ token, uid }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,

      onError: (err: any) => {
        // show notification
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
            isAdmin: result?.user?.isAdmin,
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
        ) {
          openNotification({
            state: "success",

            title: "Success",
            description: "Logged in successfully!",
          });
          // the company information has to be saved in a general state to be accessible accross the app
          // result.payload has the companies
          // if (!globalState.currentCompany) {
          globalDispatch({
            type: EGlobalOps.setCurrentCompanyId,
            payload: {
              id: authUserDetails.companies[0].company.id,
              name: authUserDetails.companies[0].company.name,
            },
          });
          // }
          // navigate("/");
        }
      },
    }
  );
  return (
    <div>
      {!isError && !isSuccess && (
        <LoadingOutlined className="text-4xl text-green-700" />
      )}
      {isError && (
        <div>
          <Typography.Title level={4}>Invalid token !</Typography.Title>
          <p>
            Please try to
            <Link to="/login" className="text-caramel">
              Login
            </Link>
            , instead.
          </p>
        </div>
      )}
      {isSuccess && (
        <div>
          <Typography.Title level={4}>
            Account verified successfully !
          </Typography.Title>
          <p>
            Click here to{" "}
            <Link to="/login" className="text-caramel">
              Login
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
};

export default VerificationStatus;
