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
  duration: string;
}

export type workScheduleFlexibleProps = WorkDay[];

export type workScheduleWeeklyProps = {
  duration: string;
};

export interface settingsBreakProps {
  name: string;
  isPaid: boolean;
  enforcePeriod: boolean;
  // "duration": "0h:30m"
  startAt: string;
  endAt: string;
}
