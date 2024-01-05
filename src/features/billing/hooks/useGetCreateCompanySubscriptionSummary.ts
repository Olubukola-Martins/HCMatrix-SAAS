import { useMemo } from "react";
import { useCreateCompanySubscriptionStateAndDispatch } from "../stateManagers";
import { TSubscription } from "../types/subscription";
import { getPricePerEmployee } from "../utils";
import { useGetAllExtraStorages } from "./addOns/extraStorage/useGetAllExtraStorages";
import { useGetAllSupportCases } from "./addOns/supportCase/useGetAllSupportCases";
import { useGetAllTrainingSessions } from "./addOns/trainingSession/useGetAllTrainingSessions";

export const useGetCreateCompanySubscriptionSummary = (props: {
  subscriptions?: TSubscription[];
}) => {
  const { subscriptions } = props;

  const {
    state: {
      purchased,
      licensedEmployeeCount,
      unlicensedEmployeeCount,
      priceType = "usd",
      billingCycle = "yearly",
    },
  } = useCreateCompanySubscriptionStateAndDispatch();
  const selectedSubscriptionIds = useMemo(
    () => purchased?.map((subscriptionId) => subscriptionId),
    [purchased]
  );
  const selectedModules = useMemo(
    () =>
      subscriptions?.filter((subscription) =>
        selectedSubscriptionIds?.some((id) => id === subscription.id)
      ) ?? [],
    [selectedSubscriptionIds, subscriptions]
  );
  const totalNoOfUsers = useMemo(
    () => (licensedEmployeeCount ?? 0) + (unlicensedEmployeeCount ?? 0),
    [licensedEmployeeCount, unlicensedEmployeeCount]
  );
  const pricePerLicensedEmployee = selectedModules.reduce(
    (acc, subscription) => {
      return (
        acc +
        getPricePerEmployee({
          subscription,
          selectedPriceType: priceType,
          selectedBillingCycle: billingCycle,
          type: "licensed",
        })
      );
    },
    0
  );
  const pricePerUnLicensedEmployee = selectedModules.reduce(
    (acc, subscription) => {
      return (
        acc +
        getPricePerEmployee({
          subscription,
          selectedPriceType: priceType,
          selectedBillingCycle: billingCycle,
          type: "unlicensed",
        })
      );
    },
    0
  );
  const totalEmployeeCost = useMemo(
    () =>
      (licensedEmployeeCount ?? 0) * pricePerLicensedEmployee +
      (unlicensedEmployeeCount ?? 0) * pricePerUnLicensedEmployee,
    [
      licensedEmployeeCount,
      unlicensedEmployeeCount,
      pricePerLicensedEmployee,
      pricePerUnLicensedEmployee,
    ]
  );
  const { data: storages, isFetching: isFetchingStorages } =
    useGetAllExtraStorages();
  const { data: supportCases, isFetching: isFetchingSupportCases } =
    useGetAllSupportCases();
  const { data: trainingSessions, isFetching: isFetchingTrainingSessions } =
    useGetAllTrainingSessions();
  const vat = 0;
  const discount = 0;
  const supportCasePrice = +(
    supportCases?.data?.find((item) =>
      priceType === "ngn" ? item.priceInNgn : item.priceInUsd
    )?.priceInNgn ?? 0
  );
  const storagePrice = +(
    storages?.data?.find((item) =>
      priceType === "ngn" ? item.priceInNgn : item.priceInUsd
    )?.priceInNgn ?? 0
  );
  const trainingSessionPrice = +(
    trainingSessions?.data?.find((item) =>
      priceType === "ngn" ? item.priceInNgn : item.priceInUsd
    )?.priceInNgn ?? 0
  );
  return {
    isLoading:
      isFetchingStorages ||
      isFetchingSupportCases ||
      isFetchingTrainingSessions,
    selectedModules,
    pricePerLicensedEmployee,
    pricePerUnLicensedEmployee,
    totalNoOfUsers,
    totalEmployeeCost,
    priceType,
    licensedEmployeeCount,
    unlicensedEmployeeCount,
    vat,
    discount,
    totalCost:
      totalEmployeeCost +
      trainingSessionPrice +
      supportCasePrice +
      storagePrice +
      vat -
      discount,
    trainingSessionPrice,
    storagePrice,
    supportCasePrice,
  };
};
