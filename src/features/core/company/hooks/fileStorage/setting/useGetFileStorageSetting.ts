import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TFileStorageSetting } from "features/core/company/types/fileStorage/fileStorageSetting";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_FILE_STORAGE_SETTING = "file-storage-setting";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TFileStorageSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/task/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TFileStorageSetting = res.data.data;

  const data: TFileStorageSetting = {
    ...item,
  };

  return data;
};

export const useGetFileStorageSetting = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_FILE_STORAGE_SETTING],
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
