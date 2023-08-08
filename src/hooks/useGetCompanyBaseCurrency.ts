import { appRoutes } from "config/router/paths";
import { useGetCompanyParams } from "features/core/company/hooks/useGetCompanyParams";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { openNotification } from "utils/notifications";

export const useGetCompanyBaseCurrency = () => {
  const navigate = useNavigate();
  const { data: companyParams, isFetching: isFetchingCompanyParams } =
    useGetCompanyParams();

  const baseCurrency = companyParams?.value.currencySettings?.baseCurrency;
  useEffect(() => {
    if (!baseCurrency && !isFetchingCompanyParams) {
      navigate(appRoutes.companyDetailsSettings);
      openNotification({
        description: `Please set your company's base currency before setting up exhange rates`,
        title: "Missing Base Currency",
        duration: 5,
        state: "error",
      });
    }
  }, [baseCurrency, isFetchingCompanyParams, navigate]);

  return {
    baseCurrency,
    loading: isFetchingCompanyParams,
  };
};
