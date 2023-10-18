import { TVehicle } from "../hooks/useFetchVehicles";

export const generateVehicleName = (
  vehicle?: Pick<TVehicle, "model" | "brand" | "color">
): string => {
  return `${vehicle?.color} ${vehicle?.brand} ${vehicle?.model}`;
};
