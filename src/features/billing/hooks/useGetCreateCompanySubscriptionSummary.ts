import { useMemo } from "react";
import {
  calculateTotalAmountFromSubscriptionPrices,
  calculateCompanyDiscount,
} from "../utils";
import { useGetAllExtraStorages } from "./addOns/extraStorage/useGetAllExtraStorages";
import { useGetAllSupportCases } from "./addOns/supportCase/useGetAllSupportCases";
import { useGetAllTrainingSessions } from "./addOns/trainingSession/useGetAllTrainingSessions";
import { useGetCompanySubsriptionDiscount } from "./discount/useGetCompanySubsriptionDiscount";
import { useGetBillingVat } from "./vat/useGetBillingVat";
import { TBillingCycle } from "../types/billingCycle";
import { TSubscriptionPriceType } from "../types/priceType";
import { useGetUnlicensedEmployeeAddOn } from "./addOns/unlicensedEmployee/useGetUnlicensedEmployeeAddOn";
import { useGetRemainingFundsForActiveSubscription } from "./company/useGetRemainingFundsForActiveSubscription";
import { useCreateCompanySubscriptionStateAndDispatch } from "../stateManagers";

export const useGetCreateCompanySubscriptionSummary = (props: {
  cycle?: TBillingCycle;
  currency?: TSubscriptionPriceType;
}) => {
  const { cycle = "monthly", currency = "USD" } = props;
  const {
    state: {
      licensedEmployeeCount,
      unlicensedEmployeeCount,
      planOrModulePrices,
      addOns,
    },
  } = useCreateCompanySubscriptionStateAndDispatch();
  const totalSubscriptionAmount = calculateTotalAmountFromSubscriptionPrices({
    prices: planOrModulePrices,
    cycle,
    currency,
  });
  const { data: discountData, isLoading: isFetchingDiscount } =
    useGetCompanySubsriptionDiscount();
  const { data: vatData, isLoading: isFetchingVat } = useGetBillingVat();
  const {
    data: unlicensedEmployeeAddOn,
    isLoading: isLoadingUnlicensedEmployeeAddOn,
  } = useGetUnlicensedEmployeeAddOn();
  const { data: remainingFunds, isLoading: isLoadingRemainingFunds } =
    useGetRemainingFundsForActiveSubscription();
  const remainingFundsAmount = +(remainingFunds?.data || 0);

  const pricePerLicensedEmployee = totalSubscriptionAmount;
  const pricePerUnLicensedEmployee = calculateTotalAmountFromSubscriptionPrices(
    { prices: unlicensedEmployeeAddOn?.data?.[0].prices, cycle, currency }
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

  const supportCasePrice = calculateTotalAmountFromSubscriptionPrices({
    prices: supportCases?.data?.find((s) => s.id === addOns?.supportCaseId)
      ?.prices,
    cycle,
    currency,
  });
  const storagePrice = calculateTotalAmountFromSubscriptionPrices({
    prices: storages?.data?.find((s) => s.id === addOns?.extraStorageId)
      ?.prices,

    cycle,
    currency,
  });
  const trainingSessionPrice = calculateTotalAmountFromSubscriptionPrices({
    prices: trainingSessions?.data?.find(
      (s) => s.id === addOns?.trainingSessionId
    )?.prices,

    cycle,
    currency,
  });

  const initialTotalCost =
    totalEmployeeCost + trainingSessionPrice + supportCasePrice + storagePrice;
  const vat = vatPercentage ? initialTotalCost * (vatPercentage / 100) : 0;

  const discount = calculateCompanyDiscount({ initialTotalCost, discountData });
  const discountPercentage = (discount / initialTotalCost) * 100;
  const totalCost = initialTotalCost + vat - (discount + remainingFundsAmount);

  const totalNoOfUsers =
    +(licensedEmployeeCount || 0) + +(unlicensedEmployeeCount || 0);
  return {
    isLoading:
      isLoadingUnlicensedEmployeeAddOn ||
      isFetchingStorages ||
      isFetchingSupportCases ||
      isFetchingTrainingSessions ||
      isFetchingDiscount ||
      isFetchingVat ||
      isLoadingRemainingFunds,
    remainingFundsAmount,
    pricePerLicensedEmployee,
    pricePerUnLicensedEmployee,
    totalNoOfUsers,
    totalEmployeeCost,
    currency,
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
    cycle,
  };
};

// TODO: Update the discount to account for when its an amount and not a percentage, also add type, refer to backend for this
