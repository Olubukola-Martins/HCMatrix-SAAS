import React, { useEffect, useState } from "react";
import { MinusCircleOutlined } from "@ant-design/icons";
import { Button, Form, InputNumber, Select, Skeleton } from "antd";
import { generalValidationRules } from "utils/formHelpers/validation";
import { CURRENCY_OPTIONS } from "constants/currencies";
import { AppButton } from "components/button/AppButton";
import { useGetCompanyParams } from "features/core/company/hooks/useGetCompanyParams";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { openNotification } from "utils/notifications";
import { AddExchangeRate } from "./AddExchangeRate";
import { useGetExchangeRates } from "features/payroll/hooks/exhangeRates/useGetExchangeRates";
import { ExchangeRatesTable } from "./ExchangeRatesTable";

export const ExchangeRateContainer = () => {
  // There should be view and edit state for conditional ui
  return (
    <div className="mt-4 bg-card py-6 px-6 flex justify-center gap-4">
      <div className="flex flex-col gap-4 w-3/4 items-stretch ">
        <ExchangeRateForm />
      </div>
    </div>
  );
};

const ExchangeRateForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };

  const { data: companyParams, isFetching: isFetchingCompanyParams } =
    useGetCompanyParams();
  const { data: rates, isFetching: isFetchingRates } = useGetExchangeRates();

  const [parsedCurrencyOptions, setParsedCurrencyOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const navigate = useNavigate();

  useEffect(() => {
    const baseCurrency = companyParams?.value.currencySettings?.baseCurrency;
    if (!baseCurrency && !isFetchingCompanyParams) {
      navigate(appRoutes.companyDetailsSettings);
      openNotification({
        description: `Please set your company's base currency before setting up exhange rates`,
        title: "Missing Base Currency",
        duration: 5,
        state: "error",
      });
    }
    if (baseCurrency && rates && !isFetchingCompanyParams) {
      const options = CURRENCY_OPTIONS.filter(
        (item) => item.value !== baseCurrency
      ).filter((item) =>
        rates.data.find((rate) => rate.currency === item.value) ? false : true
      );
      setParsedCurrencyOptions(options);
    }
  }, [companyParams, navigate, rates, isFetchingCompanyParams]);
  const [add, setAdd] = useState(false);

  return (
    <Skeleton active paragraph={{ rows: 5 }} loading={isFetchingCompanyParams}>
      <p className="text-center">
        Base Currency - {companyParams?.value.currencySettings?.baseCurrency}
      </p>
      <div className="w-full">
        <div className="flex flex-col gap-4">
          {/* add member to group form */}
          <div className="flex justify-end">
            <AppButton label="Add Rate" handleClick={() => setAdd(true)} />
          </div>
          {add && (
            <AddExchangeRate
              currencyOptions={parsedCurrencyOptions}
              onCancel={() => setAdd(false)}
            />
          )}
          {/* list of rates and ability to edit */}
          {rates && (
            <ExchangeRatesTable data={rates.data} loading={isFetchingRates} />
          )}
        </div>
      </div>
    </Skeleton>
  );
};
