import { ICurrentCompany } from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { ISearchParams } from "AppTypes/Search";
import axios from "axios";
import { useQuery } from "react-query";
import { TVehicleStatus, TVehicleType } from "./useCreateVehicle";
import { MICROSERVICE_ENDPOINTS } from "Constants/enviroment";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export type TVehicle = {
  id: number;
  label: string;
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  status: TVehicleStatus;
  imageUrl: string;
  cost: string;
  color: string;
  description: string;
  purchaseDate: string;
  assigneeId: number;
  dateAssigned: string;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
};

export const QUERY_KEY_FOR_VEHICLES = "vehicles";

const getVehicles = async (
  props: IGetDataProps
): Promise<{ data: TVehicle[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TVehicle[] = result.map(
    (item: TVehicle): TVehicle => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchVehicles = (props: IGetDataProps) => {
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_VEHICLES,
      pagination?.current,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getVehicles({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
