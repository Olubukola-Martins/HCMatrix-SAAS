import React, { useState } from "react";
import logo from "Layout/Images/logo2.png";
import { Form, Spin, Steps } from "antd";
import { CreatePassword } from "Auth/Components/InvitedEmployee/CreatePassword";
import { PersonalInfo } from "Auth/Components/InvitedEmployee/PersonalInfo";
import { openNotification } from "NotificationHelpers";
// import { ICreateInvitedEmpProps } from "ApiRequesHelpers/Utility/employee";
import { IAuthDets } from "AppTypes/Auth";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import {
  REFRESH_TOKEN_EXPIRES_IN,
  TOKEN_EXPIRES_IN,
} from "Config/refreshTokenApi";
import { useMutation, useQueryClient } from "react-query";
import {
  ICreateInvitedEmpProps,
  verifyEmployeeInvite,
} from "ApiRequesHelpers/Auth/employees";
import { useSearchParams } from "react-router-dom";
export interface stepperInputProps {
  onFinished: any;
  initialValues: any;
  setCurrent?: any;
}
export const InvitedEmployeeForm = () => {
  const isAuthenticated = useIsAuthenticated();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const uid = searchParams.get("uid") ?? "";
  const email = searchParams.get("email") ?? "";
  const [current, setCurrent] = useState(0);
  const [accountDetails, setAccountDetails] = useState<null>(null);
  const [profileDetails, setProfileDetails] = useState<null>(null);
  const [form] = Form.useForm();
  const signIn = useSignIn();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(verifyEmployeeInvite);

  const onFinishLoginForm = (values: React.SetStateAction<null>) => {
    setAccountDetails(values);
    setCurrent(1);
  };
  const onFinishProfileForm = (values: React.SetStateAction<null>) => {
    setProfileDetails(values);
    console.log(profileDetails);
    
    // const props: ICreateInvitedEmpProps = {
    //   token,
    //   uid,
    //   password: data.password,
    //   confirmPassword: data.confirmPassword,
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   personalInformation: {
    //     dob: data.personalInformation.dob,
    //     gender: data.personalInformation.gender,
    //     phoneNumber: data.personalInformation.phoneNumber,
    //     eligibility: data.personalInformation.eligibility,
    //     maritalStatus: data.personalInformation.maritalStatus,
    //     nationality: data.personalInformation.nationality,
    //     address: {
    //       streetAddress: data.personalInformation.address.streetAddress,
    //       countryId: data.personalInformation.address.countryId,
    //       stateId: data.personalInformation.address.stateId,
    //       lgaId: data.personalInformation.address.lgaId,
    //       timezone: data.personalInformation.address.timezone,
    //     },
    //     passportExpirationDate: data.personalInformation.passportExpirationDate,
    //     validDocumentUrl: data.personalInformation.validDocumentUrl,
    //   },
    // };

    // mutate(props, {
    //   onError: (err: any) => {
    //     openNotification({
    //       state: "error",
    //       title: "Error Occurred",
    //       description:
    //         err?.response.data.message ?? err?.response.data.error.message,
    //     });
    //   },
    //   onSuccess: (res: any) => {
    //     const result = res.data.data;
    //     const authUserDetails: IAuthDets = {
    //       user: result.user,
    //       companies: result?.payload,
    //       userToken: result.accessToken,
    //     };
    //     if (
    //       signIn({
    //         token: result.accessToken,
    //         refreshToken: result.refreshToken,
    //         expiresIn: TOKEN_EXPIRES_IN, //log person out after 2 hrs
    //         refreshTokenExpireIn: REFRESH_TOKEN_EXPIRES_IN, //should not expire
    //         tokenType: "Bearer",
    //         authState: authUserDetails,
    //       })
    //     )
    //       openNotification({
    //         state: "success",
    //         title: "Success",
    //         description: res.data.message,
    //         // duration: 0.4,
    //       });

    //     form.resetFields();
    //     queryClient.invalidateQueries({
    //       queryKey: ["invitedEmployeeAccount"],
    //       exact: true,
    //     });
    //   },
    // });
  };

  // const onFormSubmit = (data: any) => {

  // };

  const forms = [
    <CreatePassword
      onFinished={onFinishLoginForm}
      initialValues={accountDetails}
    />,
    <PersonalInfo
      setCurrent={setCurrent}
      onFinished={onFinishProfileForm}
      initialValues={profileDetails}
    />,
  ];
  const isStepDisabled = (stepNumber: number) => {
    if (stepNumber === 0) {
      return false;
    }
    if (stepNumber === 1) {
      return accountDetails === null;
    }
    if (stepNumber === 2) {
      return accountDetails === null || profileDetails === null;
    }
  };

  return (
    <div className="Container">
      <div className="flex justify-center">
        <div
          className="bg-white rounded-md my-7 p-5"
          style={{
            boxShadow:
              "0 2px 5px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)",
          }}
        >
          <div className="mb-5">
            <img src={logo} alt="logo" className="h-10" />
          </div>

          <Steps
            style={{ padding: "32px 16px" }}
            onChange={setCurrent}
            current={current}
          >
            <Steps.Step disabled={isStepDisabled(0)} title="Create Password" />
            <Steps.Step
              disabled={isStepDisabled(1)}
              title="Personal Information"
            />
            <Steps.Step disabled={isStepDisabled(2)} title="Finish" />
          </Steps>
          {forms[current]}
        </div>
      </div>
    </div>
  );
};
