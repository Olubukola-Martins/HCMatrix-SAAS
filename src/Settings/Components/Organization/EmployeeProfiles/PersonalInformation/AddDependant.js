import React from "react";
import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const AddDependant = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");

  const initialValues = {
    name: "",
    date_of_birth: "",
    email: "",
    phone: "",
    relationship: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: validate,
    date_of_birth: validate,
    email: validate.email("Invalid email format"),
    phone: validate,
    relationship: validate,
  });
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 500 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add dependant</h5>
              <i
                className="fas fa-times cursor-pointer text-xl"
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
                        <label>Name</label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Godswill smile"
                        />
                        <ErrorMessage
                          name="name"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Date of Birth</label>
                        <Field
                          type="text"
                          name="date_of_birth"
                          placeholder="03 - 05 - 2021"
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        <ErrorMessage
                          name="date_of_birth"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Email</label>
                        <Field
                          type="text"
                          name="email"
                          placeholder="johndoe@email.com"
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Phone</label>
                        <Field
                          type="tel"
                          name="phone"
                          placeholder="+234 | 8047463822"
                        />
                        <ErrorMessage
                          name="phone"
                          component="span"
                          className="errorMsg"
                        />
                      </div>
                      <div className="whiteBg_form">
                        <label>Relationship</label>
                        <Field as="select" name="relationship" id="">
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                        </Field>
                        <ErrorMessage
                          name="relationship"
                          component="span"
                          className="errorMsg"
                        />
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

export default AddDependant;
