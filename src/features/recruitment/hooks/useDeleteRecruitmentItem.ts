import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";

interface IDeleteRecruitmentItem extends ICurrentCompany {
  itemId: number;
  deleteEndpointUrl: string;
  queryKey: string;
}

interface IDProps {
  deleteEndpointUrl: string;
  queryKey: string;
}

export const handleDeleteData = async (props: IDeleteRecruitmentItem) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/${props.deleteEndpointUrl}/${props.itemId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteRecruitmentItem = ({
  queryKey,
  deleteEndpointUrl,
}: IDProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate, isLoading } = useMutation(handleDeleteData);
  const removeData = (itemId: number) => {
    mutate(
      {
        companyId,
        deleteEndpointUrl,
        itemId,
        token,
        queryKey,
      },
      {
        onError: (error: any) => {
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
  return { removeData, deleteIsLoading: isLoading };
};
