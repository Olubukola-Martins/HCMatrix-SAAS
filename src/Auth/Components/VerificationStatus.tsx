import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { IVerifyUserProps, verifyUserToken } from "../../ApiRequesHelpers/Auth";
import { useQuery } from "react-query";
import { openNotification } from "../../NotificationHelpers";
import { Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSignIn } from "react-auth-kit";

const VerificationStatus = ({ token, uid }: IVerifyUserProps) => {
  const navigate = useNavigate();
  const signIn = useSignIn();
  const { data, isError, isFetching, isSuccess } = useQuery(
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
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res: any) => {
        const result = res.data.data;
        console.log("user", result);
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
          // the company information has to be saved in a general state to be accessible accross the app
          // result.payload has the companies
          navigate("/");
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

export default VerificationStatus;
