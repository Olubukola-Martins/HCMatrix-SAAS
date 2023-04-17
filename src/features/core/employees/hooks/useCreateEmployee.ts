import axios from "axios";
import { ICreateEmpProps } from "../types";
import { useMutation } from "react-query";

export const createEmployee = async (props: ICreateEmpProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = {
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    hasSelfService: props.hasSelfService,
    roleId: props.roleId,
    designationId: props.designationId,
    empUid: props.empUid,
    jobInformation: {
      startDate: props.jobInformation.startDate,
      monthlyGross: props.jobInformation.monthlyGross,
      employmentType: props.jobInformation.employmentType,
      workModel: props.jobInformation.workModel,
      numberOfDaysPerWeek: props.jobInformation.numberOfDaysPerWeek,
      lineManagerId: props.jobInformation.lineManagerId,
    },
  };
  if (!props.empUid) delete data["empUid"];
  if (!props.jobInformation.lineManagerId)
    delete data["jobInformation"]["lineManagerId"];

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateEmployee = () => {
  return useMutation(createEmployee);
};
