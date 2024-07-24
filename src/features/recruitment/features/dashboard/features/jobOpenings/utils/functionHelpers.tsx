const formatDate = (inputDate: string) => {
  const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const date: Date = new Date(inputDate);
  const monthName: string = months[date.getMonth()];
  const day: number = date.getDate();
  const year: number = date.getFullYear();

  function getDayWithSuffix(day: number): string {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }

  const formattedDate = `${monthName}, ${getDayWithSuffix(day)} ${year}`;
  return formattedDate;
};

export const DateFormatter = (inputDate: string): string => {
  const formattedDate: string = formatDate(inputDate);

  return formattedDate;
};

