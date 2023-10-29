import { appRoutes } from "config/router/paths";
import { CURRENCIES } from "constants/currencies";
import { useGetCompanyParamSetting } from "features/core/company/hooks/useGetCompanyParamSetting";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TCurrency } from "types/currencies";
import { openNotification } from "utils/notifications";

export const useGetCompanyBaseCurrency = () => {
  const navigate = useNavigate();
  const { data: companyParams, isFetching: isFetchingCompanyParams } =
    useGetCompanyParamSetting();

  const [baseCurrency, setBaseCurrency] = useState<TCurrency>();

  useEffect(() => {
    const currency = CURRENCIES.find(
      (item) =>
        item.currency === companyParams?.value.currencySettings?.baseCurrency
    );
    setBaseCurrency(currency);

    if (!currency && !isFetchingCompanyParams) {
      navigate(appRoutes.companyDetailsSettings);
      openNotification({
        description: `Please set your company's base currency before setting up exhange rates`,
        title: "Missing Base Currency",
        duration: 5,
        state: "error",
      });
    }
  }, [baseCurrency, companyParams, isFetchingCompanyParams, navigate]);

  return {
    baseCurrency,
    loading: isFetchingCompanyParams,
  };
};
