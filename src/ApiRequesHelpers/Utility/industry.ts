import axios from "axios";

export const getIndustries = async () => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/industry`;

  const response = await axios.get(url);
  return response;
};
