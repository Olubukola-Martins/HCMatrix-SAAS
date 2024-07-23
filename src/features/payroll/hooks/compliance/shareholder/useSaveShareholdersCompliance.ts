import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TShareholdersCompliance } from "features/payroll/types/compliance";
import { useApiAuth } from "hooks/useApiAuth";
import { uploadFile } from "hooks/useUploadFile";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TFormFileInput } from "types/files";

export type TAddShareholderComplianceData = {
  shareholders: {
    name: string;
    image?: TFormFileInput;
    imageUrl?: string;
    sharesHeld: number | string;
  }[];
};
const createData = async (props: {
  data: TAddShareholderComplianceData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/shareholder`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: Pick<TShareholdersCompliance, "shareholders"> = {
    shareholders: [],
  };

  const uploadPromises = props.data.shareholders.map(async (shareholder) => {
    let imageUrl: string | undefined = shareholder.imageUrl;
    if (shareholder.image) {
      const { data } = await uploadFile({
        auth: props.auth,
        data: {
          file: shareholder.image?.[0]?.originFileObj,
        },
      });
      imageUrl = data;
    }
    return {
      imageUrl,
      name: shareholder.name,
      sharesHeld: `${shareholder.sharesHeld}%`,
    };
  });

  const shareholdersData = await Promise.all(uploadPromises);
  data.shareholders.push(...shareholdersData);

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveShareholdersCompliance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TAddShareholderComplianceData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
