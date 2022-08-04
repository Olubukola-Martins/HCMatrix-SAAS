import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UploadFile = ({ handleActiveStep }) => {
  const initialValues = {
    dataFor: "",
    basedOn: "",
  };

  const validationSchema = Yup.object({
    dataFor: Yup.string().required("Field is required!"),
    basedOn: Yup.string().required("What is the import based on!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    // the axios call will be made here
    // alogside the notifications
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <div className="px-6 mt-4">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form className="text-accent mt-6 grid grid-cols-1 gap-5">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Import data for:</label>

                  <Field
                    component="select"
                    placeholder="Employee"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    name="dataFor"
                  >
                    <option className="bg-card">Employee</option>
                    <option className="bg-card">line manager</option>
                  </Field>
                  <ErrorMessage name="dataFor" component="span" />
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Import based on:</label>

                  <Field
                    component="select"
                    placeholder="Employee"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    name="basedOn"
                  >
                    <option className="bg-card">Select</option>
                    <option className="bg-card">Employee</option>
                    <option className="bg-card">line manager</option>
                  </Field>
                  <ErrorMessage name="basedOn" component="span" />
                </div>
              </div>
              <div>
                <div className="flex flex-col align-center text-center text-xs border border-dotted border-gray-400 px-1 py-2 gap-3 pb-4">
                  <i className="ri-upload-2-line text-caramel text-2xl cursor-pointer"></i>
                  <h6 className="text-bold text-base mb-2">
                    Choose file to be Imported
                  </h6>
                  <p className="text-light">
                    [only xls,xlsx and csv formats are supported] Maximum upload
                    file size is 5 MB.
                  </p>
                  <div className="button-container mt-2">
                    <button
                      className="py-1 px-2 rounded text-sm text-caramel border font-medium"
                      style={{ borderColor: "var(--caramel)" }}
                    >
                      Upload file
                    </button>
                  </div>
                  <p className="mt-2">Download Sample template for import</p>
                </div>
              </div>

              {/* ctrl btns */}
              <div className="form-buttons flex justify-between mt-2 mb-4">
                <button className="py-2 px-4  rounded text-sm  font-medium">
                  Cancel
                </button>
                <button
                  className="button"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  onClick={() => handleActiveStep((val) => val + 1)}
                >
                  Save next
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default UploadFile;
