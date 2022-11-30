import axios from "axios";

const token = localStorage.getItem("hcmatrix_app") as unknown as string;

export const getCountries = async () => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/country`;

  const response = await axios.get(url);
  return response;
};
