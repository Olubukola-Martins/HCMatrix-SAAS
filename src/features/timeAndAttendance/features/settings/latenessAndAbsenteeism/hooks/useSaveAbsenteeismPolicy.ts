import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAbsenteeismPolicy } from "../types";

type TData = {
  markAbsent: boolean;
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TAbsenteeismPolicy["reportFrequency"];
  reportToRoleId: 1;
};
const createData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TAbsenteeismPolicy> => {
  const { data, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/absenteeism-policy`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.put(url, data, config);
  const fetchedData: TAbsenteeismPolicy = res.data.data;
  return fetchedData;
};

export const useSaveAbsenteeismPolicy = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((data: TData) =>
    createData({ data, auth: { token, companyId } })
  );
};
