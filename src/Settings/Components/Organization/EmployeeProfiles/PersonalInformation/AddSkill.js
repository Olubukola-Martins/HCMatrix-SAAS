import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddSkill = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    skill: "",
    competency: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    skill: validate,
    competency: validate,
  });

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add New Skill</h5>
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
                      <label>Skill</label>
                      <Field
                        type="text"
                        name="skill"
                        placeholder="Enter skill"
                      />
                      <ErrorMessage
                        name="skill"
                        component="span"
                        className="errorMsg"
                      />
                    </div>
                    <div className="whiteBg_form mt-4">
                      <label>Competency</label>
                      <Field name="competency" as="select">
                        <option value="">Select</option>
                        <option value="grade_1">Grade 1</option>
                        <option value="grade_2">Grade 2</option>
                      </Field>
                      <ErrorMessage
                        name="competency"
                        component="span"
                        className="errorMsg"
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

export default AddSkill;
