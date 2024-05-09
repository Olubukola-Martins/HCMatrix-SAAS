import { TApprovalStatus } from "types/statuses";
import { Employee } from "./Employee";

export type TTHandOverForm = {
  id: number;
  employeeId: number;
  separationDate: string;
  noticePeriod: string;
  reasonForLeaving: string;
  whatDidYouLikeTheMost: string;
  whatDoYouThinkNeedsImprovement: string;
  otherComments: string;
  supportingDocumentUrl: string;
  supervisorClearanceUrl: string;
  status: TApprovalStatus;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  assetChecklist?: AssetChecklist[];
};

interface AssetChecklist {
  id: number;
  exitHandoverFormId: number;
  assetRequisitionId: number;
  isReturned: boolean;
  createdAt: string;
  updatedAt: string;
  assetRequisition: AssetRequisition;
}

interface AssetRequisition {
  id: number;
  date: string;
  employeeId: number;
  assetId: number;
  description: string;
  attachmentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  asset: Asset;
}

interface Asset {
  id: number;
  name: string;
  typeId: number;
  status: string;
  imageUrl: string;
  uid: string;
  serialNumber: string;
  brand: string;
  model: string;
  cost: string;
  vendor: string;
  purchaseDate: string;
  color: string;
  description: string;
  assigneeId: number;
  dateAssigned: string;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
