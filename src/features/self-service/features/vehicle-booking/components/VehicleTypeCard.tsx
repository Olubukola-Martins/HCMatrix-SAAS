import React from "react";
import { TVehicleType } from "../hooks/useCreateVehicle";
import { useFetchVehicles } from "../hooks/useFetchVehicles";
import { useApiAuth } from "hooks/useApiAuth";
import { SimpleCard } from "components/cards/SimpleCard";

interface IProps {
  type: TVehicleType;
}

export const VehicleTypeCard: React.FC<IProps> = ({ type }) => {
  const { token, companyId } = useApiAuth();

  const { data } = useFetchVehicles({
    token,
    companyId,
    searchParams: {
      name: type,
    },
  });
  return <SimpleCard title={type} highlight={`${data?.total}`} />;
};
