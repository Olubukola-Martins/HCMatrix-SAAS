import axios from "axios";
import { IGetSingleDeptProps, TDepartment } from "../types";
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_SINGLE_DEPARTMENT = "single-department";

export const getSingleDepartment = async (
  props: IGetSingleDeptProps
): Promise<TDepartment> => {
  const id = props.departmentId;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TDepartment = {
    id: item.id,
    name: item.name,
    email: item.email,
    employeeCount: item.employeeCount ?? 0,
    departmentHeadId: item?.departmentHeadId,
    parentDepartmentId: item?.parentDepartmentId,
  };

  return data;
};

export const useFetchSingleDepartment = ({
  departmentId,
  companyId,

  token,
}: IGetSingleDeptProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_DEPARTMENT, departmentId],
    () =>
      getSingleDepartment({
        companyId,
        departmentId,

        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
    }
  );

  return queryData;
};
