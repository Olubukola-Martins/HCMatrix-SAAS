import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { CURRENCY_OPTIONS } from "constants/currencies";
import { AppButton } from "components/button/AppButton";

import { AddExchangeRate } from "./AddExchangeRate";
import { useGetExchangeRates } from "features/payroll/hooks/exhangeRates/useGetExchangeRates";
import { ExchangeRatesTable } from "./ExchangeRatesTable";
import { useGetCompanyBaseCurrency } from "hooks/useGetCompanyBaseCurrency";

interface IProps {
  onlyView?: boolean;
}
export const ExchangeRateContainer: React.FC<IProps> = ({
  onlyView = false,
}) => {
  // There should be view and edit state for conditional ui
  return (
    <div className="mt-4 bg-card py-6 px-6 flex justify-center gap-4">
      <div className="flex flex-col gap-4 w-3/4 items-stretch ">
        <ExchangeRateForm onlyView={onlyView} />
      </div>
    </div>
  );
};

const ExchangeRateForm: React.FC<IProps> = ({ onlyView }) => {
  const { data: rates, isFetching: isFetchingRates } = useGetExchangeRates();

  const [parsedCurrencyOptions, setParsedCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { baseCurrency, loading: isBaseCurrencyLoading } =
    useGetCompanyBaseCurrency();

  useEffect(() => {
    if (baseCurrency && rates && !isBaseCurrencyLoading) {
      const options = CURRENCY_OPTIONS.filter(
        (item) => item.value !== baseCurrency.currency
      ).filter((item) =>
        rates.data.find((rate) => rate.currency === item.value) ? false : true
      );
      setParsedCurrencyOptions(options);
    }
  }, [rates, isBaseCurrencyLoading, baseCurrency]);
  const [add, setAdd] = useState(false);

  return (
    <Skeleton active paragraph={{ rows: 5 }} loading={isBaseCurrencyLoading}>
      <div className="flex justify-center">
        <p className="text-center font-bold px-6 py-2 shadow-md  bg-white rounded-md">
          Base Currency - {baseCurrency?.currency}
        </p>
      </div>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {/* add member to group form */}
          {!onlyView && (
            <div className="flex justify-end">
              <AppButton label="Add Rate" handleClick={() => setAdd(true)} />
            </div>
          )}
          {add && (
            <AddExchangeRate
              currencyOptions={parsedCurrencyOptions}
              onCancel={() => setAdd(false)}
            />
          )}
          {/* list of rates and ability to edit */}
          {rates && (
            <ExchangeRatesTable
              data={rates.data}
              loading={isFetchingRates}
              defaultCompanyCurrency={baseCurrency?.currency}
              onlyView={onlyView}
            />
          )}
        </div>
      </div>
    </Skeleton>
  );
};
