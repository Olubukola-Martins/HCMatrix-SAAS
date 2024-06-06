import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TPriority } from "types/priorities";

type TCreateProps = {
  conferenceRoomId: number;
  departmentId?: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  priority?: TPriority;
}& { employeeId?: number };

const createConferenceRoomBooking = async (
  props: TCreateProps,
  auth: ICurrentCompany
) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = {
    ...props,
  };
  


  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateConferenceRoomBooking = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createConferenceRoomBooking({ ...props }, { token, companyId })
  );
};
