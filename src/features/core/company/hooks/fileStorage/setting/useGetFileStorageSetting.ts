import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TFileStorageSetting } from "features/core/company/types/fileStorage/fileStorageSetting";

export const QUERY_KEY_FOR_FILE_STORAGE_SETTING = "file-storage-setting";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TFileStorageSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/file-storage/setting`;

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

export const useGetFileStorageSetting = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_FILE_STORAGE_SETTING],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
