import axios from "axios";

import { useMutation } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { TLicenseType } from "features/authentication/types/auth-user";

type IUpdateEmpProps = {
  employeeId: number;
  body: Partial<{
    firstName: string;
    lastName: string;
    email: string;
    licenseType: TLicenseType;
    empUid: string;
    roleId: number;
    designationId: number;
    avatarUrl: string;
  }>;
};

export const updateEmployee = async (
  props: IUpdateEmpProps,
  auth: ICurrentCompany
) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = props.body;

  const response = await axios.patch(url, data, config);
  return response;
};

export const useUpdateEmployee = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IUpdateEmpProps) =>
    updateEmployee(props, { token, companyId })
  );
};
