import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDeleteProps = {
  id: number;
};

const delData = async (props: TDeleteProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking//${props.id}`;
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
export const useCancelConferenceRoomBooking = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDeleteProps) =>
    delData({ ...props, token, companyId })
  );
};
