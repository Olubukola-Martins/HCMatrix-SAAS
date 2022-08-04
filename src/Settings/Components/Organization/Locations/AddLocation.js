import React from "react";
import { motion } from "framer-motion";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

const AddLocation = ({ handleDrawer }) => {
  // Handle form
  const initialValues = {
    name: "",
    mail: "",
    country: "",
    description: "",
    state: "",
    timeZone: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Field is required!")
      .min(3, "Must be 3 characters or more"),
    mail: Yup.string()
      .email("Invalid email format")
      .required("Field is required"),
    country: Yup.string().required("Field is required!"),
    description: Yup.string().required("Field is required!"),
    state: Yup.string().required("Field is required!"),
    timeZone: Yup.string().required("Field is required!"),
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
      className="w-96 scrollBar fixed overflow-y-auto bg-card mt-1 right-0 drop-shadow-lg z-50 cursor-move py-2 px-6 pb-8 "
      drag
      style={{ height: "28rem" }}
    >
      {/* filter heading */}
      <div className="flex justify-between text-xl items-center font-light">
        <h5 className="text-accent font-medium text-md">Add Location</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={handleDrawer}
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
            <Form className="whiteBg_form mt-4">
              <div>
                <label>Location Name</label>
                <Field type="text" name="name" />
                <ErrorMessage name="name" component="span" />
              </div>
              <div className="my-3">
                <label>Mail Alias</label>
                <Field type="email" name="mail" />
                <ErrorMessage name="mail" component="span" />
              </div>
              <div>
                <label>Country</label>
                <Field as="select" name="country">
                  <option value="">Select</option>
                  <option value="1">Nigeria</option>
                  <option value="2">Ghana</option>
                </Field>
                <ErrorMessage name="country" component="span" />
              </div>
              <div className="my-3">
                <label>Location Description</label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full resize-none rounded p-2 focus:outline-none"
                />
                <ErrorMessage name="description" component="span" />
              </div>
              <div>
                <label>State</label>
                <Field as="select" name="state">
                  <option value="">Select</option>
                  <option value="1">Lagos</option>
                  <option value="2">Ebony</option>
                </Field>
                <ErrorMessage name="state" component="span" />
              </div>
              <div className="mt-3">
                <label>Time zone</label>
                <Field as="select" name="timeZone">
                  <option value="">Select</option>
                  <option value="1">Nigeria</option>
                  <option value="2">Ghana</option>
                </Field>
                <ErrorMessage name="timeZone" component="span" />
              </div>
              <div className="flex items-center justify-between mt-6">
                <h5
                  type="button"
                  className="font-medium cursor-pointer hover:font-semibold"
                  onClick={handleDrawer}
                >
                  Cancel
                </h5>
                <button
                  type="submit"
                  className="button"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Save Changes
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default AddLocation;
