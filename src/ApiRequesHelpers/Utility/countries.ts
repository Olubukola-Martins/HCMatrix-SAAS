import { TCountry, TLga, TState } from "AppTypes/DataEntitities";
import { ISearchParams } from "AppTypes/Search";
import axios from "axios";

export interface IStateProps {
  countryId: number;
  searchParams?: ISearchParams;
}

export interface ILgaProps {
  stateId: number;
  searchParams?: ISearchParams;
}

export const getCountries = async (search?: string): Promise<TCountry[]> => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/country`;
  if (search) {
    url += `?search=${search}`;
  }

  const res = await axios.get(url);
  const result = res.data.data;

  const data: TCountry[] = result.map(
    (item: any): TCountry => ({
      id: item.id,
      name: item.name,
      sortName: item.sortName,
      code: item.code,
    })
  );

  return data;
};

export const getStates = async ({
  countryId,
  searchParams,
}: IStateProps): Promise<TState[]> => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/state/${countryId}`;
  if (searchParams?.name) {
    url += `?search=${searchParams.name}`;
  }

  const res = await axios.get(url);
  const result = res.data.data;

  const data: TState[] = result.map(
    (item: any): TState => ({
      id: item.id,
      name: item.name,
      countryId: item.countryId,
    })
  );

  return data;
};

export const getLgas = async ({
  stateId,
  searchParams,
}: ILgaProps): Promise<TLga[]> => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/address/lga/${stateId}`;
  if (searchParams?.name) {
    url += `?search=${searchParams.name}`;
  }

  const res = await axios.get(url);
  const result = res.data.data;

  const data: TLga[] = result.map(
    (item: any): TLga => ({
      id: item.id,
      name: item.name,
      stateId: item.stateId,
    })
  );

  return data;
};
