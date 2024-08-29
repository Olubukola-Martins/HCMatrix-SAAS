export interface softClockInProps {
  location: {
    longitude: number | null;
    latitude: number | null;
  };
}

export interface softClockOutProps {
  comment: string;
  endWork: boolean;
  extraHours: number;
  payExtraHours: boolean;
  location: {
    longitude: number | null;
    latitude: number | null;
  };
}

export interface ClockingAndBreakStatusProps {
  clocking: {
    clockIn: {
      time: string;
    };
    clockOut: {
      time: string;
    };
  };
  activeBreakSession: {
    start: string;
  };
  totalHoursSpentToday: number;
}

export interface goBreakProps {
  breakPolicyId: number;
}

export interface switchActivityProps {
  projectId: number;
  comment: string;
}

export interface TEmployeeProps {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  designation: {
    department: {
      id: number;
      name: string;
    };
  };
}

export interface clockInProps {
  time: string;
  latitude: string;
  longitude: string;
  date: string;
}

export interface softClockInAndOutProps {
  componentType: "button" | "image";
}
