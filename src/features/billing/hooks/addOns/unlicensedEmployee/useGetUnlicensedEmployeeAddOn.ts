import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { GeneralPrice } from "features/billing/types";

export const QUERY_KEY_FOR_UNLICENSED_EMPLOYEE_ADD_ON =
  "unlicensed-employee-add-on";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<{ data: TUnLicensedEmployeeAddOn[]; total: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/unlicensed-employee`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TUnLicensedEmployeeAddOn[] = result.map(
    (item: TUnLicensedEmployeeAddOn): TUnLicensedEmployeeAddOn => ({ ...item })
  );

  const ans = {
    data,
    total: data.length,
  };

  return ans;
};

export const useGetUnlicensedEmployeeAddOn = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_UNLICENSED_EMPLOYEE_ADD_ON],
    () =>
      getData({
        auth: { token, companyId },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

type TUnLicensedEmployeeAddOn = {
  id: number;
  name: string;
  label: string;
  type: "unlicensed-employee";
  description: null;
  trainingHours: null;
  createdAt: string;
  updatedAt: string;
  prices: GeneralPrice[];
};
