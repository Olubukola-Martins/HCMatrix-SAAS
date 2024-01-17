import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TOnboarding, TOnboardingTask } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  id?: number;
}

export const QUERY_KEY_FOR_SINGLE_ONBOARDING = "single-onboarding";
const getSingleOnboarding = async (vals: {
  props: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<TOnboarding> => {
  const { props, auth } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data as unknown as TOnboarding;

  const data: TOnboarding = {
    ...item,
  };
  return data;
};

export const useFetchSingleOnboarding = (props: IGetDataProps) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_ONBOARDING, props.id],
    () =>
      getSingleOnboarding({
        props,
        auth: {
          companyId,
          token,
        },
      }),
    {
      enabled: !!props.id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
