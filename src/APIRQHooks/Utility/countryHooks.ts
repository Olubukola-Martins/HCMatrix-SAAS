import { getCountries, getLgas, getStates, ILgaProps, IStateProps } from "ApiRequesHelpers/Utility/countries";
import { TCountry, TLga, TState } from "AppTypes/DataEntitities";
import { useQuery } from "react-query";
import { openNotification } from "../../NotificationHelpers";

export const useFetchCountries = () => {
  const queryData = useQuery("countries", () => getCountries(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,

    onError: (err: any) => {
      // show notification
      openNotification({
        state: "error",
        title: "Error Occured",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },

    select: (res: any) => {
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
    },
  });

  return queryData;
};

// Get states by country
export const useFetchStates = ({countryId}: IStateProps) => {
  const queryData = useQuery(["states", countryId], () => getStates({countryId}), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    enabled: countryId ? true : false, // or countryId ? true : false,
    onError: (err: any) => {
      // show notification
      openNotification({
        state: "error",
        title: "Error Occured",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },

    select: (res: any) => {
      const result = res.data.data;

      const data: TState[] = result.map(
        (item: any): TState => ({
          id: item.id,
          name: item.name,
          countryId: item.countryId,
        })
      );

      return data;
    },
  });

  return queryData;
};

// Get states by LGA
export const useFetchLgas = ({stateId}: ILgaProps) => {
  const queryData = useQuery(["lga", stateId], () => getLgas({stateId}), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    enabled: stateId ? true : false, // or stateId ? true : false,
    onError: (err: any) => {
      // show notification
      openNotification({
        state: "error",
        title: "Error Occured",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },

    select: (res: any) => {
      const result = res.data.data;

      const data: TLga[] = result.map(
        (item: any): TLga => ({
          id: item.id,
          name: item.name,
          stateId: item.stateId,
        })
      );

      return data;
    },
  });

  return queryData;
};
