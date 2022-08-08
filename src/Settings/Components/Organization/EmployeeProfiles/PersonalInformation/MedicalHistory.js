import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const MedicalHistory = () => {
  const validate = Yup.string().required("Field is Required!");

  //=== Handle Medical Condition ====//
  const initialValues = {
    name: "",
    date: "",
  };

  const medicalConditionSubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.resetForm();
  };

  const validationSchema = Yup.object({
    name: validate,
    date: validate,
  });

  // == Pest Medical Condition == //
  const pestMCinitialValues = {
    name: "",
    date: "",
  };

  const pestMCSubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.resetForm();
  };

  const pestMCvalidationSchema = Yup.object({
    name: validate,
    date: validate,
  });

  // == Surgeries Hospitalization == //
  const HospitalizationInitialValues = {
    name: "",
    date: "",
  };

  const HospitalizationSubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.resetForm();
  };

  const HospitalizationValidationSchema = Yup.object({
    name: validate,
    date: validate,
  });

  // === Family history ====//
   const FHistoryInitialValues = {
    name: "",
    date: "",
  };

  const FHistorySubmit = (values, onSubmitProps) => {
    console.log(values);
    onSubmitProps.resetForm();
  };

  const FHistoryValidationSchema = Yup.object({
    name: validate,
    date: validate,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8">
      {/* Current of Medical Condition */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">
            Current of Medical Condition
          </span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <Formik
            initialValues={initialValues}
            onSubmit={medicalConditionSubmit}
            validationSchema={validationSchema}
          >
            <Form className="p-5">
              <div className="whiteBg_form">
                <Field
                  type="text"
                  placeholder="Name of medical condition"
                  name="name"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="whiteBg_form mt-4">
                <Field
                  type="text"
                  placeholder="Date"
                  name="date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
                <ErrorMessage
                  name="date"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="flex justify-end mt-5">
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>

          {/* Fetch Medical Condition */}
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Headache</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ear infection</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pest Medical Condition */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Pest Medical Condition</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <Formik
            initialValues={pestMCinitialValues}
            onSubmit={pestMCSubmit}
            validationSchema={pestMCvalidationSchema}
          >
            <Form className="p-5">
              <div className="whiteBg_form">
                <Field
                  name="name"
                  type="text"
                  placeholder="Name of medical condition"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="whiteBg_form mt-4">
                <Field
                  type="text"
                  name="date"
                  placeholder="Date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
                <ErrorMessage
                  name="date"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="flex justify-end mt-5">
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>

          {/* fetch Pest Medical Condition */}
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Headache</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ear infection</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Surgeries/Hospitalization */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Surgeries/Hospitalization</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <Formik
            initialValues={HospitalizationInitialValues}
            onSubmit={HospitalizationSubmit}
            validationSchema={HospitalizationValidationSchema}
          >
            <Form className="p-5">
              <div className="whiteBg_form">
                <Field
                  type="text"
                  name="name"
                  placeholder="Surgeries/Hospitalization"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="whiteBg_form mt-4">
                <Field
                  type="text"
                  placeholder="Date"
                  name="date"
                  onFocus={(e) => (e.target.type = "date")}
                  onBlur={(e) => (e.target.type = "text")}
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="flex justify-end mt-5">
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
          {/* Fetch Surgeries/Hospitalization */}
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Surgery</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Headache</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ear infection</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Family History */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Family History</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <Formik
            initialValues={FHistoryInitialValues}
            onSubmit={FHistorySubmit}
            validationSchema={FHistoryValidationSchema}
          >
            <Form className="p-5">
              <div className="whiteBg_form">
                <Field
                  type="text"
                  name="name"
                  placeholder="Name of Medical Condition"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="whiteBg_form mt-4">
                <Field name="date" as="select">
                  <option value="">Select</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="sister">Sister</option>
                </Field>
                <ErrorMessage
                  name="date"
                  component="span"
                  className="showErrorMsg"
                />
              </div>
              <div className="flex justify-end mt-5">
                <button type="submit" className="button">
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Migraine</td>
                  <td>Brother</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Blood pressure</td>
                  <td>Father</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Medication */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Medication</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of Medication" />
            </div>

            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Migraine</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Blood pressure</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Allergy */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Allergy</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of Allergy" />
            </div>

            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Allergy</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Migraine</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Blood pressure</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
