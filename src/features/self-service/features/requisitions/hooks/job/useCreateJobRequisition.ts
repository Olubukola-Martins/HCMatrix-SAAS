import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  date: string;
  designationId: number;
  employmentType: string;
  salaryRange: string;
  preferredStartDate: string;
  skillsAndQualifications: string;
  educationRequirements: string;
};

const createData = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/job`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateJobRequisition = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
