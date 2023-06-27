import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSingleFile } from "../../types";

interface IDataProps {
  folderId: number;
  fileId: number;
}
export const QUERY_KEY_FOR_SINGLE_FILE_IN_A_FOLDER = "single-file-in-a-folder";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSingleFile> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.data.folderId}/file/${props.data.fileId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleFile = res.data.data;

  const data: TSingleFile = {
    ...item,
  };

  return data;
};

export const useGetCompany = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_FILE_IN_A_FOLDER],
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
