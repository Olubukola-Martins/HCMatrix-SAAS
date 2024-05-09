import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TFormFileInput } from "types/files";

type TVehicleType = "car" | "motorcycle" | "truck" | "bus";
type TVehicleStatus = "unassigned" | "assigned" | "in-repair" | "condemned";

type TEditProps = {
  type: TVehicleType;
  brand: string;
  model: string;
  plateNumber: string;
  image?: TFormFileInput;
  color?: string;
  description?: string;
  purchaseDate?: string;
  dateAssigned?: string | null;
  cost?: number;
  status: TVehicleStatus;
  assigneeId?: number | null;
  documents?: TFormFileInput;
};
type TEditPropsApi = {
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
  const token = props.auth.token;
  const companyId = props.auth.companyId;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.id}`;
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
  const data: TEditPropsApi = {
    ...props.data,
    imageUrl: imageUrls ? imageUrls[0] : undefined,
    documentUrls: documentUrls ? documentUrls : undefined,
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
