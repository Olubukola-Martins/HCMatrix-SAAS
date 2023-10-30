export type TCompanyDashboard = {
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
}
