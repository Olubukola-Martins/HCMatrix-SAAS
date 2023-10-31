export type TCompanyOwnerOrganogram = {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  designation: Designation;
  directReport: DirectReport[];
};

interface DirectReport {
  employeeId: number;
  employee: Employee;
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  avatarUrl?: string;

  designation: Designation;
}

interface Designation {
  name: string;
  department: Department;
}

interface Department {
  name: string;
}
