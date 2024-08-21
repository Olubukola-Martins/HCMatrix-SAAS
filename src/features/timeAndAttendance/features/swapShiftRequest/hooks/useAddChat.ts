import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { IAddChatProps, PostMySwapShiftRequestProps } from "../types";

export const createData = async (props: {
  data: IAddChatProps;
  auth: ICurrentCompany;
}) => {
  const url = `http://48.217.20.68:5000/chat`;
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const data: any = {
       ...props.data
  };

  const response = await axios.post(url, data, config);

  return response;
};

export const useAddChat = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IAddChatProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
