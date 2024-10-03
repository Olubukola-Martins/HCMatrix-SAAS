import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  pagination?: IPaginationProps;
  billingHistoryId: number;
}

export const QUERY_KEY_FOR_EMPLOYEE_LICENSE_BILLING_HISTORY =
  "employee-license-billing-history";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TEmployeeLicenseBillingHistory[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/billing/history/${props.data.billingHistoryId}/employee/license`;

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

  const data: TEmployeeLicenseBillingHistory[] = result.map(
    (item: TEmployeeLicenseBillingHistory): TEmployeeLicenseBillingHistory => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGeTEmployeeLicenseBillingHistory = ({
  props,
}: {
  props: IGetDataProps;
}) => {
  const { token, companyId } = useApiAuth();

  const { pagination } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_EMPLOYEE_LICENSE_BILLING_HISTORY, pagination],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

export type TEmployeeLicenseBillingHistory = {
  id: number;
  companySubscriptionId: number;
  employeeId: number;
  licenseType: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};

interface Employee {
  id: number;
  empUid: string;
  firstName: string;
  lastName: string;
  designation: Designation | null;
}

interface Designation {
  id: number;
  name: string;
  department: Department;
}

interface Department {
  id: number;
  name: string;
}
