import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { ProfileEditRequest } from "../types";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_MONEY_REQUISITION =
  "single-profile-edit-requeest";
const getData = async (props: IGetDataProps): Promise<ProfileEditRequest> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/profile-edit-request/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: ProfileEditRequest = res.data.data;

  const data: ProfileEditRequest = {
    ...item,
  };

  return data;
};

export const useGetProfileEditRequestById = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_MONEY_REQUISITION, props.id],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
