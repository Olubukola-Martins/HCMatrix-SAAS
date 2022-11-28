import React from "react";
import { getUserLeaveDetails } from "../../EndPointHelpers/Leaves";
import EntryBoxes from "../Utilities/EntryBoxes";
import { useQuery } from "react-query";

const userLeaveDetails = {
  spillOver: {
    title: "Spill over",
    isLink: false,
    info: "0 Days",
    url: "/self-service/loan-request",
  },
  leaveBank: { title: "Leave Bank", isLink: false, info: "0 Days" },
  usedLeave: { title: "Used Leave", isLink: false, info: "0 Days" },
  leaveBalance: { title: "Leave Balance", isLink: false, info: "0 Days" },
  approvedRequests: { title: "Approved Requests", isLink: false, info: "0" },
  pendingRequests: { title: "Pending Requests", isLink: false, info: "0" },
  rejectedRequests: { title: "Rejected Requests", isLink: false, info: "0" },
  publicHolidays: {
    title: "Recognized Public Holidays",
    isLink: false,
    info: "0 Days",
  },
};

const LeaveCards = () => {
  const { data, isLoading, isError, error, isSuccess } = useQuery(
    ["user-leave-details"],
    () => {
      return getUserLeaveDetails({
        token: "",
        userId: "",
      });
    },
    {
      onError: (err) => {},
      onSuccess: (data) => {},
      select: (res) => {
        const data = res.data;
        const formattedData = Object.entries(data).map((item) => {
          if (item[0].indexOf("equests") === -1) {
            return {
              ...userLeaveDetails[item[0]],
              info: item[1] + " days",
            };
          }
          return {
            ...userLeaveDetails[item[0]],
            info: item[1],
          };
        });

        return formattedData;
      },
    }
  );
  if (isLoading || isError) {
    return <p>issue</p>;
  }
  return (
    <div>
      <EntryBoxes entries={data} />
    </div>
  );
};

export default LeaveCards;
