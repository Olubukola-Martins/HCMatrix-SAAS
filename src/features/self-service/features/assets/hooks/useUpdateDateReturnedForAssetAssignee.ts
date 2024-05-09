import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  body: { dateReturned: string };
  assigneeHistoryId: number;
  assetId: number;
};

const updateData = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset/${props.data.assetId}/assignee-history/${props.data.assigneeHistoryId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = props.data.body;

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateDateReturnedForAssetAssignee = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    updateData({ data: props, auth: { token, companyId } })
  );
};
