import axios from "axios";
import { IGetSingleDeptProps, TDepartment } from "../types";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_SINGLE_DEPARTMENT = "single-department";

export const getSingleDepartment = async (vals: {
  props: IGetSingleDeptProps;
  auth: ICurrentCompany;
}): Promise<TDepartment> => {
  const { props, auth } = vals;
  const id = props.departmentId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TDepartment = res.data.data;

  return item;
};

export const useFetchSingleDepartment = ({
  departmentId,
}: IGetSingleDeptProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_DEPARTMENT, departmentId],
    () =>
      getSingleDepartment({
        props: {
          departmentId,
        },

        auth: {
          companyId,

          token,
        },
      }),
    {
      onError: () => {},
    }
  );

  return queryData;
};
