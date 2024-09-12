import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TGradeData = {
  id: number;
  body: {
    name: string;
    categoryId: number;
    grossPay: number;
  };
};
const createData = async (props: {
  data: TGradeData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/grade/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data.body,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdatePayGrade = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TGradeData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
