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
  id: number;
  name: string;
  isPaid: boolean;
  enforcePeriod: boolean;
  duration: string;
  startAt: string;
  endAt: string;
}
