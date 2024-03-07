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
}

export interface ClockingAndBreakStatusProps {
  clocking: {
    clockIn: null;
    clockOut: null;
  };
  activeBreakSession: null;
}
