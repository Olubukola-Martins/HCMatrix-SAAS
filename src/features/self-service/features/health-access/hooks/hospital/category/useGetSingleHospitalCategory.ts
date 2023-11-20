import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { THospitalCategory } from "../../../types/hospital/category";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_HOSPITAL_CATEGORY =
  "single-hospital-category";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<THospitalCategory> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital/category/${props.data.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: THospitalCategory = res.data.data;

  const data: THospitalCategory = {
    ...item,
  };

  return data;
};

export const useGetSingleHospitalCategory = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_HOSPITAL_CATEGORY, props.id],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
