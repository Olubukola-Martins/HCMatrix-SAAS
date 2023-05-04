import axios from "axios";
import { ICreateInvitedEmpProps } from "../types";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const verifyEmployeeInvite = async (props: ICreateInvitedEmpProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/invite/verification?token=${props.token}&uid=${props.uid}`;
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

export const useVerifyEmployeeInvite = () => {
  return useMutation(verifyEmployeeInvite);
};
