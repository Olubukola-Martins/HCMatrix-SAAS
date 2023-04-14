import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

type TDelProps = {
  id: number;
};

const deleteVehicle = async (props: {
  data: TDelProps;
  auth: ICurrentCompany;
}) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/vehicle/${props.data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeleteVehicle = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelProps) =>
    deleteVehicle({ data: props, auth: { token, companyId } })
  );
};

export default useDeleteVehicle;
