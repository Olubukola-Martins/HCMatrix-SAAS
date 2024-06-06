import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { TBulkImportEmployeeProp } from "../types/bulk-import";
import { useApiAuth } from "hooks/useApiAuth";
import { errorFormatter } from "utils/errorHelpers";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_LIST_OF_EMPLOYEES } from "./useFetchEmployees";

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

  try {
    const data: TBulkImportEmployeeProp[] = props.data;

    const response = await axios.post(url, data, config);
    return response;
  } catch (error) {
    throw error;
  }
};

export const useEmployeeBulkUpload = (handleClose: () => void) => {
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();

  return useMutation(
    (props: TData) => employeeBulkUpload({ props, auth: { token, companyId } }),
    {
      onError: (_err) => {
        const formattedErr = errorFormatter(_err);
        openNotification({
          state: "error",
          title: formattedErr.message,
          description: formattedErr.errors
            ?.map((err) => `${err.path}: ${err.message}`)
            .join(","),
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_LIST_OF_EMPLOYEES],
          // exact: true,
        });
        handleClose();
      },
    }
  );
};
