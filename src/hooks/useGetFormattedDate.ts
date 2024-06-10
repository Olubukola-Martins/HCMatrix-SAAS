import moment from "moment";
import { useEffect, useState } from "react";

export const useGetFormattedDate = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");
  useEffect(() => {
    const currentDate = moment();
    const dayOfWeek = currentDate.format("dddd"); // Get day of the week
    const month = currentDate.format("MMM"); // Get abbreviated month
    const year = currentDate.format("YYYY"); // Get full year

    const formattedDateString = `${dayOfWeek}, ${month} ${year}`;
    setFormattedDate(formattedDateString);
  }, []);
  return { formattedDate };
};
