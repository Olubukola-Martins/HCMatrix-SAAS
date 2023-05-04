import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

type TCreateProps = {
  name: string;
};

const createConferenceRoom = async (props: TCreateProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: TCreateProps = {
    name: props.name,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateConferenceRoom = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createConferenceRoom({ ...props, token, companyId })
  );
};
