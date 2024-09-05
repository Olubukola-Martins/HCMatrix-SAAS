import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const useGetFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");
  useEffect(() => {
    const currentDate = dayjs();
    const dayOfWeek = currentDate.format("dddd"); // Get day of the week
    const month = currentDate.format("MMM"); // Get abbreviated month
    const year = currentDate.format("YYYY"); // Get full year
    const dayDate = currentDate.format("D"); // Get day date

    const formattedDateString = `${dayOfWeek}, ${month} ${dayDate}, ${year}`;
    setFormattedDate(formattedDateString);
  }, []);
  return { formattedDate };
};
