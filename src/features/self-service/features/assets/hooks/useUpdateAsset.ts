import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TBody = {
  name: string;
  typeId: number;
  status?: "assigned" | "unassigned" | "under-repair" | "condemned";
  imageUrl?: string;
  uid?: string;
  serialNumber?: string;
  brand?: string;
  model?: string;
  vendor?: string;
  color?: string;
  assigneeId?: string;
  documentUrls?: string[];
  dateAssigned?: string;
  description?: string;
  purchaseDate?: string;
  cost?: number;
};
type TCreateProps = {
  body: TBody;
  id: number;
};

const updateAsset = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TBody = {
    ...props.data.body,
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
