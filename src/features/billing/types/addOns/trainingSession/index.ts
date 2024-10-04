import { GeneralPrice } from "../..";

export type TTrainingSession = {
  id: number;
  name: string;
  label: string;
  type: "training";
  description: string;
  trainingHours: number;
  createdAt: string;
  updatedAt: string;
  prices: GeneralPrice[];
};

export {
  type TTrainingSessionBooking,
  type TTrainingSessionBookingStatus,
} from "./booking";
