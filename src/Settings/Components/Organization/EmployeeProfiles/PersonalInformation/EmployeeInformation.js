import React from "react";
import "../../../../style/settingsStyle.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EmployeeInformation = () => {
  const validate = Yup.string().required("Field is required!");
  const initialValues = {
    expatriate: "",
    payrollType: "",
    probationEndDate: "",
    lga: "",
    state: "",
    country: "",
    company: "",
    branch: "",
    department: "",
    currentRole: "",
    hire_date: "",
    grade: "",
    hireDate: "",
    probation_date: "",
    nextOfKin: {
      name: "",
      address: "",
      relation: "",
      phone: "",
    },
    pension: {
      admin: "",
      accNo: "",
    },
    bank: {
      name: "",
      accNo: "",
    },
  };

  const validationSchema = Yup.object({
    expatriate: validate,
    payrollType: validate,
    probationEndDate: validate,
    lga: validate,
    state: validate,
    country: validate,
    company: validate,
    branch: validate,
    department: validate,
    currentRole: validate,
    grade: validate,
    hireDate: validate,
    hireDate: validate,
    probation_date: validate,
    nextOfKin: Yup.object().shape({
      name: validate,
      address: validate,
      relation: validate,
      phone: validate,
    }),
    pension: Yup.object().shape({
      admin: Yup.string().required("Administrator is a required!"),
      accNo: Yup.string().required("Account Number is required!"),
      // .test(
      //   "len",
      //   "Must be exactly 10 characters",
      //   (val) => val && val.length === 10
      // ),
    }),
    bank: Yup.object().shape({
      name: Yup.string().required("Bank name is a required!"),
      accNo: Yup.string()
        .required("Account Number is required!")
        .test(
          "len",
          "Must be exactly 10 characters",
          (val) => val && val.length === 10
        ),
    }),
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
            <Form>
              {/* Personal Information section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="P_Form_Group">
                    <label>Expatriate</label>
                    <div className="flex-1  self-start">
                      <Field
                        className="w-full"
                        name="expatriate"
                        component="select"
                      >
                        <option value="male">No</option>
                        <option value="female">Yes</option>
                      </Field>
                      <ErrorMessage
                        name="expatriate"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
                    <label>Payroll type</label>
                    <div className="flex-1  self-start">
                      <Field
                        className="w-full"
                        name="payrollType"
                        component="select"
                      >
                        <option value="male">Direct Salary</option>
                      </Field>
                      <ErrorMessage
                        name="payrollType"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
                    <label>LGA</label>
                    <div className="flex-1 self-start">
                      <Field className="w-full" name="lga" component="select">
                        <option value="male">Eteosa</option>
                      </Field>
                      <ErrorMessage
                        name="lga"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
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
                  <div className="P_Form_Group">
                    <label>Company</label>
                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="company"
                        placeholder="Snapnet Ltd"
                      />
                      <ErrorMessage
                        name="company"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
                    <label>Branch</label>
                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="branch"
                        component="select"
                      >
                        <option value="male">Abuja</option>
                        <option value="male">Lagos</option>
                      </Field>
                      <ErrorMessage
                        name="branch"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
                    <label>Current Role</label>
                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="currentRole"
                        placeholder="Snapnet Ltd"
                      />
                      <ErrorMessage
                        name="currentRole"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group">
                    <label>Grade</label>
                    <div className="flex-1 self-start">
                      <Field className="w-full" name="grade" component="select">
                        <option value="male">Abuja</option>
                        <option value="male">Lagos</option>
                      </Field>
                      <ErrorMessage
                        name="grade"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="P_Form_Group">
                    <label>Probation End Date</label>
                    <input
                      type="date"
                      placeholder="23 - 09 - 2022"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                      name="probation_date"
                    />
                  </div>
                  <div className="P_Form_Group my-4">
                    <label>Country</label>
                    <Field as="select">
                      <option value="">Select county</option>
                      <option value="male">Nigeria</option>
                      <option value="male">Ghana</option>
                    </Field>
                  </div>
                  <div className="P_Form_Group">
                    <label>Department</label>
                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="department"
                        component="select"
                      >
                        <option value="male">App Dev</option>
                        <option value="male">Marketing</option>
                      </Field>
                      <ErrorMessage
                        name="department"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                  <div className="P_Form_Group mt-4">
                    <label>Hire Date</label>
                    <Field
                      type="text"
                      name="hire_date"
                      placeholder="23 - 09 - 2022"
                      onFocus={(e) => (e.target.type = "date")}
                      onBlur={(e) => (e.target.type = "text")}
                    />
                  </div>
                </div>
              </div>

              {/* NEXT of Kind section */}
              <div className="my-12">
                <h5 className="text-accent font-semibold pb-2">Next of Kin</h5>
                <div className="border-b mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10  gap-y-3 lg:gap-y-10">
                  <div>
                    <div className="P_Form_Group">
                      <label>Name</label>
                      <div className="flex-1 self-start">
                        <Field
                          className="w-full"
                          name="nextOfKin.name"
                          placeholder="James Doe"
                        />
                        <ErrorMessage
                          name="nextOfKin.name"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>

                    <div className="P_Form_Group mt-4">
                      <label>Address</label>

                      <div className="flex-1 self-start">
                        <Field
                          className="w-full resize-none"
                          name="nextOfKin.address"
                          component="textarea"
                          placeholder="No 3 United Estate Ajah Lagos Nigeria"
                        />
                        <ErrorMessage
                          name="nextOfKin.address"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="P_Form_Group">
                      <label>Relation</label>
                      <div className="flex-1 self-start">
                        <Field
                          className="w-full"
                          name="nextOfKin.relation"
                          component="select"
                        >
                          <option value="male">Abuja</option>
                          <option value="male">Lagos</option>
                        </Field>
                        <ErrorMessage
                          name="nextOfKin.relation"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                    <div className="P_Form_Group my-4">
                      <label>Phone Number</label>
                      <div className="flex-1 self-start">
                        <Field
                          className="w-full"
                          name="nextOfKin.phone"
                          placeholder="+234 | 9078657754"
                        />
                        <ErrorMessage
                          name="nextOfKin.phone"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Account detail */}
              <div className="my-12">
                <h5 className="text-accent font-semibold pb-2">
                  Pension Account Details
                </h5>
                <div className="border-b mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10  gap-y-3 lg:gap-y-10">
                  <div className="P_Form_Group">
                    <label>Pension fund Administrator</label>

                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="pension.admin"
                        component="select"
                      >
                        <option value="male">Stanbic IBTC Pension</option>
                        <option value="first">First IBTC Pension</option>
                      </Field>
                      <ErrorMessage
                        name="pension.admin"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>

                  <div className="P_Form_Group">
                    <label>Pension Account Number</label>

                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="pension.accNo"
                        placeholder="RSA275697464"
                      />
                      <ErrorMessage
                        name="pension.accNo"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Bank Account Details */}
              <div className="my-12">
                <h5 className="text-accent font-semibold pb-2">
                  Bank Account Details
                </h5>
                <div className="border-b mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10  gap-y-3 lg:gap-y-10">
                  <div className="P_Form_Group">
                    <label>Bank</label>
                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="bank.name"
                        component="select"
                      >
                        <option value="First">First Bank</option>
                      </Field>
                      <ErrorMessage
                        name="bank.name"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>

                  <div className="P_Form_Group">
                    <label>Bank Account Number</label>
                    <div className="flex-1 self-start">
                      <Field
                        className="w-full"
                        name="bank.accNo"
                        placeholder="2756970464"
                      />
                      <ErrorMessage
                        name="bank.accNo"
                        component="span"
                        className="showErrorMsg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button className="button">Submit</button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default EmployeeInformation;
