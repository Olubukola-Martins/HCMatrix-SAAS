import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { PayGradesAndCategoriesContainer } from "../components/PayGradesAndCategoriesContainer";

const PayGradesAndCategoriesPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="Pay Grades & Categories" />
        <PayGradesAndCategoriesContainer />
      </div>
    </>
  );
};

export default PayGradesAndCategoriesPage;
