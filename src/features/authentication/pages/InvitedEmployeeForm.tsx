import { useState } from "react";
import logo from "../../../assets/images/logo2.png";
import { Form, Steps } from "antd";

import { useIsAuthenticated } from "react-auth-kit";

import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useVerifyEmployeeInvite } from "../hooks/useVerifyEmployeeInvite";
import { openNotification } from "utils/notifications";
import { CreatePassword } from "../components/InvitedEmployee/CreatePassword";
import { PersonalInfo } from "../components/InvitedEmployee/PersonalInfo";
import { ICreateInvitedEmpProps } from "../types";

export const InvitedEmployeeForm = () => {
  const isAuthenticated = useIsAuthenticated();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const uid = searchParams.get("uid") ?? "";
  const email = searchParams.get("email") ?? "";
  const [current, setCurrent] = useState(0);
  const [accountDetails, setAccountDetails] = useState<any>({});
  const [profileDetails, setProfileDetails] = useState<null>(null);
  const [form] = Form.useForm();
  const { mutate, isLoading } = useVerifyEmployeeInvite();
  const navigate = useNavigate();
  const onFinishLoginForm = (values: any) => {
    setAccountDetails(values);
    setCurrent(1);
  };
  const onFinishProfileForm = (data: any) => {
    const props: ICreateInvitedEmpProps = {
      token,
      uid,
      password: accountDetails.password,
      confirmPassword: accountDetails.confirmPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      personalInformation: {
        dob: data.dob.format("YYYY-MM-DD"),
        gender: data.gender,
        phoneNumber: `${data.phone.code}-${data.phone.number}`,
        eligibility: data.eligibility,
        maritalStatus: data.maritalStatus,
        nationality: "Nigeria",
        address: {
          streetAddress: data.streetAddress,
          countryId: data.countryId,
          stateId: data.stateId,
          lgaId: data.lgaId,
          timezone: data.timezone,
        },
        passportExpirationDate: data.passportExpirationDate,
        validDocumentUrl: data.validDocumentUrl,
      },
    };

    mutate(props, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res.data.message,
        });

        form.resetFields();
        const url = `/login?email=${email}&password=${accountDetails.password}`;
        navigate(url, { replace: true });
      },
    });
  };

  const forms = [
    <CreatePassword
      onFinished={onFinishLoginForm}
      initialValues={accountDetails}
      email={email}
    />,
    <PersonalInfo
      setCurrent={setCurrent}
      onFinished={onFinishProfileForm}
      initialValues={profileDetails}
      isLoading={isLoading}
      form={form}
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
    <>
      {isAuthenticated() && <Navigate to="/" replace={true} />}

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
              <Steps.Step
                disabled={isStepDisabled(0)}
                title="Create Password"
              />
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
    </>
  );
};
