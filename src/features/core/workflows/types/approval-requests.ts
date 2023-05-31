export type TApprovalRequest = {
  id: number;
  basicStageId: number;
  entityType: string;
  entityId: number;
  status: string;
  approverId: number;
  createdAt: string;
  updatedAt: string;
  leave?: Leave;
  conferenceRoomBooking?: ConferenceRoomBooking;
  vehicleBooking?: VehicleBooking;
};

// vehicle
interface VehicleBooking {
  id: number;
  vehicleId: number;
  employeeId: number;
  date: string;
  duration: number;
  destination: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle;
  employee: Employee;
}

interface Employee {
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

interface Vehicle {
  id: number;
  label: string;
  type: string;
  brand: string;
  model: string;
  plateNumber: string;
  status: string;
  imageUrl?: any;
  cost?: any;
  color?: any;
  description?: any;
  purchaseDate?: any;
  assigneeId?: any;
  dateAssigned?: any;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

// crb
interface ConferenceRoomBooking {
  id: number;
  conferenceRoomId: number;
  employeeId: number;
  departmentId?: any;
  date: string;
  startTime: string;
  endTime: string;
  reason: string;
  priority: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  conferenceRoom: ConferenceRoom;
  employee: Employee;
  department?: any;
}

interface Employee {
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

interface ConferenceRoom {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

// leave
interface Leave {
  id: number;
  employeeId: number;
  departmentId: number;
  startDate: string;
  endDate: string;
  specificDates?: any;
  length: number;
  leaveTypeId: number;
  reason: string;
  requestAllowance: boolean;
  workAssigneeId: number;
  documentUrls: string[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
  department: Department;
  leaveType: LeaveType;
  workAssignee: Employee;
}

interface LeaveType {
  id: number;
  name: string;
  label: string;
  length: number;
  employeesGetAllowance: boolean;
  calculation: string;
  percentageAmount: number;
  gender: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
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

interface Employee {
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
