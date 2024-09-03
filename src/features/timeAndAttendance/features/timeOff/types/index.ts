import { IPaginationProps } from "types";

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
    designation: {
      department: {
        name: string;
      }
    }
  }
  status?: string;
}

export type IColumnsProps = {
  handleDelete?: (id: number) => void;

  approvalColumn: boolean;


};

export interface IRequestFilter {
  pagination?: IPaginationProps;
  status?: string;
  policyId?: number;
  date?: string | null;
}

