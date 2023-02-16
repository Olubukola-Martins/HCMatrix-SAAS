import { ISearchParams } from "AppTypes/Search";
import axios from "axios";

export interface IStateProps {
  countryId: string;
  searchParams?: ISearchParams;
}

export interface ILgaProps {
  stateId: string;
  searchParams?: ISearchParams;
}

export const getCountries = async (search?: string) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/country`;
  if (search) {
    url += `?search=${search}`;
  }

  const response = await axios.get(url);
  return response;
};

export const getStates = async ({ countryId, searchParams }: IStateProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/state/${countryId}`;
  if (searchParams?.name) {
    url += `?search=${searchParams.name}`;
  }

  const response = await axios.get(url);
  return response;
};

export const getLgas = async ({ stateId, searchParams }: ILgaProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/lga/${stateId}`;
  if (searchParams?.name) {
    url += `?search=${searchParams.name}`;
  }

  const response = await axios.get(url);
  return response;
};
