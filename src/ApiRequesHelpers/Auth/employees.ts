import axios from "axios";

export interface ICreateEmpProps {
  password: string;
  confirmPassword: string;
  token: string;
  uid: string;
}

export const createEmployeeAccount = async (props: ICreateEmpProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/user/verification/employee?token=${props.token}&uid=${props.uid}`;
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const data: any = {
    password: props.password,
    confirmPassword: props.confirmPassword,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export interface ICreateInvitedEmpProps {
  token: string;
  uid: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  personalInformation: {
    dob: string;
    gender: string;
    phoneNumber: string;
    eligibility: string;
    maritalStatus: string;
    nationality: string;
    address: {
      streetAddress: string;
      countryId: number;
      stateId: number;
      lgaId: number;
      timezone?: string;
    };
    passportExpirationDate?: string;
    validDocumentUrl?: string;
  };
}

export const verifyEmployeeInvite = async (props: ICreateInvitedEmpProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/invite/verification?token=${props.token}&uid=${props.uid}`;
  const config = {
    headers: {
      Accept: "application/json",
    },
  };
  const data = {
    password: props.password,
    confirmPassword: props.confirmPassword,
    firstName: props.firstName,
    lastName: props.lastName,
    personalInformation: {
      dob: props.personalInformation.dob,
      gender: props.personalInformation.gender,
      phoneNumber: props.personalInformation.phoneNumber,
      eligibility: props.personalInformation.eligibility,
      maritalStatus: props.personalInformation.maritalStatus,
      nationality: props.personalInformation.nationality,
      address: {
        streetAddress: props.personalInformation.address.streetAddress,
        countryId: props.personalInformation.address.countryId,
        stateId: props.personalInformation.address.stateId,
        lgaId: props.personalInformation.address.lgaId,
        timezone: props.personalInformation.address.timezone,
      },
      passportExpirationDate: props.personalInformation.passportExpirationDate,
      validDocumentUrl: props.personalInformation.validDocumentUrl,
    },
  };

  const response = await axios.post(url, data, config);
  return response;
};
