import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import download from "js-file-download";

type TResponse = any;
interface IDataProps {
  payrollId?: number;
}
const OVERTIME_TEMPLATE_NAME = "timesheet-template.csv";
const createData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.payrollId}/overtime-sheet`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);

  download(res.data, OVERTIME_TEMPLATE_NAME);
};

export const useGetOvertimeSheetTemplate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: IDataProps }) =>
    createData({
      data: props.data,

      auth: { token, companyId },
    })
  );
};
