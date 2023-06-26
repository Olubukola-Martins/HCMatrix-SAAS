export type JobRequestEnitity = {
  id: number;
  date: string;
  designationId: number;
  employmentType: string;
  salaryRange: string;
  preferredStartDate: string;
  skillsAndQualifications: string;
  educationRequirements: string;
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  designation: Designation;
};

interface Designation {
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
