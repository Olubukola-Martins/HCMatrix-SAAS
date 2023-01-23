import axios from "axios";

export interface IStateProps {
  countryId: string,
}

export interface ILgaProps {
  stateId: string,
}

export const getCountries = async () => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/country`;

  const response = await axios.get(url);
  return response;
};

export const getStates = async ({countryId}: IStateProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/state/${countryId}`;

  const response = await axios.get(url);
  return response;
};

export const getLgas = async ({stateId}: ILgaProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/lga/${stateId}`;

  const response = await axios.get(url);
  return response;
};
