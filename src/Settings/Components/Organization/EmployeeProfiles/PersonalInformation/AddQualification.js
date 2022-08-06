import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddQualification = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    qualification: "",
    grade: "",
    year: "",
    title: "",
    institution: "",
    course: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    qualification: validate,
    grade: validate,
    year: validate,
    title: validate,
    institution: validate,
    course: validate,
  });
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 500 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add Qualification</h5>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="whiteBg_form">
                        <label>Qualification</label>
                        <Field as="select" name="qualification">
                          <option value="">Select qualification</option>
                          <option value="bachelor">Bachelor</option>
                          <option value="phd">PHD</option>
                        </Field>
                        <ErrorMessage
                          name="qualification"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Title</label>
                        <Field
                          type="text"
                          name="title"
                          placeholder="Qualification Title"
                        />
                        <ErrorMessage
                          name="title"
                          component="span"
                          className="errorMsg"
                        />
                      </div>

                      <div className="whiteBg_form">
                        <label>Institution</label>
                        <Field
                          type="text"
                          name="institution"
                          placeholder="Institution"
                        />
                        <ErrorMessage
                          name="institution"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Year</label>
                        <Field
                          type="text"
                          name="year"
                          placeholder="03 - 05 - 2021"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        <ErrorMessage
                          name="year"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Course</label>
                        <Field
                          type="text"
                          name="course"
                          placeholder="User experience design"
                        />
                        <ErrorMessage
                          name="course"
                          component="span"
                          className="errorMsg"
                        />
                      </div>

                      <div className="whiteBg_form">
                        <label>Grade</label>
                        <Field name="grade" as="select">
                          <option value="">Select grade</option>
                          <option value="grade_1">Grade A</option>
                          <option value="grade_2">Grade B</option>
                        </Field>
                        <ErrorMessage
                          name="grade"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-around mt-5">
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

export default AddQualification;
