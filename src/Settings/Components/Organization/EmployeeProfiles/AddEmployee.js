import React from "react";
import "../../../style/settingsStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddEmployee = ({ close }) => {
  // Handle form
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
    employeeNumber: "",
    role: "",
    gender: "",
    dob: "",
    grade: "",
    branch: "",
    department: "",
    resumption: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required!"),
    lastName: Yup.string().required("Last name is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required!"),
    employeeNumber: Yup.string().required("Employee number is required!"),
    role: Yup.string().required("Role is required!"),
    gender: Yup.string().required("Gender is required!"),
    dob: Yup.string().required("Field is required!"),
    grade: Yup.string().required("grade is required!"),
    branch: Yup.string().required("branch is required!"),
    department: Yup.string().required("department is required!"),
    resumption: Yup.string().required("resumption is required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <div className="Container pb-10">
      <div className="bg-card pt-5 pb-10 px-5 rounded-md mt-5">
        <div className="flex items-center gap-3">
          <i
            className="ri-arrow-left-line hover:text-caramel cursor-pointer text-xl text-accent"
            onClick={close}
          ></i>
          <h5 className="font-semibold text-lg text-accent">Add Employee</h5>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          validateOnMount
        >
          <Form className="whiteBg_form mt-7">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              <div>
                <label>First Name</label>
                <Field type="text" name="firstName" placeholder="godswill" />
                <ErrorMessage name="firstName" component="span" />
              </div>
              <div>
                <label>Middle Name</label>
                <Field type="text" name="middleName" placeholder="smile" />
              </div>
              <div>
                <label>Last Name</label>
                <Field type="text" name="lastName" placeholder="walter" />
                <ErrorMessage name="lastName" component="span" />
              </div>
              <div>
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="johndoe@email.com"
                />
                <ErrorMessage name="email" component="span" />
              </div>
              <div>
                <label>Phone</label>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="+234 | 90-456-54-299"
                />
                <ErrorMessage name="phone" component="span" />
              </div>
              <div>
                <label>Employee Number</label>
                <input
                  type="text"
                  name="employeeNumber"
                  placeholder="SNN 2345"
                />
                <ErrorMessage name="employeeNumber" component="span" />
              </div>
              <div>
                <label>Role</label>
                <Field name="role" as="select">
                  <option value="">e.g Line manager</option>
                  <option value="Line Manager">Line Manager</option>
                  <option value="Team lead">Team lead</option>
                </Field>
                <ErrorMessage name="role" component="span" />
              </div>
              <div>
                <label>Gender</label>
                <Field name="gender" as="select">
                  <option value="">e.g Male</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Field>
                <ErrorMessage name="gender" component="span" />
              </div>
              <div>
                <label>Date of Birth</label>
                <Field
                  type="text"
                  placeholder="23-07-2020"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                  name="dob"
                />
                <ErrorMessage name="dob" component="span" />
              </div>
              <div>
                <label>Grade</label>
                <Field as="select" name="grade">
                  <option value="">e.g Grade 1</option>
                  <option value="1">Grade 1</option>
                  <option value="2">Grade 2</option>
                </Field>
                <ErrorMessage name="grade" component="span" />
              </div>
              <div>
                <label>Branch</label>
                <Field type="text" name="branch" placeholder="New york" />
                <ErrorMessage name="branch" component="span" />
              </div>
              <div>
                <label>Department</label>
                <Field as="select" name="department">
                  <option value="">e.g App dev</option>
                  <option value="sales">Sales</option>
                  <option value="CSI">CSI</option>
                </Field>
                <ErrorMessage name="department" component="span" />
              </div>
              <div>
                <label>Resumption Date</label>
                <Field
                  type="text"
                  name="resumption"
                  placeholder="23-07-2020"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
                <ErrorMessage name="resumption" component="span" />
              </div>
            </div>

            <div className="flex items-center gap-4 justify-center mt-4">
              <h5
                className="font-medium cursor-pointer hover:font-semibold"
                onClick={close}
              >
                Cancel
              </h5>
              <button  disabled={!formik.isValid || formik.isSubmitting} className="button">Save Changes</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddEmployee;
