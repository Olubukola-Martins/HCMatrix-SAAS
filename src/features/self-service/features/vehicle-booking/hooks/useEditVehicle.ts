import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TVehicleType = "car" | "motorcycle" | "truck" | "bus";
type TVehicleStatus = "unassigned" | "assigned" | "in-repair" | "condemned";

type TEditProps = {
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  imageUrl?: string;
  color?: string;
  description?: string;
  purchaseDate?: string;
  dateAssigned?: string | null;
  cost?: number;
  status: TVehicleStatus;
  assigneeId?: number | null;
  documentUrls?: string[];
};

const editVehicle = async (props: {
  data: TEditProps;
  id: number;
  auth: ICurrentCompany;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TEditProps = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useEditVehicle = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TEditProps; id: number }) =>
    editVehicle({ data: props.data, id: props.id, auth: { token, companyId } })
  );
};
