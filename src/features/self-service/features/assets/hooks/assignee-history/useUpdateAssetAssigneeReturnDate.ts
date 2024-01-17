import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  dateReturned: string;
};

const updateVehicleAssigneeReturnDate = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
  vehicleId: number;
  assigneeId: number;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.vehicleId}/assignee-history/${props.assigneeId}`;
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

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateVehicleAssigneeReturnDate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: { data: TCreateProps; vehicleId: number; assigneeId: number }) =>
      updateVehicleAssigneeReturnDate({
        data: props.data,
        auth: { token, companyId },
        vehicleId: props.vehicleId,
        assigneeId: props.assigneeId,
      })
  );
};
