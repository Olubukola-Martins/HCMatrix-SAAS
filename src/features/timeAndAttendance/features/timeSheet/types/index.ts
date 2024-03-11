export interface timeSheetProps {
  employee: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  days: {
    Sunday: {
      dayOfWeek: string;
      totalTimeTracked: number;
    };
     Monday: {
        dayOfWeek: string;
        totalTimeTracked: number;
      };
      Tuesday: {
        dayOfWeek: string;
        totalTimeTracked: number;
      };
      Wednesday: {
        dayOfWeek: string;
        totalTimeTracked: number;
      };
      Thursday: {
        dayOfWeek: string;
        totalTimeTracked: number;
      };
      Friday: {
        dayOfWeek: string;
        totalTimeTracked: number;
      };
      Saturday: {
        dayOfWeek: string;
        totalTimeTracked: number;
      };
  };
}
