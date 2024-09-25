import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TGradeData = {
  name: string;
  categoryId: number;
  grossPay: number;
  leaveLength?: number;
};
const createData = async (props: {
  data: TGradeData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/grade`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TGradeData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreatePayGrade = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TGradeData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
