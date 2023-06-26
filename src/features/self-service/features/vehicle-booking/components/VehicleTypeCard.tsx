import React from "react";
import { TVehicleType } from "../hooks/useCreateVehicle";
import { useFetchVehicles } from "../hooks/useFetchVehicles";
import { useApiAuth } from "hooks/useApiAuth";
import { SimpleCard } from "components/cards/SimpleCard";

interface IProps {
  type: TVehicleType;
  total: number;
}

export const VehicleTypeCard: React.FC<IProps> = ({ type, total }) => {
  return <SimpleCard title={type} highlight={`${total}`} />;
};
