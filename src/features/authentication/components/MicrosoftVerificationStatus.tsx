import { useContext, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { Form, Input, Modal, Select, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { BankOutlined } from "@ant-design/icons";
import { AppButton } from "components/button/AppButton";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { TOKEN_EXPIRES_IN } from "config/refreshTokenApi";
import { useFetchIndustries } from "hooks/useFetchIndutries";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { openNotification } from "utils/notifications";
import { useCreateCompanyFromSocialAuth } from "../hooks/useCreateCompanyFromSocialAuth";
import { o365MicrosoftRedirectUrl } from "../hooks/useO365MicrosoftRedirectUrl";
import { IAuthDets } from "../types";
import { appRoutes } from "config/router/paths";
import { saveMessagingDeviceToken } from "config/firebase/messaging";

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
  const { dispatch: globalDispatch } = globalCtx;
  const [showCreateCompanyModal, setShowCreateCompanyModal] = useState(false);
  const [tempAuthState, setTempAuthState] = useState<{
    state: IAuthDets;
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
      onSuccess: (res) => {
        const result = res.data;

        const authUserDetails: IAuthDets = {
          user: result?.user,
          companies: result?.payload,
          userToken: result.accessToken,
        };
        // if they don't have or belong to a company, show them modal to create a company
        // and then on the success of creating a company append that company and then log them in
        if (result.payload.length === 0) {
          setShowCreateCompanyModal(true);
          setTempAuthState({
            state: authUserDetails,
          });
          return;
        }

        // do this if user has/ belongs to a company
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
            description: res.message,
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
          navigate(appRoutes.home);
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
    const phoneNumber = `${data.phone.code}-${data.phone.number}`;

    if (tempAuthState) {
      mutate(
        {
          industryId: data.industryId,
          name: data.name,
          phoneNumber: phoneNumber,
          token: tempAuthState.state.userToken,
        },
        {
          onSuccess: (res) => {
            const item = res.data;
            const authUserDetails: IAuthDets = {
              ...tempAuthState.state,
              companies: [item],
            };
            if (
              signIn({
                token: authUserDetails.userToken,
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
              saveMessagingDeviceToken({
                employeeId: authUserDetails.companies[0].id,
                companyId: authUserDetails.companies[0].company.id,
                token: authUserDetails.userToken,
              });
              setShowCreateCompanyModal(false);
            }
          },
          onError: (err: any) => {
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
        open={showCreateCompanyModal && isISuccess}
        footer={null}
        style={{ top: 20 }}
        title={`Create a company`}
        closable={false}
      >
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item name={"name"} label="Company name">
            <Input placeholder="Company name" />
          </Form.Item>
          <FormPhoneInput Form={Form} />
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
            <AppButton isLoading={isLoading} type="submit" />
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
