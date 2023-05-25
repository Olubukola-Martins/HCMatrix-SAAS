import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TRequisitionSetting, TRequistionType } from "../../types";

interface IGetDataProps extends ICurrentCompany {
  type: TRequistionType;
}
export const QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING =
  "single-requisition-setting";
const getData = async (props: IGetDataProps): Promise<TRequisitionSetting> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/setting/${props.type}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TRequisitionSetting = res.data.data;

  const data: TRequisitionSetting = {
    ...item,
  };

  return data;
};

export const useGetSingleRequisitionSetting = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_REQUISITION_SETTING, props.type],
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
