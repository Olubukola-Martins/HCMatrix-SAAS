import dayjs from "dayjs";


export const DATE_FORMATS = [
  { label: "YYYY-MM-DD", value: "YYYY-MM-DD" },
  { label: "DD-MM-YYYY", value: "DD-MM-YYYY" },
  // { label: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  // { label: "YYYY/MM/DD", value: "YYYY/MM/DD" },
  // { label: "MMMM D, YYYY", value: "MMMM D, YYYY" },
  // { label: "D MMMM YYYY", value: "D MMMM YYYY" },
  // { label: "MMM D, YYYY", value: "MMM D, YYYY" },
  // { label: "YYYY MMM D", value: "YYYY MMM D" },
  // { label: "DD.MM.YYYY", value: "DD.MM.YYYY" },
  // { label: "D/M/YYYY", value: "D/M/YYYY" },
  // { label: "YYYY. MM. DD.", value: "YYYY. MM. DD." },
  // { label: "D. MMMM YYYY", value: "D. MMMM YYYY" },
  // { label: "MMM. D, YYYY", value: "MMM. D, YYYY" },
  // { label: "YYYY MMM. D", value: "YYYY MMM. D" },
  // Add more date formats here
];

export const DEFAULT_DATE_FORMAT = DATE_FORMATS[0].value;
export const DEFAULT_TIME_FORMAT = "HH:mm:ss";

export const CURRENT_YEAR = dayjs().format("YYYY");
