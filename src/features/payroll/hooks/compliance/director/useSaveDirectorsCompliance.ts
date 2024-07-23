import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TDirectorsCompliance } from "features/payroll/types/compliance";
import { useApiAuth } from "hooks/useApiAuth";
import { uploadFile } from "hooks/useUploadFile";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TFormFileInput } from "types/files";

export type TAddDirectorComplianceData = {
  directors: {
    name: string;
    image?: TFormFileInput;
    imageUrl?: string;
    position: string;
  }[];
};
const createData = async (props: {
  data: TAddDirectorComplianceData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/director`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: Pick<TDirectorsCompliance, "directors"> = { directors: [] };

  const uploadPromises = props.data.directors.map(async (director) => {
    let imageUrl: string | undefined = director?.imageUrl;
    if (director.image) {
      const { data } = await uploadFile({
        auth: props.auth,
        data: {
          file: director.image?.[0]?.originFileObj,
        },
      });
      imageUrl = data;
    }
    return {
      imageUrl,
      name: director.name,
      position: director.position,
    };
  });

  const directorsData = await Promise.all(uploadPromises);
  data.directors.push(...directorsData);

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveDirectorsCompliance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TAddDirectorComplianceData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
