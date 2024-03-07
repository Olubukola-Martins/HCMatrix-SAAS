export type TTrainingSessionBooking = {
  id: number;
  companyId: number;
  trainingSessionId: number;
  status: TTrainingSessionBookingStatus;
  reason?: null;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TTrainingSessionBookingStatus =
  | "accepted"
  | "pending"
  | "rejected"
  | "completed";
