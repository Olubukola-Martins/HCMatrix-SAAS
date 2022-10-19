import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const LocationDetail = () => {
  const initialValues = {
    locationName: "",
    country: "",
    state: "",
    timeZone: "",
    mailAlias: "",
  };

  const validationSchema = Yup.object({
    locationName: Yup.string().required("Location name is required!"),

    mailAlias: Yup.string()
      .email("Invalid email format")
      .required("Mail alias is required"),

    country: Yup.string().required("Country is required!"),
    state: Yup.string().required("State is required!"),
    timeZone: Yup.string().required("Time zone is required!"),
  });

  const onSubmit = (values, onSubmitProps) => {
    // the axios call will be made here
    // alogside the notifications
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <DashboardLayout>
      <div className="  mt-3 h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/locations">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-sm">Work Location</h5>
          </div>
          <div className="flex items-center gap-3">
            <i className="ri-pencil-fill cursor-pointer text-xl"></i>
            <i className="ri-question-fill text-xl text-slate-400"></i>
            <i className="ri-more-fill cursor-pointer text-xl font-semibold"></i>
          </div>
        </div>

        <div className="bg-card mt-5 pt-2 pb-10 px-4 rounded-md">
          <h3 className="text-accent font-bold">Location details</h3>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form className="whiteBg_form mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label>Location Name</label>
                      <Field
                        type="text"
                        placeholder="UI/UX Designer"
                        name="locationName"
                        required
                      />
                      <ErrorMessage name="locationName" component="span" />
                    </div>
                    <div>
                      <label>Mail Alias</label>
                      <Field
                        type="email"
                        name="mailAlias"
                        placeholder="johndoe@email.com"
                        required
                      />
                      <ErrorMessage name="mailAlias" component="span" />
                    </div>

                    <div>
                      <label>Modified by</label>
                      <input type="text" placeholder="John Obi" disabled />
                    </div>
                    <div>
                      <label>Time Modified</label>
                      <input
                        type="text"
                        placeholder="24-07-2022  02-58pm"
                        disabled
                      />
                    </div>
                    <div>
                      <label>Country</label>
                      <Field name="country" as="select" required>
                        <option value="">Ghana</option>
                        <option value="1">Nigeria</option>
                        <option value="2">Ghana</option>
                      </Field>
                      <ErrorMessage name="country" component="span" />
                    </div>
                    <div>
                      <label>State</label>
                      <Field name="state" as="select" required>
                        <option value="">Ahafo</option>
                        <option value="1">Ashanti</option>
                      </Field>
                      <ErrorMessage name="state" component="span" />
                    </div>
                    <div>
                      <label>Time zone</label>
                      <Field name="timeZone" as="select" required>
                        <option value="">Eastern Standard Time (EST)</option>
                        <option value="1">Mountain Standard Time (MST)</option>
                      </Field>
                      <ErrorMessage name="timeZone" component="span" />
                    </div>
                    <div>
                      <label>Added by</label>
                      <input type="text" placeholder="isaac odeh" disabled />
                    </div>
                    <div>
                      <label>Time Added</label>
                      <input
                        type="text"
                        placeholder="24-07-2022  02-58pm"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-5 mt-6 justify-center">
                    <button className="transparentButton">Cancel</button>
                    <button
                      className="button"
                      disabled={!formik.isValid || formik.isSubmitting}
                      type="submit"
                    >
                      Save Changes
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LocationDetail;
