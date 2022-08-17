import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const AddDesignationDrawer = ({ handleDrawer }) => {
  // Handle form
  const initialValues = {
    name: "",
    department: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Field is required!"),
    department: Yup.string().required("Field is required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <motion.div
      initial={{ x: 500 }}
      animate={{
        x: 0,
      }}
      transition={{ ease: "easeIn" }}
      exit={{ x: 500 }}
      className="w-96 fixed overflow-y-auto mode_color right-0 drop-shadow-lg z-50 cursor-move pb-8"
      drag
      style={{ height: "28rem" }}
    >
      {/* filter heading */}
      <div className="flex justify-between text-xl items-center font-light py-2 px-4 mt-4">
        <h5 className="text-accent">Add Designation</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* content */}
      <div className="mt-4 text-accent">
        {/* form */}
        <div className="px-6 mt-4">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div className="text-accent mt-6 grid grid-cols-1 gap-8 add-designation-form">
                    <div className="input-container">
                      <label>Designation Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="eg. UI/UX Designer"
                      />
                      <ErrorMessage name="name" component="span" />
                    </div>

                    <div className="input-container">
                      <label>Department</label>
                      <Field as="select" name="department">
                        <option value="">Select department</option>
                        <option value="Department-2">Department 2</option>
                        <option value="Department-3">Department 2</option>
                      </Field>
                      <ErrorMessage name="department" component="span" />
                    </div>

                    {/* ctrl btns */}
                    <div className="form-buttons flex justify-between mt-2">
                      <button
                        type="button"
                        className="py-2 px-4 rounded text-sm font-medium"
                        onClick={() => handleDrawer("")}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!formik.isValid || formik.isSubmitting}
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
      </div>
    </motion.div>
  );
};

export default AddDesignationDrawer;
