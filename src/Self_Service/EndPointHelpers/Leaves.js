import axios from "axios";
import { REACT_APP_BASE_URL } from "../../envVars";

// should be users leave requests => getUserLeaveRequests
// should also be leave requests pending users approval
//  should also be users leave approval history if an approver
export const getUserLeaveRequests = ({
  token,
  userId,
  searchTerm,
  limit,
  page,
}) => {
  const url = `${REACT_APP_BASE_URL}/userLeaveRequests`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = axios.get(url, config);
  return res;
};
// user leave Details
export const getUserLeaveDetails = ({
  token,
  userId,
  searchTerm,
  limit,
  page,
}) => {
  const url = `${REACT_APP_BASE_URL}/userLeaveDetails`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = axios.get(url, config);
  return res;
};

// create Leave Request
export const createLeaveRequest = ({
  token,
  userId,
  workAssignee,
  leaveType,
  startDate,
  endDate,
  leaveLength,
  withPay,
  status,
  reason,
}) => {
  const url = `${REACT_APP_BASE_URL}/userLeaveRequests`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {
    userId,
    workAssignee,
    leaveType,
    startDate,
    endDate,
    leaveLength,
    withPay,
    status,
    reason,
  };

  const res = axios.post(url, data, config);
  return res;
};
