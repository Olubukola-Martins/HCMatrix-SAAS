import React from "react";
import FramerAccordian from "../../../custom/FramerAccordian";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ConfirmMapping = ({ handleActiveStep }) => {
  const initialValues = {
    employeeId: "",
    email: "",
    firstName: "",
    lastName: "",
    department: "",
    employmentType: "",
    location: "",
    employmentStatus: "",
    designation: "",
    sourceOfHire: "",
    role: "",
    dateOfjoining: "",
    dateOfBirth: "",
    maritalStatus: "",
    gender: "",
    reportingManager: "",
    workPhone: "",
    personalPhone: "",
    personalEmail: "",
    officeLocation: "",
    currentAddress: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    permanentAddress: {
      address: "",
      city: "",
      country: "",
      postalCode: "",
    },
    dateOfExit: "",
  };

  const validationSchema = Yup.object({
    employeeId: Yup.string().required("Field is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    firstName: Yup.string().required("Field is required!"),
    lastName: Yup.string().required("Field is required!"),
    department: Yup.string().required("Field is required!"),
    employmentType: Yup.string().required("Field is required!"),
    location: Yup.string().required("Field is required!"),
    employmentStatus: Yup.string().required("Field is required!"),
    designation: Yup.string().required("Field is required!"),
    sourceOfHire: Yup.string().required("Field is required!"),
    role: Yup.string().required("Field is required!"),
    dateOfjoining: Yup.string().required("Field is required!"),
    dateOfBirth: Yup.string().required("Field is required!"),
    maritalStatus: Yup.string().required("Field is required!"),
    gender: Yup.string().required("Field is required!"),
    reportingManager: Yup.string().required("Field is required!"),
    workPhone: Yup.string().required("Field is required!"),
    personalPhone: Yup.string().required("Field is required!"),
    personalEmail: Yup.string().required("Field is required!"),
    officeLocation: Yup.string().required("Field is required!"),
    currentAddress: Yup.object().shape({
      address: Yup.string().required("Field is required!"),
      city: Yup.string().required("Field is required!"),
      country: Yup.string().required("Field is required!"),
      postalCode: Yup.string().required("Field is required!"),
    }),
    permanentAddress: Yup.object().shape({
      address: Yup.string().required("Field is required!"),
      city: Yup.string().required("Field is required!"),
      country: Yup.string().required("Field is required!"),
      postalCode: Yup.string().required("Field is required!"),
    }),
    dateOfExit: Yup.string().required("Field is required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    // the axios call will be made here
    // alogside the notifications
    onSubmitProps.setSubmitting(false);
    // onSubmitProps.resetForm();
    handleActiveStep((val) => val + 1);
  };
  return (
    <div className="mt-4 pb-6">
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        // no need for validation
        onSubmit={onSubmit}
        validateOnMount
      >
        {(formik) => {
          return (
            <Form className="flex flex-col gap-4 px-2">
              <FramerAccordian
                heading={
                  <span className="text-sm font-semibold">
                    Basic Information
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {/* employee id */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">Employee ID</label>

                      {/* <div className=""> */}
                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                        name="employeeId"
                      >
                        <option className="bg-card">Staff IDdd</option>
                        <option className="bg-card">Emp Id</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="employeeId"
                        className="showErrorMsg"
                      />

                      {/* </div> */}
                    </div>
                  </div>
                  {/* email address */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        email address
                      </label>

                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        name="email"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="email"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* first name */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">First name</label>

                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        name="firstName"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">firstName</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="firstName"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* last name */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">Last name</label>

                      <Field
                        component="select"
                        name="lastName"
                        placeholder="e.g LSETF-4309"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="lastName"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </FramerAccordian>
              <FramerAccordian
                heading={
                  <span className="text-sm font-semibold">
                    Work Information
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {/* department */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        department
                      </label>

                      <Field
                        component="select"
                        placeholder="Department"
                        name="department"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Department</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="department"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* employment type */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        employment type
                      </label>

                      <Field
                        component="select"
                        name="employmentType"
                        placeholder="employment type"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="employmentType"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* location */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        location
                      </label>

                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        name="location"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="location"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* employment status */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        employment status
                      </label>

                      <Field
                        component="select"
                        name="employmentStatus"
                        placeholder="employment status"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="employmentStatus"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* designation */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        designation
                      </label>

                      <Field
                        component="select"
                        placeholder="designation"
                        name="designation"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">designation</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="designation"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* source of hire */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        source of hire
                      </label>

                      <Field
                        component="select"
                        placeholder="designation"
                        name="sourceOfHire"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">source of hire</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="sourceOfHire"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* role */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        role
                      </label>

                      <Field
                        component="select"
                        placeholder="role"
                        name="role"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">role</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="role"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* date of joining */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        date of joining
                      </label>

                      <Field
                        component="select"
                        placeholder="date of joining"
                        name="dateOfjoining"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">date of joining</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="dateOfjoining"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </FramerAccordian>
              <FramerAccordian
                heading={
                  <span className="text-sm font-semibold">
                    Personal Details
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {/* employee id */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">
                        Date of birth
                      </label>

                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        name="dateOfBirth"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="dateOfBirth"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* email address */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block capitalize">
                        Marital status
                      </label>

                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        name="maritalStatus"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">marital status</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="maritalStatus"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  {/* gender */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">Gender</label>

                      <Field
                        component="select"
                        placeholder="e.g LSETF-4309"
                        name="gender"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">gender</option>
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="gender"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </FramerAccordian>
              <FramerAccordian
                heading={
                  <span className="text-sm font-semibold">
                    Hierarchy Information
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {/* employee id */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">
                        Reporting manager
                      </label>

                      <Field
                        component="select"
                        placeholder="Reporting manager"
                        name="reportingManager"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Staff ID</option>
                        <option className="bg-card">Emp Id</option>
                        <option className="bg-card">email</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="reportingManager"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </FramerAccordian>
              <FramerAccordian
                heading={
                  <span className="text-sm font-semibold">Contact Details</span>
                }
              >
                <>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                    {/* employee id */}
                    <div>
                      <div className="P_Form_Group col">
                        <label className="text-sm mb-1 block">Work phone</label>

                        <Field
                          component="select"
                          placeholder="e.g LSETF-4309"
                          name="workPhone"
                          className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">Staff ID</option>
                          <option className="bg-card">Emp Id</option>
                          <option className="bg-card">phone</option>
                        </Field>
                        <ErrorMessage
                          component="span"
                          name="workPhone"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                    {/* email address */}
                    <div>
                      <div className="P_Form_Group col">
                        <label className="text-sm mb-1 block capitalize">
                          Personal phone
                        </label>

                        <Field
                          component="select"
                          placeholder="e.g LSETF-4309"
                          name="personalPhone"
                          className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">Staff ID</option>
                          <option className="bg-card">Emp Id</option>
                          <option className="bg-card">email</option>
                        </Field>
                        <ErrorMessage
                          component="span"
                          name="personalPhone"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                    {/* gender */}
                    <div>
                      <div className="P_Form_Group col">
                        <label className="text-sm mb-1 block">
                          Personal email address
                        </label>

                        <Field
                          component="select"
                          placeholder="e.g LSETF-4309"
                          name="personalEmail"
                          className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">kim@west.com</option>
                          <option className="bg-card">LSETF-4339</option>
                        </Field>
                        <ErrorMessage
                          component="span"
                          name="personalEmail"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                    {/* office location */}
                    <div>
                      <div className="P_Form_Group col">
                        <label className="text-sm mb-1 block">
                          Office location
                        </label>

                        <Field
                          component="select"
                          placeholder="enter address"
                          name="officeLocation"
                          className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                        >
                          <option className="bg-card">enter address</option>
                          <option className="bg-card">Jam</option>
                        </Field>
                        <ErrorMessage
                          component="span"
                          name="officeLocation"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                    {/* current address */}
                    <div className="col-span-2">
                      <div className="P_Form_Group col">
                        <label className="text-sm mb-2 block">
                          Current Address
                        </label>

                        <div className="w-full bg-white rounded-md px-4 py-4 border border-gray-400">
                          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {/* employee id */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="address"
                                  name="currentAddress.address"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">address</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="currentAddress.address"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* email address */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="city"
                                  name="currentAddress.city"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">city</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="currentAddress.city"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* gender */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="state"
                                  name="currentAddress.state"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">state</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="currentAddress.state"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* country */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="country"
                                  name="currentAddress.country"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">country</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="currentAddress.country"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* postal code */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="country"
                                  name="currentAddress.postalCode"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">
                                    postal code
                                  </option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="currentAddress.postalCode"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* permanent address */}
                    <div className="col-span-2">
                      <div className="P_Form_Group col">
                        <label className="text-sm mb-2 block">
                          Permanent Address
                        </label>

                        <div className="w-full bg-white rounded-md px-4 py-4 border border-gray-400">
                          <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                            {/* employee id */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="address"
                                  name="permanentAddress.address"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">address</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="permanentAddress.address"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* email address */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="city"
                                  name="permanentAddress.city"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">city</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="permanentAddress.city"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* gender */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="state"
                                  name="permanentAddress.state"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">state</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="permanentAddress.state"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* country */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="country"
                                  name="permanentAddress.country"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">country</option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="permanentAddress.country"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                            {/* postal code */}
                            <div>
                              <div className="P_Form_Group col">
                                <Field
                                  component="select"
                                  placeholder="country"
                                  name="permanentAddress.postalCode"
                                  className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                                >
                                  <option className="bg-card">
                                    postal code
                                  </option>
                                  <option className="bg-card">
                                    LSETF-4339
                                  </option>
                                </Field>
                                <ErrorMessage
                                  component="span"
                                  name="permanentAddress.postalCode"
                                  className="showErrorMsg"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              </FramerAccordian>
              <FramerAccordian
                heading={
                  <span className="text-sm font-semibold">
                    Separation Information
                  </span>
                }
              >
                <div className="grid grid-cols-2 gap-x-12 gap-y-6">
                  {/* employee id */}
                  <div>
                    <div className="P_Form_Group col">
                      <label className="text-sm mb-1 block">Date of exit</label>

                      <Field
                        component="select"
                        placeholder="Date of exit"
                        name="dateOfExit"
                        className="w-full bg-white rounded-md p-1 border border-gray-400 focus:outline-none "
                      >
                        <option className="bg-card">Date of exit</option>
                        <option className="bg-card">John Doe</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="dateOfExit"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </FramerAccordian>
              {/* ctrl btns */}
              <div className="form-buttons flex justify-between mt-2 mb-4">
                <button className="py-2 px-4  rounded text-sm  font-medium">
                  Cancel
                </button>
                <button className="py-2 px-4 bg-caramel rounded text-sm text-white font-medium">
                  Save next
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default ConfirmMapping;
