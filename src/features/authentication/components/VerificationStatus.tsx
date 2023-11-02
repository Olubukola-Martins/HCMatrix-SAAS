import { useContext } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "react-query";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { useSignIn } from "react-auth-kit";
import { TOKEN_EXPIRES_IN } from "config/refreshTokenApi";
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
      onSuccess: (res) => {
        const result = res.data;

        const authUserDetails: IAuthDets = {
          user: result.user,
          companies: result?.payload,
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
