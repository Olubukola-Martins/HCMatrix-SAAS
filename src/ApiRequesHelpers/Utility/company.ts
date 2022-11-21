import axios from "axios";

const token = localStorage.getItem("hcmatrix_app") as unknown as string;

export interface ICreateCompProps {
  name: string;
  email: string;
  phoneNumber: string;
  industryId: number;
  customerFullName: string;
  password: string;
  confirmPassword: string;
}
export const createCompany = async (props: ICreateCompProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company`;

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props;

  const response = await axios.post(url, data);
  return response;
};
