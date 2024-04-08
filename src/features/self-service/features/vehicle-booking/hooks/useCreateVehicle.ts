import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TFormFileInput } from "types/files";

export type TVehicleType = "car" | "motorcycle" | "truck" | "bus";
export type TVehicleStatus =
  | "unassigned"
  | "assigned"
  | "in-repair"
  | "condemned";

type TCreateProps = {
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  image?: TFormFileInput;
  color?: string;
  description?: string;
  purchaseDate?: string;
  dateAssigned?: string;
  cost?: number;
  status: TVehicleStatus;
  assigneeId?: number;
  documents?: TFormFileInput;
};
type TCreatePropsApi = {
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  imageUrl?: string;
  color?: string;
  description?: string;
  purchaseDate?: string;
  dateAssigned?: string;
  cost?: number;
  status: TVehicleStatus;
  assigneeId?: number;
  documentUrls?: string[];
};

const createVehicle = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const token = props.auth.token;
  const companyId = props.auth.companyId;
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId,
    },
  };
  // upload vehicle image
  const imageUrls = props.data.image
    ? await bulkUploadFiles({
        auth: { companyId, token },
        data: { files: props.data.image },
      })
    : undefined;
  // upload vehicle documents
  const documentUrls = props.data.documents
    ? await bulkUploadFiles({
        auth: { companyId, token },
        data: { files: props.data.documents },
      })
    : undefined;

  delete props.data.image;
  delete props.data.documents;
  const data: TCreatePropsApi = {
    ...props.data,
    imageUrl: imageUrls ? imageUrls[0] : undefined,
    documentUrls: documentUrls ? documentUrls : undefined,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateVehicle = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createVehicle({ data: props, auth: { token, companyId } })
  );
};
