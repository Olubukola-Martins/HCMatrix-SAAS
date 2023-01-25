import React from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { PageIntro } from "Layout/Components/PageIntro";
import ProbationPolicyForm from "Settings/Components/Organization/ProbationPolicy/ProbationPolicyForm";

const ProbationPolicy = () => {
  return (
    <DashboardLayout>
      <div className="Container">
        <div className="flex flex-col gap-6">
          <PageIntro title="Probation Policy" link="/settings" />
          <div className="bg-slate-100 px-6 py-4 rounded-md">
            <ProbationPolicyForm />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProbationPolicy;
