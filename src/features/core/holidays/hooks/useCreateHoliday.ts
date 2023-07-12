import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type THolidayData = {
  title: string;
  date: string;
};
const createData = async (props: {
  data: THolidayData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/holiday`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: THolidayData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateHoliday = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: THolidayData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
