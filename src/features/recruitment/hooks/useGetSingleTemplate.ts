import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ITemplateData } from "../settings/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

interface IDataProps extends ICurrentCompany {
  templateEndpointUrl: string;
  itemId: number;
}

interface ISingleTemplate {
  templateEndpointUrl: string;
  itemId: number;
  queryKey: string;
}

const getData = async (props: IDataProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/${props.templateEndpointUrl}/${props.itemId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;
  const data: ITemplateData = { ...item };
  return data;
};

export const useGetSingleTemplate = ({
  itemId,
  templateEndpointUrl,
  queryKey,
}: ISingleTemplate) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [queryKey, itemId],
    () => getData({ templateEndpointUrl, itemId, companyId, token }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
