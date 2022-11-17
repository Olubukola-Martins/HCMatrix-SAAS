import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { IVerifyUserProps, verifyUserToken } from "../../ApiRequesHelpers/Auth";
import { useQuery } from "react-query";
import { openNotification } from "../../NotificationHelpers";
import { Typography } from "antd";
import { Link } from "react-router-dom";

const VerificationStatus = ({ token, uid }: IVerifyUserProps) => {
  const { data, isError, isFetching, isSuccess } = useQuery(
    "validate-user-token",
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
      onSuccess: (data: any) => {
        openNotification({
          state: "success",

          title: "Success",
          description: "Email address verified !",
          // duration: 0.4,
        });
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
