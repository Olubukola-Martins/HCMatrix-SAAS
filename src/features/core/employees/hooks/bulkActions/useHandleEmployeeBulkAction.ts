import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TEmployeeStatus } from "../../types";

type TData =
  | {
      employeeIds: number[];
      status: TEmployeeStatus;
    }
  | {
      employeeIds: number[];
      lineManagerId: number;
    }
  | {
      employeeIds: number[];
      branchId: number;
    }
  | {
      employeeIds: number[];
      designationId: number;
    }
  | {
      employeeIds: number[];
      roleId: number;
    }
  | {
      employeeIds: number[];
      groupId: number;
    };
type TEmployeeBulkAction =
  | "change-status"
  | "assign-line-manager"
  | "assign-branch"
  | "assign-designation"
  | "add-to-group"
  | "assign-role";
const createData = async (props: {
  action: TEmployeeBulkAction;
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/bulk/${props.action}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useHandleEmployeeBulkAction = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TData; action: TEmployeeBulkAction }) =>
    createData({ ...props, auth: { token, companyId } })
  );
};
