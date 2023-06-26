export const getEmployeeFullName = (employee: {
  firstName: string;
  lastName: string;
}) => `${employee.firstName} ${employee.lastName}`;
