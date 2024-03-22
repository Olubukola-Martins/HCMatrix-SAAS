export interface ITimeOffProps {
  id?: number;
  policyId: number;
  date: string;
  time: string;
  comment: string;
  policy?: {
    title: string;
    duration: number;
  };
  employee? : {
    firstName: string;
    lastName: string;
  }
  status?: string;
}
