import React from "react";

import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddDepartmentDrawer = ({ handleDrawer }) => {
  // Handle form
  const initialValues = {
    departmentName: "",
    mailAlias: "",
    departmentHead: "",
    parentDepartment: "",
  };

  const validationSchema = Yup.object({
    departmentName: Yup.string()
      .required("Field is required!")
      .min(3, "Must be 3 characters or more"),
    mailAlias: Yup.string()
      .email("Invalid email format")
      .required("Field is required"),
    departmentHead: Yup.string().required("Field is required!"),
    parentDepartment: Yup.string().required("Field is required!"),
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
        <h5 className="text-accent">Add Department</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* content */}
      <div className="mt-4 text-accent">
        {/* form */}
        <div className="px-6 mt-4 add-department-form">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div className="text-accent mt-6 grid grid-cols-1 gap-8">
                    <div>
                      <div className="input-container w-full">
                        <label>Department Name</label>
                        <Field
                          name="departmentName"
                          type="text"
                          placeholder="Marketing"
                        />
                        <ErrorMessage name="departmentName" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container">
                        <label>Mail Alias</label>
                        <Field
                          name="mailAlias"
                          type="email"
                          placeholder="eg. johndoe@gmail.com"
                        />
                        <ErrorMessage name="mailAlias" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container">
                        <label>Department head</label>
                        <Field
                          name="departmentHead"
                          type="text"
                          placeholder="John Potter"
                        />
                        <ErrorMessage name="departmentHead" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container">
                        <label>Parent Department</label>
                        <Field
                          as="select"
                          name="parentDepartment"
                          placeholder="select"
                        >
                          <option className="sales">Sales</option>
                          <option className="App dev">App Development</option>
                        </Field>
                        <ErrorMessage
                          name="parentDepartment"
                          component="span"
                        />
                      </div>
                    </div>

                    {/* ctrl btns */}
                    <div className="form-buttons flex justify-between mt-2">
                      <button
                        type="button"
                        className="py-2 px-4 rounded text-sm font-medium"
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
      </div>
    </motion.div>
  );
};

export default AddDepartmentDrawer;
