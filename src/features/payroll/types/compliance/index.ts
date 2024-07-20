import { TApprovalStatus } from "types/statuses";

export type TComplianceDocumentType =
  | "cac-2"
  | "cac-7"
  | "certificate-of-incorporation"
  | "memorandum-of-incorporation";
export type TComplianceDocument = {
  id: number;
  companyId: number;
  type: TComplianceDocumentType;
  documentUrl: string;
  approvalStatus: TApprovalStatus;
  comment?: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null;
};

export type TShareholdersCompliance = {
  id: number;
  companyId: number;
  shareholders: TShareholder[];
  approvalStatus: TApprovalStatus;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
};

interface TShareholder {
  name: string;
  imageUrl: string;
  sharesHeld: string;
}

export type TDirectorsCompliance = {
  id: number;
  companyId: number;
  directors: TDirector[];
  approvalStatus: TApprovalStatus;
  comment?: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null | string;
};

interface TDirector {
  name: string;
  imageUrl: string;
  position: string;
}

export type TBvnCompliance = {
  id: number;
  companyId: number;
  bvn: string;
  approvalStatus: TApprovalStatus;
  comment?: null | string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: null | string;
};
