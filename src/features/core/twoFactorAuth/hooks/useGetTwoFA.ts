import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { IGetTwoFAProps,} from "../types";

export const QUERY_KEY_FOR_CHECK_OTP = "CHECK_OTP";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<IGetTwoFAProps> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/totp`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const ans: IGetTwoFAProps = res.data.data;

  return ans;
};

export const useGetTwoFA = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery([QUERY_KEY_FOR_CHECK_OTP], () =>
    getData({
      auth: { token, companyId },
    })
  );

  return queryData;
};
