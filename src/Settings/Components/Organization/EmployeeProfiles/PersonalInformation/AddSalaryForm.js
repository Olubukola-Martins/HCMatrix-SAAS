import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddSalaryForm = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    salary: "",
    effective_date: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    salary: validate,
    effective_date: validate,
  });
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add New Salary</h5>
              <i
                class="fas fa-times cursor-pointer text-xl"
                onClick={handleClose}
              ></i>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              validateOnMount
            >
              {(formik) => {
                return (
                  <Form>
                <div className="whiteBg_form">
                  <label>Salary</label>
                  <Field
                    type="number"
                    placeholder="Enter salary"
                    name="salary"
                  />
                  <ErrorMessage
                    name="salary"
                    component="span"
                    className="showErrorMsg"
                  />
                </div>
                <div className="whiteBg_form mt-4">
                  <label>Effective date</label>
                  <Field
                    type="text"
                    name="effective_date"
                    placeholder="03 - 05 - 2021"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                  />
                  <ErrorMessage
                    name="effective_date"
                    component="span"
                    className="showErrorMsg"
                  />
                </div>
                <div className="flex items-center justify-between mt-5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="transparentButton"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button" disabled={!formik.isValid || formik.isSubmitting}>
                    Submit
                  </button>
                </div>
              </Form>
                )
              }}
            </Formik>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default AddSalaryForm;
