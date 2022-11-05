import { Drawer, Dropdown } from "antd";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";

export const AddEmployee = ({ open, handleClose }) => {
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent shadow-sm";

  const isRequired = Yup.string().required("Field is Required!");

  const initialValues = {
    firstName: "",
    lastName: "",
    employeeID: "",
    email: "",
    StartDate: "",
    jonTitle: "",
    monthlyGross: "",
    employmentType: "",
    WorkModel: "",
    department: "",
    lineManager: "",
    N_days_week: "",
    selfServiceAccess: "",
  };

  const validationSchema = Yup.object({
    firstName: isRequired,
    lastName: isRequired,
    employeeID: isRequired,
    email: Yup.string()
      .email("Invalid email format")
      .required("Field is Required"),
    StartDate: isRequired,
    jonTitle: isRequired,
    monthlyGross: isRequired,
    employmentType: isRequired,
    WorkModel: isRequired,
    department: isRequired,
    lineManager: isRequired,
    N_days_week: isRequired,
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log({ values });
    onSubmitProps.resetForm();
  };

  return (
    <Drawer
      width="100%"
      placement="right"
      bodyStyle={{
        background: "var(--card)",
      }}
      onClose={handleClose}
      open={open}
    >
      <DashboardLayout>
        <div className="Container">
          <PageIntro title="Add Employee" close={handleClose} />

          <div className="bg-card px-5 py-7 rounded-md mt-7 text-accent">
            <div className="bg-red-200 text-sm rounded-md py-2 flex justify-between items-center px-3">
              <span>Employees Added: 2</span>
              <span>License count left: 5</span>
            </div>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              <Form>
                <div className="bg-mainBg rounded-md px-2 md:px-4 pt-4 pb-6 shadow-sm mt-8">
                  <div className="flex items-center justify-between mb-3">
                    <h6 className="text-sm font-semibold">Basic Information</h6>
                    <i className="ri-arrow-up-s-line text-lg"></i>
                  </div>

                  <div className="bg-card px-3 py-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <Field
                          name="firstName"
                          placeholder="First Name"
                          className={inputStyle}
                          type="text"
                        />
                        <ErrorMessage
                          name="firstName"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          className={inputStyle}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="employeeID"
                          placeholder="Employee ID"
                          className={inputStyle}
                        />
                        <ErrorMessage
                          name="employeeID"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Employee Email"
                          className={inputStyle}
                        />
                        <ErrorMessage
                          name="email"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-mainBg rounded-md px-2 md:px-4 pt-4 pb-6 shadow-sm my-8">
                  <div className="flex items-center justify-between mb-3">
                    <h6 className="text-sm font-semibold">Job Information</h6>
                    <i className="ri-arrow-up-s-line text-lg"></i>
                  </div>

                  <div className="bg-card px-3 py-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <Field
                          type="text"
                          name="StartDate"
                          placeholder="Start Date"
                          className={inputStyle}
                          onFocus={(e) => (e.target.type = "date")}
                          onBlur={(e) => (e.target.type = "text")}
                        />
                        <ErrorMessage
                          name="StartDate"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          type="text"
                          name="jonTitle"
                          placeholder="Job Title"
                          className={inputStyle}
                        />
                        <ErrorMessage
                          name="jonTitle"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          type="number"
                          name="monthlyGross"
                          placeholder="Month Gross"
                          className={inputStyle}
                        />
                        <ErrorMessage
                          name="monthlyGross"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>

                      <div>
                        <Field
                          as="select"
                          name="employmentType"
                          className={inputStyle}
                        >
                          <option value="">Employment Type</option>
                          <option value="Full time">Full time</option>
                          <option value="Part time">Part time</option>
                          <option value="Contract">Contract</option>
                        </Field>
                        <ErrorMessage
                          name="employmentType"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="WorkModel"
                          className={inputStyle}
                        >
                          <option value="">Work Model</option>
                          <option value="On-Site">On-Site</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Remote">Remote</option>
                        </Field>
                        <ErrorMessage
                          name="WorkModel"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="department"
                          className={inputStyle}
                        >
                          <option value="">Department</option>
                          <option value="dev">Dev Team</option>
                        </Field>
                        <ErrorMessage
                          name="department"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="lineManager"
                          className={inputStyle}
                        >
                          <option value="">Line Manager</option>
                          <option value="dev">Dev Team</option>
                        </Field>
                        <ErrorMessage
                          name="lineManager"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                      <div>
                        <Field
                          as="select"
                          name="N_days_week"
                          className={inputStyle}
                        >
                          <option value="">Number of Days in the Week</option>
                          <option value="dev">3</option>
                        </Field>
                        <ErrorMessage
                          name="N_days_week"
                          component="span"
                          className="showErrorMsg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-mainBg rounded-md px-2 md:px-4 pt-4 pb-6 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h6 className="text-sm font-semibold">
                      Grant Self Service Access
                    </h6>
                    <i className="ri-arrow-up-s-line text-lg"></i>
                  </div>

                  <div className="flex items-center gap-10">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Field
                        type="radio"
                        name="selfServiceAccess"
                        value="yes"
                        className="scale-150 accent-caramel"
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <Field
                        type="radio"
                        name="selfServiceAccess"
                        value="no"
                        className="scale-150 accent-caramel"
                      />
                      <span>No</span>
                    </label>
                  </div>
                </div>
                <div className="flex md:items-center md:flex-row flex-col gap-4 justify-between mt-7">
                  <button
                    onClick={handleClose}
                    type="button"
                    className="transparentButton"
                  >
                    Cancel
                  </button>
                  <div className="flex items-center gap-3">
                    <button type="submit" className="button">
                      Proceed to Onboarding
                    </button>
                    <Dropdown
                      placement="top"
                      overlay={
                        <ul className="bg-mainBg text-sm rounded-md font-medium shadow-md px-2 py-3 border-2">
                          <li className="pb-2 cursor-pointer hover:text-caramel">
                            Save and add Another
                          </li>
                          <li className=" cursor-pointer hover:text-caramel">
                            Save and Complete Profile
                          </li>
                        </ul>
                      }
                      trigger={["click"]}
                    >
                      <button
                        type="button"
                        className="flex items-center gap-2 transparentButton"
                      >
                        <span>Save</span>
                        <i className="ri-arrow-down-s-line"></i>
                      </button>
                    </Dropdown>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </DashboardLayout>
    </Drawer>
  );
};
