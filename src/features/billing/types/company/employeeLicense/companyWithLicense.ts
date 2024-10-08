export type TCompanyEmployeeWithLicense = {
  id: number;
  companySubscriptionId: number;
  employeeId: number;
  licenseType: string;
  createdAt: string;
  updatedAt: string;
  employee: Employee;
};

interface Employee {
  id: number;
  empUid: string;
  firstName: string;
  lastName: string;
  designation: Designation | null;
}

interface Designation {
  id: number;
  name: string;
  department: Department;
}

interface Department {
  id: number;
  name: string;
}
