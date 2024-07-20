import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TComplianceDocument } from "features/payroll/types/compliance";

export const QUERY_KEY_FOR_WALLET_DOCUMENTS_COMPLIANCE =
  "payroll-wallet-compliance-documents";
const getData = async (props: {
  auth: ICurrentCompany;
  type?: TComplianceDocument["type"];
}): Promise<TComplianceDocument[]> => {
  const type = props.type ?? "";
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/document/${type}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const data: TComplianceDocument[] = res.data.data;

  return data;
};

export const useGetDocumentsCompliance = ({
  type,
}: {
  type?: TComplianceDocument["type"];
}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_WALLET_DOCUMENTS_COMPLIANCE, type],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
