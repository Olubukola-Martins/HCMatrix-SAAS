import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";

export interface IPutRecruitmentItem extends ICurrentCompany {
  itemId: number;
  putEndpointUrl: string;
  queryKey: string;
}

interface IPProps {
  putEndpointUrl: string;
  queryKey: string;
}

export const handlePutData = async (props: IPutRecruitmentItem) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/${props.putEndpointUrl}/${props.itemId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.put(url, null, config);
  return response;
};

export const useUpdateEmailTemplate = ({
  queryKey,
  putEndpointUrl,
}: IPProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading } = useMutation(handlePutData);
  const putData = (itemId: number) => {
    mutate(
      {
        companyId,
        token,
        putEndpointUrl,
        itemId,
        queryKey,
      },
      {
        onError: (error: any) => {
          console.log(error);
          openNotification({
            state: "error",
            title: "Error Occured",
            description: error.response.data.message,
            duration: 5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
          });
          queryClient.invalidateQueries([queryKey]);
        },
      }
    );
  };
  return { putData, isLoading };
};
