import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSingleFolder } from "../types";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_FOLDER = "single-folder";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSingleFolder> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleFolder = res.data.data;

  const data: TSingleFolder = {
    ...item,
  };

  return data;
};

export const useGetCompany = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_FOLDER],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
