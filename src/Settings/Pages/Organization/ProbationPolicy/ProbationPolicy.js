import React from "react";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProbationPolicy = () => {
  // Handle form
  const initialValues = {
    probationPeriod: "",
    probationReminder: "",
    notifyRole: "",
    automaticProbation: "",
  };

  const validationSchema = Yup.object({
    probationPeriod: Yup.string().required("Field is required!"),
    notifyRole: Yup.string()
      .email("Invalid email format")
      .required("Field is required"),
  });

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <DashboardLayout>
      <div className="  mt-3 h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/departments">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-lg font-bold">Probation Policy</h5>
          </div>
        </div>

        <div className="bg-card mt-5 pt-4 pb-10 px-4 rounded-md">
          <h3 className="text-accent text-lg mb-4">Probation Policy:</h3>
          <div className="mt-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="text-accent mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-5">
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Probation period
                        </label>
                        <Field
                          type="text"
                          name="probationPeriod"
                          placeholder="eg. UI/UX Designer"
                          className="w-full bg-mainBg rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="probationPeriod" component="span" />
                      </div>

                      <div className="lg:mt-6">
                        <label
                          htmlFor="probation"
                          className="text-sm mb-2 block cursor-pointer hover:text-caramel"
                        >
                          Probation reminder
                        </label>
                        <Field
                          type="checkbox"
                          id="probation"
                          className="mb-2 scale-150"
                          name="probationReminder"
                          values="probation Reminder"
                        />
                      </div>

                      <div className="input-container w-full">
                        <label htmlFor="notify" className="text-sm mb-2 block">
                          Notify role
                        </label>
                        <Field
                          type="text"
                          id="notify"
                          name="notifyRole"
                          placeholder="eg. johndoe@gmail.com"
                          className="w-full bg-mainBg rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="notifyRole" component="span" />
                      </div>

                      <div className="lg:mt-6">
                        <label
                          htmlFor="status"
                          className="text-sm cursor-pointer hover:text-caramel"
                        >
                          Automatic probation status change
                        </label>
                        <Field
                          type="checkbox"
                          id="status"
                          name="automaticProbation"
                          className="scale-150 block mt-2"
                          values="Automatic probation"
                        />
                      </div>

                      {/* ctrl btns - edit n delete */}
                      <div className="form-buttons flex justify-end mt-4">
                        <button
                          disabled={!formik.isValid || formik.isSubmitting}
                          className="button"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProbationPolicy;
