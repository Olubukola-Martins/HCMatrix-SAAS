import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyOwnerOrganogram } from "../../types/organogram/companyOwnerOrganogram";

interface IGetDataProps extends ICurrentCompany {}

export const QUERY_KEY_FOR_COMPANY_OWNER_ORGANOGRAM =
  "company-owner-organogram";
const getData = async (
  props: IGetDataProps
): Promise<TCompanyOwnerOrganogram> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/organogram`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanyOwnerOrganogram = res.data.data;

  const data: TCompanyOwnerOrganogram = {
    ...item,
  };

  return data;
};

export const useGetCompanyOwnerOrganogram = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_OWNER_ORGANOGRAM],
    () =>
      getData({
        companyId,
        token,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
