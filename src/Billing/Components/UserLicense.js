import { Modal } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import Themes from "../../Themes/Themes";
import * as Yup from "yup";

const UserLicense = ({ open, handleClose }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <i
              onClick={handleClose}
              className="ri-close-fill cursor-pointer text-2xl font-semibold text-right flex justify-end"
            ></i>
            <h3 className="font-semibold text-lg">User license</h3>
            <p className="text-sm pb-5">
              Input the number of employees and the number of years you want to
              pay for.
            </p>

            <Formik
              initialValues={{
                userLicenseNumber: "",
                duration: "",
              }}
              validationSchema={Yup.object({
                userLicenseNumber: Yup.string().required("Field is required!"),
                duration: Yup.string().required("Field is required!"),
              })}
            >
              <Form>
                <div className="form-control">
                  <label className="block mb-1 font-medium text-sm">
                    Number of user license
                  </label>
                  <Field
                    name="userLicenseNumber"
                    className="w-full rounded-md py-3 px-3 border border-gray-300 focus:outline-none bg-mainBg"
                  />
                  <ErrorMessage
                    name="userLicenseNumber"
                    component="span"
                    className="showErrorMsg"
                  />
                </div>

                <div className="form-control mt-5">
                  <label className="block mb-1 font-medium text-sm">
                    Subscription Duration
                  </label>
                  <Field
                    as="select"
                    name="duration"
                    className="w-full rounded-md py-3 px-3 border border-gray-300 focus:outline-none bg-mainBg"
                  >
                    <option value="">Select</option>
                    <option value="1">1 Year</option>
                    <option value="2">2 Years</option>
                  </Field>
                  <ErrorMessage
                    name="duration"
                    component="span"
                    className="showErrorMsg"
                  />
                </div>

                <div className="flex justify-around mt-5">
                  <button
                    onClick={handleClose}
                    type="button"
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

export default UserLicense;
