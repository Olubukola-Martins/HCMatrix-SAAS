import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { openNotification } from "utils/notifications";
import { ICurrentCompany } from "types";
import { LoadingOutlined } from "@ant-design/icons";

interface IDProps {
  queryKey: string;
}

interface IGeneralProps {
  id: number;
  status?: string;
}

const handleStatus = async (props: {
  data: IGeneralProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off-requests/${props.data.id}/respond`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    response: props.data.status,
  };

  const response = await axios.patch(url, data, config);
  return response;
};

export const useHandleTimeAndAttendanceStatus = ({ queryKey }: IDProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate } = useMutation((props: { data: IGeneralProps }) =>
    handleStatus({ data: props.data, auth: { companyId, token } })
  );

  const requestType = (id: number, status: string) => {
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
    mutate(
      { data: { id, status } },
      {
        onError: (err: any) => {
          openNotification({
            title: "Error",
            state: "error",
            description: err.message,
            duration: 4.5,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            title: "Success",
            state: "success",
            description: res.data.message,
            duration: 4.5,
          });

          queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
      }
    );
  };

  return { requestType };
};
