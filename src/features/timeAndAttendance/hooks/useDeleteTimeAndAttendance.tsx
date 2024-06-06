import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { openNotification } from "utils/notifications";
import { ICurrentCompany } from "types";
import { LoadingOutlined } from "@ant-design/icons";

interface IDProps {
  EndPointUrl: string;
  queryKey: string;
}

interface IGeneralProps {
  id: number;
  EndPointUrl?: string;
}

const handleDelete = async (props: {
  data: IGeneralProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/${props.data.EndPointUrl}/${props.data.id}`;
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

export const useDeleteTimeAndAttendance = ({
  EndPointUrl,
  queryKey,
}: IDProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate } = useMutation((props: { data: IGeneralProps }) =>
    handleDelete({ data: props.data, auth: { companyId, token } })
  );

  const removeData = (id: number) => {
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
    mutate(
      { data: { id, EndPointUrl } },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.response.data.message,
            duration: 4.5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: "Item Successfully Deleted",
            duration: 4.5,
          });

          queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
      }
    );
  };

  return { removeData };
};
