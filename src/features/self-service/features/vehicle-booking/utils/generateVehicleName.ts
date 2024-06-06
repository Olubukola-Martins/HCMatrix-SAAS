import { TVehicle } from "../hooks/useFetchVehicles";

export const generateVehicleName = (
  vehicle?: Pick<TVehicle, "model" | "brand" | "color" | "type">
): string => {
  return `${vehicle?.color ?? ""} ${vehicle?.brand ?? ""} ${
    vehicle?.model ?? ""
  } ${vehicle?.type ?? ""}`.trim();
};
