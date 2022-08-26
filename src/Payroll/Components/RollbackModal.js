import { Modal } from "@mui/material";
import { ErrorMessage, Field, Formik } from "formik";
import React from "react";
import Themes from "../../Themes/Themes";

const RollbackModal = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Themes>
        <div className="CModal" style={{ maxWidth: 400 }}>
          <div className="flex items-center justify-between">
            <h5 className="font-semibold text-lg">Payroll Roll back</h5>
            <i
              onClick={handleClose}
              className="ri-close-line font-semibold text-xl cursor-pointer hover:text-neutral"
            ></i>
          </div>

          <Formik>
            <Form>
              <Field name="email" type="email" />
              <div>
                <label htmlFor="">Reasons for Roll back</label>
                <Field name="reason" as="textarea" />
                <ErrorMessage
                  name="reason"
                  component="span"
                  className="showErrorMsg"
                />
              </div>

              <div className="flex items-center justify-between mt-5">
                <button className="transparentButton">Cancel</button>
                <button className="button">Submit</button>
              </div>
            </Form>
          </Formik>
        </div>
      </Themes>
    </Modal>
  );
};

export default RollbackModal;
