export interface ConferenceRoomBooking {
  id: number;
  date: string;
  reason: string;
  status: string;
  endTime: string;
  employee: Employee;
  priority: string;
  companyId: number;
  createdAt: string;
  startTime: string;
  updatedAt: string;
  department?: any;
  employeeId: number;
  departmentId?: any;
  conferenceRoom: ConferenceRoom;
  conferenceRoomId: number;
}

interface ConferenceRoom {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Employee {
  id: number;
  email: string;
  empUid: string;
  roleId: number;
  status: string;
  userId: number;
  lastName: string;
  avatarUrl: string;
  companyId: number;
  createdAt: string;
  deletedAt?: any;
  firstName: string;
  updatedAt: string;
  designationId: number;
  hasSelfService: boolean;
}
