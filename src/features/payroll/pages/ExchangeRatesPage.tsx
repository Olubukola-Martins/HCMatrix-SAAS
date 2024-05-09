import React from "react";
import { ExchangeRateContainer } from "../components/exchangeRates/ExchangeRateContainer";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";

const ExchangeRatesPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Exchange Rates" />
        <ExchangeRateContainer />
      </div>
    </>
  );
};

export default ExchangeRatesPage;
