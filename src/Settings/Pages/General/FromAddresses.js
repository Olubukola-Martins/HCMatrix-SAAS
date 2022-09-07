import { useState } from "react";
import DashboardLayout from "../../../Layout/DashboardLayout";
import InfoIcon from "../../Assets/info_icon.svg";
import Themes from "../../../Themes/Themes";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Handle form
const initialValues = {
  displayName: "",
  fromAddress: "",
};

const validationSchema = Yup.object({
  displayName: Yup.string().required("Display name is required!"),
  fromAddress: Yup.string().required("From Address is required!"),
});

const onSubmit = (values, onSubmitProps) => {
  console.log("Form data", values);
  onSubmitProps.setSubmitting(false);
  onSubmitProps.resetForm();
};

const FromAddresses = () => {
  const [openModal, setOpenModal] = useState(false);

  const showModal = (val) => {
    setOpenModal(val);
  };
  const handleClick = (e) => {
    e.preventDefault();
    showModal(true);
  };
  const handleClose = () => setOpenModal(false);
  return (
    <div>
      <Modal open={openModal} onClose={handleClose}>
        <Themes>
          <div className="CModal" style={{ maxWidth: 600 }}>
            <div className="flex flex-col items-center justify-center pb-12">
              <div className="flex items-center justify-end w-full mb-8">
                <i
                  class="fas fa-times cursor-pointer text-2xl"
                  onClick={handleClose}
                ></i>
              </div>

              <h4 className="font-bold text-2xl text-accent text-center">
                Add From Address
              </h4>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
                validateOnMount
              >
                {(formik) => {
                  return (
                    <Form className="mt-8 lg:mr-20 ">
                      <div className="flex items-center w-full mb-8 showErrorMsg">
                        <label className="block text-slate-400 md:w-60 mr-4">
                          Display Name
                        </label>
                        <div className="w-full">
                          <Field
                            type="text"
                            placeholder="Add display name"
                            name="displayName"
                            className="md:w-full rounded-md py-3 px-3 bg-white border border-gray-200 focus:outline-none bg-mainBg text-accent"
                          />
                          <ErrorMessage name="displayName" component="span" />
                        </div>
                      </div>
                      <div className="flex items-center w-full mb-8 showErrorMsg">
                        <label className="block text-slate-400 md:w-60 mr-4">
                          From Address
                        </label>
                        <div className="w-full">
                          <Field
                            type="text"
                            name="fromAddress"
                            placeholder="john@gmail.com"
                            className="md:w-full bg-mainBg rounded-md py-3 px-3 bg-white border border-gray-200 focus:outline-none text-accent"
                          />
                          <ErrorMessage
                            name="fromAddress"
                            component="fromAddress"
                          />
                        </div>
                      </div>
                      <div className="flex items-center w-full mb-2">
                        <label className="block text-slate-400 md:w-60 mr-4 invisible">
                          From Address
                        </label>
                        <div className="flex justify-between items-center w-full">
                          <button
                            disabled={!formik.isValid || formik.isSubmitting}
                            type="submit"
                            className="button"
                          >
                            Submit
                          </button>
                          <button
                            type="button"
                            onClick={handleClose}
                            className="transparentButton"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </Themes>
      </Modal>
      <DashboardLayout>
        <div className="  pb-20 mt-10 mb-72">
          {/* heading container */}
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start ">
            <Link to="/settings">
              <i
                className="fa fa-arrow-left text-accent text-lg "
                aria-hidden="true"
              ></i>
            </Link>

            <h4 className="font-bold text-accent lg:text-center text-lg lg:text-lg md:w-3/5 md:leading-10 mb-10 lg:mb-0">
              Create and manage official from addresses for automated e-mails
              sent from your organization.
            </h4>
            <div className="left-action flex">
              <button
                className="text-caramel  mr-6 text-sm md:text-base ml-auto lg:ml-0 cursor-buttonointer"
                onClick={handleClick}
              >
                + Add from Address
              </button>
              <img src={InfoIcon} alt="info" className="md:h-6 h-4" />
            </div>
          </div>
          {/* table container */}
          <div className="table-container mt-10">
            <div className="table-heading grid grid-cols-3 md:gap-24 gap-2 mb-4 px-4 py-4 rounded-xl items-start bg-card  text-xs lg:text-base font-semibold ">
              <h5 className="">Display Name</h5>
              <h5 className="">From Address</h5>
              <h5 className="">Verification Status</h5>
            </div>
            <div className="table-entry grid grid-cols-3 md:gap-24  gap-2  mb-4 text-xs  lg:text-sm px-4 py-4 rounded-xl items-start bg-card ">
              <div className="flex items-center">
                <i class="fa-solid fa-star text-green-500"></i>
                <span className="md:ml-4 ml-1">noreply</span>
              </div>
              <div>
                <span className="break-words">noreply@hcmatrix.com</span>
              </div>
              <div className="flex items-center">
                <i class="fas fa-check-circle text-green-500"></i>
                <span className="md:ml-4 ml-1">Verified</span>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default FromAddresses;
