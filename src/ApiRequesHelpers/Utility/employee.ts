import axios from "axios";

const token = localStorage.getItem("hcmatrix_app") as unknown as string;

export interface ICreateEmpProps {
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

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props;

  const response = await axios.post(url, data);
  return response;
};

export const getEmployees = async () => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee`;

  const response = await axios.get(url);
  return response;
};
