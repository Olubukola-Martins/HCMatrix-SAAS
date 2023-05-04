import { ICurrentCompany, TEmployee } from "AppTypes/DataEntitities";

import axios from "axios";
import { useApiAuth } from "Hooks/useApiAuth";
import { useQuery } from "react-query";
import { TBasicWorkflow } from "./useCreateBasicWorkflow";
import { IPaginationProps } from "AppTypes/Pagination";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination: IPaginationProps;
}

export type TListBasicWorkflow = Pick<TBasicWorkflow, "id" | "name"> & {
  numberOfStages: number;
  updatedAt: string;
  createdAt: string;
  lastModifiedBy: Pick<TEmployee, "id" | "firstName" | "lastName">;
};

const getBasicWorkflows = async (
  props: IGetDataProps & ICurrentCompany
): Promise<{ data: TListBasicWorkflow[]; total: number }> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TListBasicWorkflow[] = result.map(
    (item: any): TListBasicWorkflow => ({
      id: item.id,
      name: item.name,
      numberOfStages: item.numberOfStages,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      lastModifiedBy: {
        id: item.lastModifiedBy.id,
        firstName: item.lastModifiedBy.firstName,
        lastName: item.lastModifiedBy.lastName,
      },
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchAllBasicWorkflows = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    ["workflows", props.pagination],
    () =>
      getBasicWorkflows({
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
