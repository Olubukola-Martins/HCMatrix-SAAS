import axios from "axios";

export const getCountries = async () => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/country`;

  const response = await axios.get(url);
  return response;
};
