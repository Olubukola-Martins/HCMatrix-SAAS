import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TComplianceDocument } from "features/payroll/types/compliance";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = Pick<TComplianceDocument, "documentUrl" | "type">;
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/document/${props.data.type}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: Pick<TData, "documentUrl"> = {
    documentUrl: props.data.documentUrl,
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
