import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  name: string;
};

const updateAsset = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateAsset = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    updateAsset({ data: props, auth: { token, companyId } })
  );
};
