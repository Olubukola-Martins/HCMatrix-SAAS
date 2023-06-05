import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TPriority = "low" | "medium" | "high";

type TCreateProps = {
  conferenceRoomId: number;
  employeeId: number;
  departmentId?: number;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  priority?: TPriority;
};

const createConferenceRoomBooking = async (
  props: TCreateProps & ICurrentCompany
) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    ...props,
  };
  delete data["token"];
  delete data["companyId"];

  const response = await axios.post(url, data, config);
  return response;
};


export const useCreateConferenceRoomBooking = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createConferenceRoomBooking({ ...props, token, companyId })
  );
};
