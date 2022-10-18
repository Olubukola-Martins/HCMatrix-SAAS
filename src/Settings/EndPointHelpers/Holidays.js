import axios from "axios";
import { REACT_APP_BASE_URL } from "../../envVars";

// should be users leave requests => getUserLeaveRequests
// should also be leave requests pending users approval
//  should also be users leave approval history if an approver
export const getHolidays = ({ token, userId, searchTerm, limit, page }) => {
  const url = `${REACT_APP_BASE_URL}/holidays`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = axios.get(url, config);
  return res;
};
// user holiday Details
export const getHoliday = ({ token, holidayId, searchTerm, limit, page }) => {
  const url = `${REACT_APP_BASE_URL}/holidays/${holidayId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const res = axios.get(url, config);
  return res;
};

// create holiday Request
export const createHoliday = ({ token, name, date }) => {
  const url = `${REACT_APP_BASE_URL}/holidays`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  let data = {
    name,
    date,
  };

  const res = axios.post(url, data, config);
  return res;
};
