import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AssignJobRole = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    department: "",
    job_role: "",
    start_date: "",
    end_date: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    department: validate,
    job_role: validate,
    start_date: validate,
    end_date: validate,
  });

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Assign Job role</h5>
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
                      <label>Department</label>
                      <Field as="select" name="department">
                        <option value="">Select department</option>
                        <option value="Grade_1">App dev</option>
                        <option value="Grade_2">Sales</option>
                      </Field>
                      <ErrorMessage
                        name="department"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                    <div className="whiteBg_form my-4">
                      <label>Job Role</label>
                      <Field as="select" name="job_role">
                        <option value="">select role</option>
                        <option value="Grade_1">Backend dev</option>
                        <option value="Grade_2">Frontend dev</option>
                      </Field>
                      <ErrorMessage
                        name="job_role"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>

                    <div className="whiteBg_form">
                      <label>Start Date</label>
                      <Field
                        type="text"
                        name="start_date"
                        placeholder="03 - 05 - 2021"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                      <ErrorMessage
                        name="start_date"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                    <div className="whiteBg_form mt-4">
                      <label>End Date</label>
                      <Field
                        type="text"
                        placeholder="03 - 05 - 2021"
                        name="end_date"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                      <ErrorMessage
                        name="end_date"
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
                      <button
                        disabled={!formik.isValid || formik.isSubmitting}
                        type="submit"
                        className="button"
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default AssignJobRole;
