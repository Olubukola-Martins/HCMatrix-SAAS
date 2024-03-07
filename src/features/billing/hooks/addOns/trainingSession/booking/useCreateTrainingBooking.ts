import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TCreateTrainingBookingProps = {
  startDate: string;
  endDate: string;
};

const createData = async (props: {
  data: TCreateTrainingBookingProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/add-ons/training-session/booking`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateTrainingBookingProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateTrainingBooking = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateTrainingBookingProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
