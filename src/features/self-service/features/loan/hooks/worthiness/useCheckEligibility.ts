import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import {
  ICheckEligibility,
  ICheckEligibilityProps,
} from "../../types/worthiness";

export const QUERY_KEY_FOR_CHECK_ELIGIBILITY = "CHECK_ELIGIBILITY";

export const getData = async (props: {
  data: ICheckEligibilityProps;
  auth: ICurrentCompany;
}): Promise<ICheckEligibility> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/eligibility`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const payload: any = {
    ...props.data,
  };

  const res = await axios.post(url, payload, config);
  const item: ICheckEligibility = res.data.data;
  const data: ICheckEligibility = {
    ...item,
  };

  return data;
};

export const useCheckEligibility = (data: ICheckEligibilityProps) => {
  const { token, companyId } = useApiAuth();
  const canMakeRequest = () => {
    if (typeof data.amount !== "number") {
      return false;
    }
    if (typeof data.paymentPlanId !== "number") {
      return false;
    }
    if (typeof data.typeId !== "number") {
      return false;
    }
    return true;
  };
  const queryData = useQuery(
    [QUERY_KEY_FOR_CHECK_ELIGIBILITY, data],
    () => getData({ data, auth: { token, companyId } }),
    {
      enabled: canMakeRequest(),
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

// ==============

// import axios from "axios";
// import { useQuery } from "react-query";
// import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
// import { useApiAuth } from "hooks/useApiAuth";
// import { ICurrentCompany } from "types";
// import { IEligibilityCriteriaProps } from "../../../types/setting";

// export const QUERY_KEY_FOR_GET_ELIGIBILITY_CRITERIA = "GET_ELIGIBILITY_CRITERIA";

// const getData = async (
//   props: ICurrentCompany
// ): Promise<IEligibilityCriteriaProps> => {
//   const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/eligibility`;
//   const config = {
//     headers: {
//       Accept: "application/json",
//       Authorization: `Bearer ${props.token}`,
//       "x-company-id": props.companyId,
//     },
//   };
//   const res = await axios.get(url, config);
//   const item: IEligibilityCriteriaProps = res.data.data;
//   const data: IEligibilityCriteriaProps = {
//     ...item,
//   };

//   return data;
// };
// export const useCheckEligibility = () => {
//   const { companyId, token } = useApiAuth();
//   const queryData = useQuery(
//     [QUERY_KEY_FOR_GET_ELIGIBILITY_CRITERIA],
//     () => getData({ token, companyId }),
//     {
//       onError: (err: any) => {},
//       onSuccess: (data) => {},
//     }
//   );

//   return queryData;
// };
