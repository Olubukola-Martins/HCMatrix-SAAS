import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TBulkImportEmployeeProp } from "../types/bulk-import";
import { useApiAuth } from "hooks/useApiAuth";

type TData = { data: TBulkImportEmployeeProp[] };
export const employeeBulkUpload = async (vals: {
  auth: ICurrentCompany;
  props: TData;
}) => {
  const { auth, props } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/bulk`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data: TBulkImportEmployeeProp[] = props.data;

  const response = await axios.post(url, data, config);
  return response;
};

export const useEmployeeBulkUpload = () => {
  const { token, companyId } = useApiAuth();

  return useMutation((props: TData) =>
    employeeBulkUpload({ props, auth: { token, companyId } })
  );
};
