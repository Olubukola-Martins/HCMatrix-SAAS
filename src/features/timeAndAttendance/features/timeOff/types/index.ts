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

export type IColumnsProps = {
  handleDelete?: (id: number) => void;
  extraColumns: boolean;
};