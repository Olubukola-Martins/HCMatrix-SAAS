import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { openNotification } from "utils/notifications";

interface IPatchRecruitmentItem extends ICurrentCompany {
  itemId: number;
  patchEndpointUrl: string;
  queryKey: string;
  checked: boolean;
}

interface IPProps {
  patchEndpointUrl: string;
  queryKey: string;
}

export const handlePatchData = async (props: IPatchRecruitmentItem) => {
  const activateHandler = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/${props.patchEndpointUrl}/${props.itemId}/activate`;
  const deactivateHandler = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/${props.patchEndpointUrl}/${props.itemId}/deactivate`;
  const url = props.checked ? activateHandler : deactivateHandler;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.patch(url, null, config);
  return response;
};

export const usePatchRecruitmentItem = ({
  queryKey,
  patchEndpointUrl,
}: IPProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate } = useMutation(handlePatchData);
  const patchData = (itemId: number, checked: boolean) => {
    mutate(
      {
        companyId,
        token,
        patchEndpointUrl,
        itemId,
        queryKey,
        checked,
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
  return { patchData };
};
