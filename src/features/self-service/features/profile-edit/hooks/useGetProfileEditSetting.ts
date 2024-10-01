import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { ProfileEditRequest } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

type ProfileEditRequestSetting = Record<
  ProfileEditRequest["category"],
  boolean
>;
interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_PROFILE_EDIT_SETTING = "profile-edit-setting";
const getData = async (
  props: IGetDataProps
): Promise<ProfileEditRequestSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/profile-edit-request/setting`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: ProfileEditRequestSetting = res.data.data;

  const data: ProfileEditRequestSetting = {
    ...item,
  };

  return data;
};

export const useGetProfileEditSetting = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_PROFILE_EDIT_SETTING],
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
