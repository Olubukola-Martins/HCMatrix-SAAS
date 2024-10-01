import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import { PayGradesAndCategoriesContainer } from "../components/PayGradesAndCategoriesContainer";

const PayGradesAndCategoriesPage = () => {
  return (
    <>
      <div className="Container">
        <PageIntro title="Grades & Categories" link />
        <PayGradesAndCategoriesContainer />
      </div>
    </>
  );
};

export default PayGradesAndCategoriesPage;
