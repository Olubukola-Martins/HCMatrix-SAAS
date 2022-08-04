import React from "react";

import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddGroupDrawer = ({ handleDrawer }) => {
  const initialValues = {
    groupName: "",
    description: "",
    groupEmail: "",
    employee: { id: "", roleInGroupId: "" },
  };

  const validationSchema = Yup.object({
    groupName: Yup.string()
      .required("Group name is required!")
      .min(3, "Must be 3 characters or more"),

    groupEmail: Yup.string()
      .email("Invalid email format")
      .required("Group email is required"),

    description: Yup.string()
      .required("Description is required!")
      .min(40, "Must be 40 characters or more"),

    employee: Yup.object().shape({
      id: Yup.string("Name is a string!"),
      roleInGroupId: Yup.string("Role is a string!"),
    }),
  });

  const onSubmit = (values, onSubmitProps) => {
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
        <h5 className="text-accent">Add Group</h5>
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
                  <div className="text-accent mt-6 grid grid-cols-1 gap-8">
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">Group Name</label>
                        <Field
                          name="groupName"
                          type="text"
                          placeholder="eg. Marketing Group"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="groupName" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Description
                        </label>
                        <Field
                          as="textarea"
                          name="description"
                          type="text"
                          rows={4}
                          placeholder="eg. johndoe@gmail.com"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="description" component="span" />
                      </div>
                    </div>
                    <div>
                      <div className="input-container w-full">
                        <label className="text-sm mb-2 block">
                          Group Email ID
                        </label>
                        <Field
                          name="groupEmail"
                          type="text"
                          placeholder="eg. UI/UX Designer"
                          className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                        />
                        <ErrorMessage name="groupEmail" component="span" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* {users-form} */}
              <div className="mt-12">
                <h5 className="px-6 text-base font-semibold mb-2">Add Users</h5>
                <div className="px-6 py-3 bg-caramel flex gap-4 justify-between items-stretch">
                  <div className="input-container w-full">
                    <Field
                      as="select"
                      name="employee.id"
                      type="text"
                      placeholder="Add employee"
                      className="w-full bg-white text-caramel rounded-full p-.5  focus:outline-none "
                    >
                      <option className="bg-card">Isaac</option>
                      <option className="bg-card">James Dean</option>
                    </Field>
                    <ErrorMessage name="employee.id" component="span" />
                  </div>
                  <div className="input-container w-full">
                    <Field
                      as="select"
                      name="employee.roleInGroupId"
                      type="text"
                      placeholder="Select"
                      className="w-full bg-white text-caramel rounded-full p-1  focus:outline-none "
                    >
                      <option className="bg-card">member</option>
                      <option className="bg-card">lead</option>
                    </Field>
                    <ErrorMessage
                      name="employee.roleInGroupId"
                      component="span"
                    />
                  </div>
                  <div>
                    <i className="fas fa-plus-circle"></i>
                  </div>
                </div>
              </div>
              <div className="px-6 text-xs flex items-start mt-6">
                <input type={"checkbox"} className="mr-2" />
                <div>
                  {" "}
                  Notify users by Mail when they are added to this group.
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

export default AddGroupDrawer;
