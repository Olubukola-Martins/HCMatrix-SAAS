export type TCompanyEmployeeDashboard = {
  assets: Assets;
  pendingApprovals: PendingApprovals;
  celebrationsAndHolidays: CelebrationsAndHolidays;
};

interface CelebrationsAndHolidays {
  birthdays: Birthdays;
  workAnniversaries: WorkAnniversary[];
  holidays: Holiday[];
}

interface Holiday {
  title: string;
  date: string;
}

interface WorkAnniversary {
  startDate: string;
  employee: Employee;
}

interface Birthdays {
  today: Today[];
  upcoming: Today[];
}

interface Today {
  dob: string;
  employee: Employee;
}

interface Employee {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

interface PendingApprovals {
  result: Result2[];
  totalCount: number;
}

interface Result2 {
  id: number;
  basicStageId: number;
  entityType: string;
  entityId: number;
  status: string;
  processed: boolean;
  approverId: number;
  comment?: any;
  createdAt: string;
  updatedAt: string;
  basicStage: BasicStage;
  transferRequisition?: TransferRequisition;
  reimbursementRequisition?: ReimbursementRequisition;
  promotionRequisition?: PromotionRequisition;
  positionChangeRequisition?: PositionChangeRequisition;
  moneyRequisition?: MoneyRequisition;
}

interface MoneyRequisition {
  id: number;
  date: string;
  employeeId: number;
  title: string;
  purpose: string;
  amount: string;
  attachmentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Assignee;
}

interface PositionChangeRequisition {
  id: number;
  date: string;
  employeeId: number;
  proposedDesignationId: number;
  skillsAndQualifications: string;
  reason: string;
  justification: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Assignee;
  proposedDesignation: ProposedDesignation;
}

interface PromotionRequisition {
  id: number;
  date: string;
  employeeId: number;
  proposedDesignationId: number;
  justification: string;
  preferredStartDate: string;
  attachmentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Assignee;
  proposedDesignation: ProposedDesignation;
}

interface ReimbursementRequisition {
  id: number;
  date: string;
  employeeId: number;
  title: string;
  description: string;
  amount: string;
  attachmentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Assignee;
}

interface TransferRequisition {
  id: number;
  date: string;
  employeeId: number;
  proposedBranchId: number;
  proposedDesignationId: number;
  skillsAndQualifications: string;
  reason: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Assignee;
  proposedBranch: ProposedBranch;
  proposedDesignation: ProposedDesignation;
}

interface ProposedDesignation {
  id: number;
  name: string;
  label: string;
  departmentId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  department: Department;
}

interface Department {
  id: number;
  name: string;
  label: string;
  companyId: number;
  departmentHeadId?: any;
  email: string;
  parentDepartmentId?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface ProposedBranch {
  id: number;
  name: string;
  label: string;
  description: string;
  addressId: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface BasicStage {
  id: number;
  workflowId: number;
  name: string;
  type: string;
  entityId: number;
  createdAt: string;
  updatedAt: string;
}

interface Assets {
  result: Result[];
  totalCount: number;
}

interface Result {
  id: number;
  assetId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  asset: Asset;
  assignee: Assignee;
}

interface Assignee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface Asset {
  id: number;
  name: string;
  typeId: number;
  status: string;
  imageUrl?: any;
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
  type: Type;
}

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
