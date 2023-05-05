import React from "react";

import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddPayGradeDrawer: React.FC<any> = ({ handleDrawer }) => {
  const initialValues = {
    level: "",
    gradeCategory: "",
    groupEmail: "",
    leaveLength: "",
  };

  const validationSchema = Yup.object({
    level: Yup.string()
      .required("Level is required!")
      .min(5, "Must be 4 characters or more"),

    gradeCategory: Yup.string().required("Grade Category is required"),

    leaveLength: Yup.string().required("Leave length is required!"),
    monthlyGross: Yup.string()
      .required("Monthly Gross is required!")
      .matches(/^[0-9]+$/, "Must be only digits"),
  });

  const onSubmit = (values: any, onSubmitProps: any) => {
    // the axios call will be made here
    // alogside the notifications
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
        <h5 className="text-accent">Add Grade</h5>
        <i
          className="fa fa-times cursor-pointer"
          aria-hidden="true"
          onClick={() => handleDrawer("")}
        ></i>
      </div>
      {/* content */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form>
              <div className="mt-4 text-accent">
                {/* form */}
                <div className="px-6 mt-4">
                  <div className="text-accent mt-6 grid grid-cols-1 gap-4">
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">Level</label>
                        <Field
                          name="level"
                          type="text"
                          placeholder="eg. Marketing Group"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="level" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Grade Category
                        </label>
                        <Field
                          as="select"
                          name="gradeCategory"
                          placeholder="Grade Category"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">Category 1</option>
                          <option className="bg-card">Category 2</option>
                        </Field>
                        <ErrorMessage name="gradeCategory" component="span" />
                      </div>
                    </div>

                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Monthly Gross
                        </label>
                        <Field
                          name="monthlyGross"
                          type="text"
                          placeholder="eg. UI/UX Designer"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="monthlyGross" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Leave Length
                        </label>
                        <Field
                          as="select"
                          name="leaveLength"
                          placeholder="Leave length"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">Category 1</option>
                          <option className="bg-card">Category 2</option>
                        </Field>
                        <ErrorMessage name="leaveLength" component="span" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ctrl btns */}
              <div className="px-6 form-buttons flex justify-between mt-6">
                <button className="py-2 px-4 rounded text-sm font-medium">
                  Cancel
                </button>
                <button
                  className="button"
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                >
                  Save
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default AddPayGradeDrawer;
