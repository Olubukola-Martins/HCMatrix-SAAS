import { TIndustry } from "AppTypes/DataEntitities";
import axios from "axios";

export const getIndustries = async (): Promise<TIndustry[]> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/industry`;

  const res = await axios.get(url);
  const result = res.data.data;

  const data: TIndustry[] = result.map(
    (item: any): TIndustry => ({
      id: item.id,
      name: item.name,
    })
  );

  return data;
};
