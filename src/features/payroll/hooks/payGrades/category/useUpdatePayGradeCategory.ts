import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCategoryData = {
  id: number;
  body: {
    name: string;
    minGrossPay: number;
    maxGrossPay: number;
  };
};
const createData = async (props: {
  data: TCategoryData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/grade/category/${props.data.id}`;
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
export const useUpdatePayGradeCategory = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCategoryData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
