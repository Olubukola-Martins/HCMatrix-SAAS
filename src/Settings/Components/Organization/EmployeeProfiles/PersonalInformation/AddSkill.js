import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddSkill = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    skill: "",
    Competency: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    skill: validate,
    Competency: validate,
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
              <Form>
                <div className="whiteBg_form">
                  <label>Skill</label>
                  <Field type="text" name="Skill" placeholder="Enter skill"/>
                  <ErrorMessage name="skill" component="" className="errorMsg"/>
                </div>
                <div className="whiteBg_form mt-4">
                  <label>Competency</label>
                  <Field name="competency" as="select" id="">
                    <option value="">Select</option>
                    <option value="great">Grade 1</option>
                    <ErrorMessage name="competency" component="" className="errorMsg"/>
                  </Field>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="transparentButton"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="button">
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </Themes>
      </Modal>
    </>
  );
};

export default AddSkill;
