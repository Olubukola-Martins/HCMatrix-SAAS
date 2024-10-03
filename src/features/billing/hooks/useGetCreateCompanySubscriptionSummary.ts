import { useMemo } from "react";
import { useCreateCompanySubscriptionStateAndDispatch } from "../stateManagers";
import { TSubscription } from "../types/subscription";
import { calculatAddonTotalPrice, getPricePerEmployee } from "../utils";
import { useGetAllExtraStorages } from "./addOns/extraStorage/useGetAllExtraStorages";
import { useGetAllSupportCases } from "./addOns/supportCase/useGetAllSupportCases";
import { useGetAllTrainingSessions } from "./addOns/trainingSession/useGetAllTrainingSessions";
import { useGetCompanySubsriptionDiscount } from "./discount/useGetCompanySubsriptionDiscount";
import { useGetBillingVat } from "./vat/useGetBillingVat";

export const useGetCreateCompanySubscriptionSummary = (props: {
  subscriptions?: TSubscription[];
}) => {
  const { subscriptions } = props;
  const { data: discountData, isLoading: isFetchingDiscount } =
    useGetCompanySubsriptionDiscount();
  const { data: vatData, isLoading: isFetchingVat } = useGetBillingVat();

  const {
    state: {
      purchased,
      licensedEmployeeCount,
      unlicensedEmployeeCount,
      priceType = "USD",
      billingCycle = "yearly",
      addOns,
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
  const vatPercentage = +(vatData?.value ?? 0);
  const discountPercentage = +(discountData?.value ?? 0);
  const supportCase = supportCases?.data?.find(
    (item) => item.id === addOns?.supportCaseId
  );
  const supportCasePrice = calculatAddonTotalPrice(
    supportCase?.prices,
    billingCycle,
    priceType
  );
  const storage = storages?.data?.find(
    (item) => item.id === addOns?.extraStorageId
  );
  const storagePrice = calculatAddonTotalPrice(
    storage?.prices,
    billingCycle,
    priceType
  );

  const trainingSession = trainingSessions?.data?.find(
    (item) => item.id === addOns?.trainingSessionId
  );
  const trainingSessionPrice = calculatAddonTotalPrice(
    trainingSession?.prices,
    billingCycle,
    priceType
  );
  const initialTotalCost =
    totalEmployeeCost + trainingSessionPrice + supportCasePrice + storagePrice;
  const vat = vatPercentage ? initialTotalCost * (vatPercentage / 100) : 0;
  const discount = discountPercentage
    ? initialTotalCost * (discountPercentage / 100)
    : 0;
  const totalCost = initialTotalCost + vat - discount;
  return {
    isLoading:
      isFetchingStorages ||
      isFetchingSupportCases ||
      isFetchingTrainingSessions ||
      isFetchingDiscount ||
      isFetchingVat,
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
    totalCost,
    trainingSessionPrice,
    storagePrice,
    supportCasePrice,
    vatPercentage,
    discountPercentage,
  };
};

// TODO: Update the discount to account for when its an amount and not a percentage, also add type, refer to backend for this
