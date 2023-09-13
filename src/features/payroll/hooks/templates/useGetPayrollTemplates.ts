import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import {
  TPayrollTemplate,
  TPayrollTemplateListData,
  TPayrollTemplateType,
} from "features/payroll/types/template";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_PAYROLL_TEMPLATES = "payroll-templates";

const getData = async (props: {
  type: TPayrollTemplateType;
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{
  data: TPayrollTemplateListData[];
  total: number;
}> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/template/${props.type}`;

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

  const data: TPayrollTemplateListData[] = result.map(
    (item: TPayrollTemplate): TPayrollTemplate => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetPayrollTemplates = (props: {
  data: IGetDataProps;
  type: TPayrollTemplateType;
}) => {
  const { token, companyId } = useApiAuth();

  const { type } = props;
  const { pagination, searchParams } = props.data;
  const queryData = useQuery(
    [QUERY_KEY_FOR_PAYROLL_TEMPLATES, pagination, searchParams],
    () =>
      getData({
        auth: { token, companyId },
        type,
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
