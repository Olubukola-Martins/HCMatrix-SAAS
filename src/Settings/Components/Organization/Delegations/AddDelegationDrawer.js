import React from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Field, Form, Formik } from "formik";

const AddDelegationDrawer = ({ handleDrawer }) => {
  // Handle form
  const initialValues = {
    delegator: "",
    delegatee: "",
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
        <h5 className="text-accent">Add Delegation</h5>
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
            <Form className="text-accent mt-6 grid grid-cols-1 gap-8">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block font-bold">
                    Delegator
                  </label>
                  <Field
                    as="select"
                    name="delegator"
                    placeholder="select"
                  >
                    <option className="bg-card" value="Frank">
                      Frank
                    </option>
                    <option className="bg-card" value="Rose">
                      Rose
                    </option>
                  </Field>
                </div>
              </div>
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block font-bold">
                    Delegatee
                  </label>
                  <Field
                    as="select"
                    name="delegatee"
                    placeholder="select"
                  >
                    <option className="bg-card" value="Frank">
                      Frank
                    </option>
                    <option className="bg-card" value="Rose">
                      Rose
                    </option>
                  </Field>
                </div>
              </div>
              <div>
                <div className="input-container w-3/4 text-sm">
                  <label className=" font-bold mb-2 block">Type</label>
                  <div className="flex gap-6">
                    <div>
                      <label className="mb-1 block">Temporary</label>
                      <input
                        type="text"
                        placeholder="Date range"
                      />
                    </div>
                    <div>
                      <label>Permanent</label>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="input-container w-full text-sm">
                  <label className=" font-bold mb-2 block">Notification</label>
                  <div className="flex gap-6">
                    <div className="flex gap-2 items-center">
                      <label htmlFor="N_delegator" className="mb-1 block">Delegator</label>
                      <Field
                        type="checkbox"
                        id="N_delegator"
                        name="notifyDelegator"
                      />
                    </div>
                    <div className="flex gap-2 items-center">
                      <label htmlFor="N_delegatee" className="mb-1 block">Delegatee</label>
                      <Field
                       id="N_delegatee"
                        type="checkbox"
                        name="notifyDelegator"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="input-container w-full ">
                  <label className="text-sm mb-2 block font-bold">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    placeholder=""
                    rows={4}
                  />
                </div>
              </div>

              {/* ctrl btns */}
              <div className="form-buttons flex justify-between mt-2">
                <button className="py-2 px-4 rounded text-sm font-medium">
                  Cancel
                </button>
                <button className="button">
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </motion.div>
  );
};

export default AddDelegationDrawer;
