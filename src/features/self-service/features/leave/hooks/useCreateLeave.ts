import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { bulkUploadFiles } from "hooks/useUploadFile";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  departmentId: number;
  startDate?: string;
  endDate?: string;
  specificDates?: string[];
  length: number;
  leaveTypeId: number;
  reason: string;
  requestAllowance: boolean;
  workAssigneeId: number;
  documentUrls: any[];
};

const createLeave = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const uploadedFileUrls = await bulkUploadFiles({
    data: {
      files: props.data.documentUrls,
    },
    auth: { token: props.auth.token, companyId: props.auth.companyId },
  });
  const data: TCreateProps = {
    ...props.data,
    documentUrls: uploadedFileUrls,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateLeave = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createLeave({ data: props, auth: { token, companyId } })
  );
};
