import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyEmployeeOrganogram } from "../../types/organogram/companyEmployeeOrganogram";

interface IGetDataProps extends ICurrentCompany {}

export const QUERY_KEY_FOR_COMPANY_OWNER_ORGANOGRAM =
  "company-employee-organogram";
const getData = async (
  props: IGetDataProps,
  employeeId?: number
): Promise<TCompanyEmployeeOrganogram> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/organogram/${employeeId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanyEmployeeOrganogram = res.data.data;

  const data: TCompanyEmployeeOrganogram = item;

  return data;
};

export const useGetCompanyEmployeeOrganogram = ({
  employeeId,
}: {
  employeeId?: number;
}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_OWNER_ORGANOGRAM, employeeId],
    () =>
      getData(
        {
          companyId,
          token,
        },
        employeeId
      ),
    {
      enabled: employeeId !== undefined,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
