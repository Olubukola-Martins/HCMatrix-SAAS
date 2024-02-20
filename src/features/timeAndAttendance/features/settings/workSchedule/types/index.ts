export interface workScheduleFixedProps {
  schedule: {
    day: string;
    startTime: string;
    endTime: string;
  }[];
  allowTrackingBeforeStart: boolean;
}

export interface WorkDay {
  day: string;
  duration: string; // Assuming duration is in minutes as a string
}

export type workScheduleFlexibleProps = WorkDay[];