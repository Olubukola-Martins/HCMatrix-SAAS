import { GeneralPrice } from "../..";

export type TSupportCase = {
  id: number;
  name: string;
  label: string;
  type: "support";
  description: string;
  trainingHours: null;
  createdAt: string;
  updatedAt: string;
  prices: GeneralPrice[];
};
