import { ICurrentCompany } from "AppTypes/DataEntitities";
import { IPaginationProps } from "AppTypes/Pagination";
import { ISearchParams } from "AppTypes/Search";
import { MICROSERVICE_ENDPOINTS } from "Constants/enviroment";
import axios from "axios";
import { useQuery } from "react-query";

export type TVehicleBooking = {
  id: number;
  vehicleId: number;
  employeeId: number;
  date: string;
  duration: number;
  destination: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  employee: Employee;
};

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
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

interface Vehicle {
  id: number;
  label: string;
  type: string;
  brand: string;
  model: string;
  plateNumber: string;
  status: string;
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
}
// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

const QUERY_KEY_FOR_VEHICLE_BOOKINGS = "vehicle-bookings";

const getVehicleBookings = async (
  props: IGetDataProps
): Promise<{ data: TVehicleBooking[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle/booking`;

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

  const data: TVehicleBooking[] = result.map(
    (item: TVehicleBooking): TVehicleBooking => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchVehicleBookings = (props: IGetDataProps) => {
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_VEHICLE_BOOKINGS,
      pagination?.current,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getVehicleBookings({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
