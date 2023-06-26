// crb
export interface ConferenceRoomBookingEntity {
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
