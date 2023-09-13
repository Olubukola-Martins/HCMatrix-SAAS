import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import download from "js-file-download";

type TResponse = any;
interface IDataProps {
  reportId: number;
}
const PAYROLL_REPORT_FILE_DOWNLOAD = "payroll-report.csv";
const createData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/report/${props.data.reportId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);

  download(res.data, PAYROLL_REPORT_FILE_DOWNLOAD);
};

export const useDownloadPayrollReport = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: IDataProps }) =>
    createData({
      data: props.data,

      auth: { token, companyId },
    })
  );
};
