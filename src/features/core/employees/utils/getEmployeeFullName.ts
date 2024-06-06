export const getEmployeeFullName = (employee?: {
  firstName: string;
  lastName: string;
}) => (employee ? `${employee.firstName} ${employee.lastName}` : `N/A`);
