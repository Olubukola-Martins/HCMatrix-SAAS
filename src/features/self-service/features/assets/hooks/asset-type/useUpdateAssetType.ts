import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  id: number;
  data: {
    name: string;
  };
};

const updateAssetType = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset/type/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = props.data.data;

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateAssetType = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    updateAssetType({ data: props, auth: { token, companyId } })
  );
};
