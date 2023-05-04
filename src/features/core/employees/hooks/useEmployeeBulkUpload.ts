import axios from "axios";
import { useMutation } from "react-query";
import { IBulkEmployeeUploadProps } from "../types";

export const employeeBulkUpload = async (props: IBulkEmployeeUploadProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/bulk`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data = props.data.map((item) => ({
    firstName: item.personalInformation?.firstName,
    lastName: item.personalInformation?.lastName,
    email: item.employeeInformation.email,
    hasSelfService: item.employeeInformation.hasSelfService,
    empUid: item.employeeInformation.empUid,
    personalInformation: {
      dob: item.personalInformation?.dob,
      gender: item.personalInformation?.gender,
      phoneNumber: item.personalInformation?.alternativePhoneNumber,
      eligibility: item.personalInformation?.eligibility,
      maritalStatus: item.personalInformation?.maritalStatus,
      nationality: item.personalInformation?.nationality,
      passportExpirationDate: item.personalInformation?.passportExpirationDate,
      alternativeEmail: item.personalInformation?.alternativeEmail,
      alternativePhoneNumber: item.personalInformation?.alternativePhoneNumber,
      nin: item.personalInformation?.nin,
      taxId: item.personalInformation?.taxId,
      taxAuthority: item.personalInformation?.taxAuthority,
    },
    finance: [
      {
        key: "wallet",
        wallet: {
          accountProvider: item.walletInformation?.accountProvider,
          accountNumber: item.walletInformation?.accountNumber,
        },
      },
      {
        key: "bank",
        bank: {
          bankName: item.bankInformation?.bankName,
          accountNumber: item.bankInformation?.accountNumber,
          bvn: item.bankInformation?.bvn,
        },
      },
      {
        key: "pension",
        pension: {
          fundAdministrator: item.pensionInformation?.fundAdministrator,
          accountNumber: item.pensionInformation?.accountNumber,
          pensionType: item.pensionInformation?.pensionType,
        },
      },
    ],
    emergencyContact: {
      fullName: item.emergencyContact?.fullName,
      address: item.emergencyContact?.address,
      relationship: item.emergencyContact?.relationship,
      phoneNumber: item.emergencyContact?.phoneNumber,
    },
  }));

  const response = await axios.post(url, data, config);
  return response;
};

export const useEmployeeBulkUpload = () => {
  return useMutation(employeeBulkUpload);
};
