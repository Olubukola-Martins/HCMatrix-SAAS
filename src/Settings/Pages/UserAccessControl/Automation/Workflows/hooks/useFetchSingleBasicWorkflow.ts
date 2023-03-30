import { ICurrentCompany } from "AppTypes/DataEntitities";

import axios from "axios";
import { useApiAuth } from "Hooks/useApiAuth";
import { useQuery } from "react-query";
import { TBasicWorkflow, TBasicWorkflowStage } from "./useCreateBasicWorkflow";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  id: number;
}

const getSingleBasicWorkflow = async (
  props: IGetDataProps & ICurrentCompany
): Promise<TBasicWorkflow> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const stages = item?.stages?.map(
    (item: any): TBasicWorkflowStage => ({
      name: item.name,
    })
  );

  const data: TBasicWorkflow = {
    id: item.id,
    name: item.name,
    stages,
  };
  return data;
};

export const useFetchSingleBasicWorkflow = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    ["single-basic-workflow", props.id],
    () =>
      getSingleBasicWorkflow({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
