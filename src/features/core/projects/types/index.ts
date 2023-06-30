export type TProject = {
  id: number;
  name: string;
  status: "active" | "inactive";
  closed: boolean;
  description: string;
  participantCount: number;
};
