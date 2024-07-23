import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TComplianceDocument } from "features/payroll/types/compliance";
import { useApiAuth } from "hooks/useApiAuth";
import { uploadFile } from "hooks/useUploadFile";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TFormFileInput } from "types/files";

type TData = Pick<TComplianceDocument, "type"> & { document: TFormFileInput };
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/document/${props.data.type}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const { data: documentUrl } = await uploadFile({
    auth: props.auth,
    data: {
      file: props.data.document?.[0].originFileObj,
    },
  });
  const data: Pick<TComplianceDocument, "documentUrl"> = {
    documentUrl,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveDocumentsCompliance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
