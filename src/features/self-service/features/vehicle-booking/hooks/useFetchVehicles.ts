import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TVehicleType, TVehicleStatus } from "./useCreateVehicle";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TLicenseType } from "features/authentication/types/auth-user";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TVehicleStatus | TVehicleStatus[];
}

// TO DO: Refactor this types to exist in the types folder
export type TVehicle = {
  id: number;
  label: string;
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  status: TVehicleStatus;
  imageUrl: string;
  cost: number;
  color: string;
  description: string;
  purchaseDate: string;
  assigneeId: number;
  assignee?: TVehicleAssignee;
  dateAssigned: string;
  documentUrls?: string[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
  maintenance: TVehicleMaintenance[];
  repairs: TVehicleRepair[];
  documents: TVehicleDocument[];
  assigneeHistory: TVehicleAssigneeHistory[];
};

export interface TVehicleAssigneeHistory {
  id: number;
  vehicleId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned: string;
  duration: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  assignee: TVehicleAssignee;
}

export interface TVehicleAssignee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

export interface TVehicleDocument {
  id: number;
  vehicleId: number;
  type: string;
  issueDate: string;
  expiryDate: string;
  reminderDays: number;
  cost: string;
  documentUrls: string[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TVehicleMaintenance {
  id: number;
  vehicleId: number;
  description: string;
  serviceDate: string;
  nextDueDate: string;
  reminderDays: number;
  cost: string;
  documentUrls: string[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

export interface TVehicleRepair extends TVehicleMaintenance {}
export const QUERY_KEY_FOR_VEHICLES = "vehicles";

const getVehicles = async (
  props: IGetDataProps
): Promise<{ data: TVehicle[]; total: number }> => {
  const { pagination, status } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";
  let formattedStatus = status;
  if (typeof formattedStatus === "object") {
    formattedStatus.join(",");
  }

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
      status: formattedStatus,
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
  const { pagination, searchParams, status } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_VEHICLES, pagination, searchParams, status],
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
