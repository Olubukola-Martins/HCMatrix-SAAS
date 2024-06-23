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
}

const handleStatus = async (props: {
  data: IGeneralProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/biometrics/devices/${props.data.id}/toggle-enable`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.patch(url, {}, config);
  return response;
};

export const useHandleBiometricStatus = ({ queryKey }: IDProps) => {
  const queryClient = useQueryClient();
  const { token, companyId } = useApiAuth();
  const { mutate } = useMutation((props: { data: IGeneralProps }) =>
    handleStatus({ data: props.data, auth: { companyId, token } })
  );

  const requestType = (id: number) => {
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
    mutate(
      { data: { id } },
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
