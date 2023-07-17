import { PageIntro } from "components/layout/PageIntro";
import React from "react";
import { LeaningNavbar } from "../components/LeaningNavbar";

export const AddTraining = () => {
  return (
    <>
      <LeaningNavbar active="training" />
      <div className="Container">
        <PageIntro link="" title="Add Training" />
      </div>
    </>
  );
};
