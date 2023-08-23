import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { ITFAuthContainer } from "../components/itfAuthorities/ITFAuthContainer";

const ITFAuthPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="ITF Authorities" />
        <ITFAuthContainer />
      </div>
    </>
  );
};

export default ITFAuthPage;
