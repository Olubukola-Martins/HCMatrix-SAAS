import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TFileListItem } from "../../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_FILES_IN_A_FOLDER = "files-in-a-folder";

const getData = async (props: {
  data: IGetDataProps;
  folderId: number;
  auth: ICurrentCompany;
}): Promise<{ data: TFileListItem[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.folderId}/file`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TFileListItem[] = result.map(
    (item: TFileListItem): TFileListItem => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetFilesInFolder = (props: {
  data: IGetDataProps;
  folderId: number;
}) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_FILES_IN_A_FOLDER, props],
    () =>
      getData({
        folderId: props.folderId,
        auth: { token, companyId },
        data: {
          ...props.data,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
      enabled: !!props.folderId,
    }
  );

  return queryData;
};
