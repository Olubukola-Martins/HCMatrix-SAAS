import React, { useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { o365MicrosoftRedirectUrl } from "../../ApiRequesHelpers/Auth";
import { useQuery } from "react-query";
import { openNotification } from "../../NotificationHelpers";
import { Form, Input, Modal, Select, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import {
  GlobalContext,
  EGlobalOps,
} from "../../Contexts/GlobalContextProvider";
import {
  TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_EXPIRES_IN,
} from "../../Config/refreshTokenApi";
import { IAuthDets } from "../../AppTypes/Auth";
import { useFetchIndustries } from "APIRQHooks/Utility/industryHooks";
import { BankOutlined } from "@ant-design/icons";
import { useCreateCompanyFromSocialAuth } from "APIRQHooks/Utility/companyHooks";
import Button from "GeneralComps/Button";

const MicrosoftVerificationStatus = ({
  code,
  client_info,
  session_state,
}: {
  code: string;
  session_state: string;
  client_info: string;
}) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch: globalDispatch } = globalCtx;
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const [tempAuthState, setTempAuthState] = useState<{
    state: IAuthDets;
    refreshToken: string;
  }>();

  const navigate = useNavigate();
  const signIn = useSignIn();
  const { isError, isSuccess } = useQuery(
    "user-auth-details",
    () => o365MicrosoftRedirectUrl({ code, client_info, session_state }),
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
        // if they don't have or belong to a company, show them modal to create a company
        // and then on the success of creating a company append that company and then log them in
        if (result.payload.length === 0) {
          setShowCreateCompanyModal(true);
          setTempAuthState({
            state: authUserDetails,
            refreshToken: result.refreshToken,
          });
          return;
        }

        // do this if user has/ belongs to a company
        if (
          signIn({
            token: result.accessToken,
            refreshToken: result.refreshToken,
            expiresIn: TOKEN_EXPIRES_IN, //log person out after 2 hrs
            refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_IN, //should not expire
            // expiresIn: process.env.REACT_APP_SESSION_TIME as unknown as number,
            // refreshTokenExpireIn: process.env
            //   .REACT_APP_SESSION_TIME as unknown as number,
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
  const { mutate, isLoading } = useCreateCompanyFromSocialAuth();
  const {
    data: industries,

    isSuccess: isISuccess,
  } = useFetchIndustries();
  const handleFinish = (data: any) => {
    if (tempAuthState) {
      mutate(
        {
          industryId: data.industryId,
          name: data.name,
          phoneNumber: data.phoneNumber,
          token: tempAuthState.state.userToken,
        },
        {
          onSuccess: (res) => {
            const item = res.data.data;
            console.log("SOCIAL COMP", res);
            const authUserDetails: IAuthDets = {
              ...tempAuthState.state,
              companies: [
                {
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
                },
              ],
            };
            if (
              signIn({
                token: authUserDetails.userToken,
                refreshToken: tempAuthState.refreshToken,
                expiresIn: TOKEN_EXPIRES_IN, //log person out after 2 hrs
                refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_IN, //should not expire
                // expiresIn: process.env.REACT_APP_SESSION_TIME as unknown as number,
                // refreshTokenExpireIn: process.env
                //   .REACT_APP_SESSION_TIME as unknown as number,
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
              setShowCreateCompanyModal(false);
            }
          },
          onError: (err: any) => {
            console.log("SOCIAL ERR", err);

            openNotification({
              state: "error",
              title: "Error Occurred",
              description:
                err?.response.data.message ?? err?.response.data.error.message,
            });
          },
        }
      );
    }
  };
  return (
    <div>
      <Modal
        open={true}
        // open={showCreateCompanyModal && isISuccess}
        footer={null}
        style={{ top: 20 }}
        title={`Create a company`}
        closable={false}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item name={"name"} label="Company name">
            <Input placeholder="Company name" />
          </Form.Item>
          <Form.Item name={"phoneNumber"} label="Phone">
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name={"industryId"} label="Industry">
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              className="authSelectTag"
              placeholder={
                <div className="flex justify-start items-center">
                  <BankOutlined className="site-form-item-icon pr-1 text-black" />
                  &nbsp; Industry
                </div>
              }
              style={{ width: "100%" }}
            >
              {isISuccess &&
                industries.map(({ name, id }) => (
                  <Select.Option
                    key={id}
                    value={id}
                    className="py-2"
                    label={
                      <div className="flex justify-start items-center">
                        <BankOutlined className="site-form-item-icon pr-1 text-black" />
                        &nbsp;
                        {name}
                      </div>
                    }
                  >
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button isLoading={isLoading} type="submit" />
          </Form.Item>
        </Form>
      </Modal>
      {!isError && !isSuccess && (
        <LoadingOutlined className="text-4xl text-green-700" />
      )}
      {isError && (
        <div>
          <Typography.Title level={4}>Invalid token !</Typography.Title>
          <p>
            Please try to{" "}
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

export default MicrosoftVerificationStatus;
