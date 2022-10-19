import React from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const InviteUserDrawer = ({ handleDrawer }) => {
  // initial values
  const initialValues = {
    employeeId: "",
    fullName: "",
    email: "",
  };

  // onsubmit
  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  // Validate form
  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Please enter employee ID"),
    fullName: Yup.string().required("Please enter full name"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });

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
      <div className="flex justify-between text-xl items-center font-light py-2 px-4">
        <h5 className="text-accent">Invite User</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* content */}
      <div className="mt-4 text-accent">
        {/* band */}
        <div className="px-6 py-3 bg-caramel flex items-center justify-between">
          <h6 className="text-sm">Employee Added: 2</h6>
          <h6 className="text-sm">License count left: 5</h6>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          {(formik) => {
            return (
              <div className="px-6 mt-4">
                <Form className="text-accent mt-6 grid grid-cols-1 gap-4">
                  <p className="mb-2">
                    Fill in the mandatory fields, and click invite.
                  </p>
                  <div>
                    <div className="input-container w-full">
                      <label className="text-sm mb-2 block">Employee ID</label>
                      <Field
                        type="text"
                        placeholder="Employee Id"
                        name="employeeId"
                        className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                      />
                      <ErrorMessage name="employeeId" component="span" />
                    </div>
                  </div>
                  <div>
                    <div className="input-container w-full">
                      <label className="text-sm mb-2 block">Full name</label>
                      <Field
                        type="text"
                        name="fullName"
                        placeholder="First Name                      Last Name"
                        className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                      />
                      <ErrorMessage name="fullName" component="span" />
                    </div>
                  </div>
                  <div>
                    <div className="input-container w-full">
                      <label className="text-sm mb-2 block">
                        Email Address
                      </label>
                      <Field
                        type="text"
                        name="email"
                        placeholder="Email Address"
                        className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                      />
                      <ErrorMessage name="email" component="span" />
                    </div>
                  </div>
                  {/* ctrl btns */}
                  <div className="form-buttons flex gap-4 mt-2">
                    <button
                      disabled={!formik.isValid || formik.isSubmitting}
                      type="submit"
                      className="button"
                    >
                      Invite
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </motion.div>
  );
};

export default InviteUserDrawer;
