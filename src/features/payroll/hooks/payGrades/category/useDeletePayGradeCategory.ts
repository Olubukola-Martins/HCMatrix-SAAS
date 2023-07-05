import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCategoryData = {
  id: number;
};
const delData = async (props: {
  data: TCategoryData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/pay-grade/category/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeletePayGradeCategory = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCategoryData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
