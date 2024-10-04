import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyEmployeeWithLicense } from "features/billing/types/company/employeeLicense/companyWithLicense";

interface IGetDataProps {
  pagination?: IPaginationProps;
}

export const QUERY_KEY_FOR_ALL_EMPLOYEES_WITH_LICENSES =
  "all-employees-with-licenses";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TCompanyEmployeeWithLicense[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/employee/license`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TCompanyEmployeeWithLicense[] = result.map(
    (item: TCompanyEmployeeWithLicense): TCompanyEmployeeWithLicense => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllEmployeesWithLicense = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const { pagination } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ALL_EMPLOYEES_WITH_LICENSES, pagination],
    () =>
      getData({
        auth: { token, companyId },
        data: props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
