import Modal from "@mui/material/Modal";
import Themes from "../../../../../Themes/Themes";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const WorkExperienceForm = ({ open, handleClose }) => {
  const validate = Yup.string().required("Field is Required!");
  const initialValues = {
    organization: "",
    position: "",
    start_date: "",
    end_date: "",
  };

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    organization: validate,
    position: validate,
    start_date: validate,
    end_date: validate,
  });
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 400 }}>
            <div className="flex items-center justify-between w-full mb-5">
              <h5 className="text-base font-semibold">Add Work Experience</h5>
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
                      <label>Organization</label>
                      <Field
                        type="text"
                        name="organization"
                        className="Enter organization"
                        placeholder="Enter organization"
                      />
                    </div>

                    <div className="whiteBg_form my-4">
                      <label>Position</label>
                      <Field
                        name="position"
                        type="text"
                        placeholder="Enter position"
                      />
                      <ErrorMessage
                        name="position"
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
                        name="end_date"
                        placeholder="03 - 05 - 2021"
                        onFocus={(e) => (e.target.type = "date")}
                        onBlur={(e) => (e.target.type = "text")}
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
                        type="submit"
                        className="button"
                        disabled={!formik.isValid || formik.isSubmitting}
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

export default WorkExperienceForm;
