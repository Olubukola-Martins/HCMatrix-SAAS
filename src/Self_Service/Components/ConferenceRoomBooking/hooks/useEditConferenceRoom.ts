import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

type TEditProps = {
  id: number;
  name: string;
};

const editConferenceRoom = async (props: TEditProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    name: props.name,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useEditConferenceRoom = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TEditProps) =>
    editConferenceRoom({ ...props, token, companyId })
  );
};
