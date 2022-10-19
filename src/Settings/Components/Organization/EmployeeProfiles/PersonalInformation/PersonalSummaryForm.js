import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const PersonalSummaryForm = () => {
  const initialValues = {
    name: "",
    address: "",
    gender: "",
    maritalStatus: "",
    mailAlias: "",
    // dob: "",
    employeeNumber: "",
    phoneNumber: "",
    email: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required!"),

    address: Yup.string()
      .required("Address is required!")
      .min(20, "Addresss should be longer that 30 characters"),
    gender: Yup.string().required("gender is required!"),
    maritalStatus: Yup.string().required("Marital status is required!"),
    // dob: Yup.string().required("Date of birth is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    employeeNumber: Yup.string().required("Employee number is required!"),
    phoneNumber: Yup.string().required("Phone number is required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    // the axios call will be made here
    // alogside the notifications
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              <div>
                <div className="P_Form_Group">
                  <label>Name</label>
                  <div className="">
                    <Field
                      type="text"
                      placeholder="Godswill Omenuko"
                      name="name"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>

                <div className="P_Form_Group my-4">
                  <label>Address</label>
                  <div className="flex-1  self-start">
                    <Field
                      // component="textarea"
                      name="address"
                      className="resize-none w-full"
                      placeholder="No 3 United Estate Ajah Lagos Nigeria"
                    />
                    <ErrorMessage
                      name="address"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div className="P_Form_Group">
                    <label>Gender</label>
                    <div className="flex-1  self-start">
                      <Field
                        name="gender"
                        component="select"
                        className="w-full"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
                    <label>Marital Status</label>
                    <div className="flex-1  self-start">
                      <Field
                        name="maritalStatus"
                        component="select"
                        className="w-full"
                      >
                        <option value="married">Married</option>
                        <option value="single">Single</option>
                        <option value="divorced">Divorced</option>
                      </Field>
                      <ErrorMessage
                        name="maritalStatus"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
                <div className="P_Form_Group mt-4">
                  <label>Date of Birth</label>

                  <div className="flex-1  self-start">
                    <input
                      type="text"
                      placeholder="23 - 09 - 2022"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      name="dob"
                      className="w-full"
                    />
                    <ErrorMessage
                      name="dob"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="P_Form_Group">
                  <label>Email Address</label>
                  <div className="flex-1  self-start">
                    <Field
                      className="w-full"
                      name="email"
                      type="email"
                      placeholder="johndoe@email.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>

                <div className="P_Form_Group my-4">
                  <label>Phone Number</label>
                  <div className="flex-1  self-start">
                    <Field
                      className="w-full"
                      name="phoneNumber"
                      placeholder="+234 | 9078657754"
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>
                <div className="P_Form_Group my-4">
                  <label>Country</label>
                  <div className="flex-1 self-start">
                    <Field className="w-full" name="lga" component="select">
                      <option value="male">lagos</option>
                    </Field>
                    <ErrorMessage
                      name="lga"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>
                <div className="P_Form_Group my-4">
                  <label>State</label>
                  <div className="flex-1 self-start">
                    <Field className="w-full" name="lga" component="select">
                      <option value="male">lagos</option>
                    </Field>
                    <ErrorMessage
                      name="lga"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>
                <div className="P_Form_Group my-4">
                  <label>LGA</label>
                  <div className="flex-1 self-start">
                    <Field className="w-full" name="lga" component="select">
                      <option value="male">lagos</option>
                    </Field>
                    <ErrorMessage
                      name="lga"
                      component="span"
                      className="showErrorMsg"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-10">
                  <button
                    className="button"
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PersonalSummaryForm;
