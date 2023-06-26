import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TFileAccessListItem } from "../../../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_ALL_ACCESSES_TO_A_FILE = "accesses-to-a-file";

const getData = async (props: {
  data: IGetDataProps;
  folderId: number;
  fileId: number;
  auth: ICurrentCompany;
}): Promise<{ data: TFileAccessListItem[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.folderId}/file/${props.fileId}/access`;

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

  const data: TFileAccessListItem[] = result.map(
    (item: TFileAccessListItem): TFileAccessListItem => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetFolders = (props: {
  data: IGetDataProps;
  folderId: number;
  fileId: number;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props.data;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_ALL_ACCESSES_TO_A_FILE,
      props.folderId,
      pagination,
      searchParams,
    ],
    () =>
      getData({
        folderId: props.folderId,
        fileId: props.fileId,
        auth: { token, companyId },
        data: {
          ...props.data,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
