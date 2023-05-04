import axios from "axios";
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { IGetSingleDesgProps, TDesignation } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const QUERY_KEY_FOR_SINGLE_DESIGNATION = "single-designation";
export const getSingleDesignation = async (
  props: IGetSingleDesgProps
): Promise<TDesignation> => {
  const id = props.designationId;

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/designation/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TDesignation = {
    id: item.id,
    name: item.name,
    department: {
      id: item.department.id ?? "",
      name: item.department.name ?? "",
    },
    employeeCount: item.employeeCount ?? 0,
  };

  return data;
};

export const useFetchSingleDesignation = ({
  designationId,
  companyId,

  token,
}: IGetSingleDesgProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_DESIGNATION, designationId],
    () =>
      getSingleDesignation({
        companyId,
        designationId,
        token,
      }),
    {
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
    }
  );

  return queryData;
};
