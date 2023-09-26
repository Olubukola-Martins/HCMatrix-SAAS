import React from "react";
import { PageIntro } from "components/layout/PageIntro";
import PayrollSubNav from "../components/PayrollSubNav";
import { NSITFAuthContainer } from "../components/organizations/nsitfAuthorities/NSITFAuthContainer";

const NSITFAuthPage = () => {
  return (
    <>
      <PayrollSubNav />
      <div className="Container">
        <PageIntro title="NSITF Authorities" />
        <NSITFAuthContainer />
      </div>
    </>
  );
};

export default NSITFAuthPage;
