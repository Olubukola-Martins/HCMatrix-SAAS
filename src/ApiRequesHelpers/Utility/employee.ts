import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";

const token = localStorage.getItem("hcmatrix_app") as unknown as string;

export interface ICreateEmpProps extends ICurrentCompany {
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  designationId: number;
  jobInformation: {
    startDate: string;
    jobTitle: string;
    monthlyGross: number;
    employmentType: string;
    workModel: string;
    numberOfDaysPerWeek: number;
    departmentId: string;
  };
}
export const createEmployee = async (props: ICreateEmpProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props;

  const response = await axios.post(url, data, config);
  return response;
};

export const getEmployees = async () => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee`;

  const response = await axios.get(url);
  return response;
};
