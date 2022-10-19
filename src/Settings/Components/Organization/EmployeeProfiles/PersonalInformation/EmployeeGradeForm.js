import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const EmployeeGradeForm = ({ open, handleClose }) => {
  const initialValues = {
    grade: "",
    suspension_date: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    grade: Yup.string().required("Field is Required!"),
    suspension_date: Yup.string().required("Field is Required"),
  });

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Change User grade</h5>
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
                      <label>Grade</label>
                      <Field name="grade" as="select">
                        <option value="Grade_1">Grade 1</option>
                        <option value="Grade_2">Grade 2</option>
                      </Field>
                      <ErrorMessage
                        name="grade"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>

                    <div className="whiteBg_form mt-4">
                      <label>Effective date</label>
                      <Field
                        type="date"
                        name="suspension_date"
                        placeholder="03 - 05 - 2021"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
                      />
                      <ErrorMessage
                        name="suspension_date"
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

export default EmployeeGradeForm;
