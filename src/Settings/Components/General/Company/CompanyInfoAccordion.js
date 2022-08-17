import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { countries, industries } from "../../../Data";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} {...props} />
))(({ theme }) => ({
  border: ``,
  background: "var(--card)",
  paddingLeft: "15px",
  paddingRight: "15px",
}));

const CompanyInfoAccordion = () => {
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [industry, setIndustry] = React.useState("Food and Beverages");

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  // manage form
  const initialValues = {
    name: "",
    website: "",
    industry: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Company name is required"),
    email: Yup.string().email("Incorrect email address").required("Email Required"),
    industry: Yup.string().required("Industry is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    country: Yup.string().required("Country is required"),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log("Form data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <div className="">
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <h4 className="text-xl text-accent">Company Information</h4>
        </AccordionSummary>
        <AccordionDetails>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                <Form>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 md:gap-x-10 gap-y-2 justify-between text-accent Company_Information_form">
                    <div className="input-container">
                      <label>Company Name</label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Enter company name"
                      />
                      <ErrorMessage name="name" component="span" />
                    </div>

                    <div className="input-container">
                      <label>Website (optional)</label>
                      <Field type="text" placeholder="Website" name="website" />
                    </div>

                    <div className="input-container">
                      <label>Industry</label>
                      <Field component="select" name="industry">
                        <option value="">Enter Industry</option>
                        {industries.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="industry" component="span" />
                    </div>

                    <div className="input-container">
                      <label>Contact Person</label>
                      <Field
                        type="tel"
                        placeholder="Contact Person"
                        name="phone"
                      />
                      <ErrorMessage name="phone" component="span" />
                    </div>

                    <div className="input-container w-full">
                      <label>Email</label>
                      <Field
                        type="email"
                        placeholder="Enter email"
                        name="email"
                      />
                      <ErrorMessage name="email" component="span" />
                    </div>
                    <div className="input-container w-full">
                      <label>Address Details</label>
                      <Field
                        type="text"
                        placeholder="Enter address details"
                        name="address"
                      />
                      <ErrorMessage name="address" component="span" />
                    </div>
                    <div className="input-container">
                      <label>City</label>
                      <Field type="text" placeholder="Enter city" name="city" />
                      <ErrorMessage name="city" component="span" />
                    </div>
                    <div className="input-container">
                      <label>State/Province</label>
                      <Field
                        type="text"
                        placeholder="State/Province"
                        name="state"
                      />
                      <ErrorMessage name="state" component="span" />
                    </div>
                    <div className="input-container w-full">
                      <label>Country</label>
                      <Field
                        placeholder="Country"
                        component="select"
                        name="country"
                      >
                        <option value="">Select Country</option>
                        {countries.map((item) => (
                          <option value={item.value} key={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage name="country" component="span" />
                    </div>
                    <div className="">
                      <button
                        type="submit"
                        className="button"
                        disabled={!formik.isValid || formik.isSubmitting}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CompanyInfoAccordion;
