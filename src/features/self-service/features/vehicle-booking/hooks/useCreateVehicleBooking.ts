import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  vehicleId: number;
  date: string;
  duration: number; //number (in hours)
  destination: string;
} & { employeeId?: number };

const createVehicleBooking = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/booking`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateVehicleBooking = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createVehicleBooking({ data: props, auth: { token, companyId } })
  );
};
