import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TAddHospitalProps } from "./useAddHospital";
import { addHMOPlanToHospital } from "./management/useAddHMOPlanToHospital";
import { removeHMOPlanFromHospital } from "./management/useRemoveHMOPlanFromHospital";

type TBody = Pick<
  TAddHospitalProps,
  "name" | "address" | "categoryId" | "phoneNumber" | "isRecommended"
>;
type TData = {
  body: {
    data: TBody;
    hmoPlanManagement: TAddHospitalProps["hmoPlanManagement"];
  };
  hospitalId: number;
  currentHmoPlanManagement: TAddHospitalProps["hmoPlanManagement"];
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/hospital/${props.data.hospitalId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data.body.data,
  };
  const hmoPlanIdsToAdd = props.data.body.hmoPlanManagement
    .filter(
      (item) =>
        props.data.currentHmoPlanManagement
          .map((item) => item.hmoPlanId)
          .includes(item.hmoPlanId) === false
    )
    .map((item) => item.hmoPlanId);
  const hmoPlanIdsToDelete = props.data.currentHmoPlanManagement
    .filter(
      (item) =>
        props.data.body.hmoPlanManagement
          .map((item) => item.hmoPlanId)
          .includes(item.hmoPlanId) === false
    )
    .map((item) => item.hmoPlanId);
  await Promise.all(
    hmoPlanIdsToAdd.map(
      async (hmoPlanId) =>
        await addHMOPlanToHospital({
          auth: props.auth,
          data: { body: { hmoPlanId }, hospitalId: props.data.hospitalId },
        })
    )
  );
  await Promise.all(
    hmoPlanIdsToDelete.map(
      async (hmoPlanId) =>
        await removeHMOPlanFromHospital({
          auth: props.auth,
          data: { hmoPlanId, hospitalId: props.data.hospitalId },
        })
    )
  );

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateHospital = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
