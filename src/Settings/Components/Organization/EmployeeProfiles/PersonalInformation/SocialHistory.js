import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SocialHistory = () => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    smoke: "",
    alcohol: "",
    sports: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    smoke: validate,
    alcohol: validate,
    sports: validate,
  });
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        <Form>
          <div>
            <h5 className="pb-4">Do you Smoke ?</h5>
            <div className="flex items-center gap-6 flex-wrap">
              <label
                htmlFor="sometimes"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Sometimes</span>
                <Field
                  type="radio"
                  name="smoke"
                  id="sometimes"
                  value="sometimes"
                />
              </label>
              <label
                htmlFor="yes"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Yes, regularly</span>
                <Field
                  type="radio"
                  name="smoke"
                  id="yes"
                  value="Yes_regularly"
                />
              </label>
              <label
                htmlFor="never"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Never</span>
                <Field type="radio" name="smoke" id="never" value="never" />
              </label>

              <label
                htmlFor="askMe"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Ask me</span>
                <Field type="radio" name="smoke" id="askMe" value="ask_me" />
              </label>
            </div>
            <ErrorMessage
              name="smoke"
              component="span"
              className="showErrorMsg"
            />
          </div>

          {/* Do you drink alcohol */}
          <div className="my-10">
            <h5 className="pb-4">Do you drink Alcohol ?</h5>
            <div className="flex items-center gap-6 flex-wrap">
              <label
                htmlFor="socially"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Socially</span>
                <Field
                  type="radio"
                  name="alcohol"
                  id="socially"
                  value="socially"
                />
              </label>
              <label
                htmlFor="frequently"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Frequently</span>
                <Field
                  type="radio"
                  name="alcohol"
                  id="frequently"
                  value="frequently"
                />
              </label>
              <label
                htmlFor="alcoholNever"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Never</span>
                <Field
                  type="radio"
                  name="alcohol"
                  id="alcoholNever"
                  value="never"
                />
              </label>

              <label
                htmlFor="alcoholAskMe"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Ask me</span>
                <Field
                  type="radio"
                  name="alcohol"
                  id="alcoholAskMe"
                  value="ask_me"
                />
              </label>
            </div>
            <ErrorMessage
              name="alcohol"
              component="span"
              className="showErrorMsg"
            />
          </div>

          {/* Do you do sports */}
          <div>
            <h5 className="pb-4">Do you do sports ?</h5>
            <div className="flex items-center gap-6 flex-wrap">
              <label
                htmlFor="sportsSometimes"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Sometimes</span>
                <Field
                  type="radio"
                  name="sports"
                  id="sportsSometimes"
                  value="sometimes"
                />
              </label>
              <label
                htmlFor="active"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Active</span>
                <Field type="radio" name="sports" id="active" value="active" />
              </label>
              <label
                htmlFor="sportNever"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Almost Never</span>
                <Field
                  type="radio"
                  name="sports"
                  id="sportNever"
                  value="almost_never"
                />
              </label>

              <label
                htmlFor="sportsAskMe"
                className="flex items-center gap-5 border rounded-3xl py-2 px-3 cursor-pointer text-caramel border-caramel"
              >
                <span>Ask me</span>
                <Field
                  type="radio"
                  name="sports"
                  id="sportsAskMe"
                  value="ask_me"
                />
              </label>
            </div>

            <ErrorMessage
              name="sports"
              component="span"
              className="showErrorMsg"
            />
          </div>
          <button type="submit" className="button mt-7">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default SocialHistory;
