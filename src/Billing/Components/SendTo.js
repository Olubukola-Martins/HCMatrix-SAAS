import { Modal } from "@mui/material";
import React from "react";
import Themes from "../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SendTo = ({ open, handleClose }) => {
  const onSubmit = (values) => {};

  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between mb-12">
            <h5 className="text-lg font-medium">Input Email</h5>
            <i
              className="fas fa-times cursor-pointer text-xl flex justify-end"
              onClick={handleClose}
            ></i>
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .required("Field is Required!")
                .email("Invalid email format"),
            })}
            onSubmit={onSubmit}
          >
            <Form>
              <div>
                <Field
                  type="email"
                  name="email"
                  className="w-full py-3 rounded border border-gray-400 px-2 focus:outline-none placeholder:text-accent"
                  placeholder="johndoe@gmail"
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="showErrorMsg"
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
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Themes>
    </Modal>
  );
};

export default SendTo;
