export interface workScheduleFixedProps {
    schedule: {
      day: string;
      startTime: string;
      endTime: string;
    }[];
    allowTrackingBeforeStart: boolean;
  }
  