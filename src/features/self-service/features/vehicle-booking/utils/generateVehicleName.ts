import { TVehicle } from "../hooks/useFetchVehicles";

export const generateVehicleName = (vehicle?: TVehicle): string => {
  return `${vehicle?.brand} ${vehicle?.model}`;
};
