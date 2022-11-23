// import React from "react";
// import * as Yup from "yup";
// import { motion } from "framer-motion";
// import { ErrorMessage, Field, Form, Formik } from "formik";

import { Form, Input, Modal, Select } from "antd";
import { IModalProps } from "../../../../AppTypes/Component";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../../../FormHelpers/validation";

// const AddDelegationDrawer = ({ handleDrawer }) => {
//   const initialValues = {
//     delegator: "",
//     delegatee: "",
//     notification: [],
//     description: "",
//     delegation_type: "",
//     delegation_duration: "",
//   };

//   const validationSchema = Yup.object({
//     delegator: Yup.string().required("Field is required!"),
//     delegatee: Yup.string().required("Field is required!"),
//     notification: Yup.array().required("At least one must be checked"),
//     description: Yup.string().required("Field is required!"),
//     delegation_type: Yup.string().required("Field is required!"),
//   });

//   const onSubmit = (values, onSubmitProps) => {
//     console.log("Form data", values);
//     onSubmitProps.setSubmitting(false);
//     onSubmitProps.resetForm();
//   };

//   return (
//     <motion.div
//       initial={{ x: 500 }}
//       animate={{
//         x: 0,
//       }}
//       transition={{ ease: "easeIn" }}
//       exit={{ x: 500 }}
//       className="w-96 fixed overflow-y-auto mode_color right-0 drop-shadow-lg z-50 cursor-move pb-8"
//       drag
//       style={{ height: "28rem" }}
//     >
//       <div className="flex justify-between text-xl items-center font-light py-2 px-4 mt-4">
//         <h5 className="text-accent">Add Delegation</h5>
//         <i
//           className="fa fa-times cursor-pointer"
//           aria-hidden="true"
//           onClick={() => handleDrawer("")}
//         ></i>
//       </div>

//       <div className="mt-4 text-accent">
//         <div className="px-6 mt-4">
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={onSubmit}
//             validateOnMount
//           >
//             {(formik) => {
//               return (
//                 <Form className="text-accent mt-6 grid grid-cols-1 gap-8">
//                   <div>
//                     <div className="input-container w-full">
//
//                   </div>
//                   <div>
//                     <div className="input-container w-full">
//
//                   </div>
//                   <div>
//                     <div className="text-sm">
//                       <label className=" font-bold mb-2 block">Type</label>
//                       <div className="flex gap-6">
//                         <div>
//                           <label
//                             htmlFor="temporary"
//                             className="mb-1 block cursor-pointer"
//                           >
//                             Temporary
//                           </label>
//                           <Field
//                             id="temporary"
//                             name="delegation_type"
//                             type="radio"
//                             value="Temporary"
//                           />
//                         </div>
//                         <div>
//                           <label
//                             htmlFor="Permanent"
//                             className="mb-1 block cursor-pointer"
//                           >
//                             Permanent
//                           </label>
//                           <Field
//                             id="Permanent"
//                             name="delegation_type"
//                             type="radio"
//                             value="Permanent"
//                           />
//                         </div>
//                       </div>
//                       <div className="input-container mt-3">
//                         <label className="font-semibold">Enter Duration</label>
//                         <Field
//                           type="text"
//                           name="delegation_duration"
//                           className="mt-2"
//                           placeholder="Enter delegation duration"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   <div>
//                     <div className="input-container w-full text-sm">
//                       <label className="font-bold mb-2 block">
//                         Notification
//                       </label>
//                       <div className="flex gap-6">
//                         <div className="flex gap-2 items-center">
//                           <label htmlFor="N_delegator" className="mb-1 block">
//                             Delegator
//                           </label>
//                           <Field
//                             type="checkbox"
//                             id="N_delegator"
//                             name="notification"
//                             value="Notify_Delegator"
//                           />
//                         </div>
//                         <div className="flex gap-2 items-center">
//                           <label htmlFor="N_delegatee" className="mb-1 block">
//                             Delegatee
//                           </label>
//                           <Field
//                             id="N_delegatee"
//                             type="checkbox"
//                             name="notification"
//                             value="Notify_Delegatee"
//                           />
//                         </div>
//                         <ErrorMessage component="span" name="notification" />
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <div className="input-container w-full ">
//                       <label className="text-sm mb-2 block font-bold">
//                         Description
//                       </label>
//                       <Field as="textarea" name="description" rows={4} />
//                       <ErrorMessage name="description" component="span" />
//                     </div>
//                   </div>
//                   <div className="form-buttons flex justify-between mt-2">
//                     <button className="py-2 px-4 rounded text-sm font-medium">
//                       Cancel
//                     </button>
//                     <button
//                       disabled={!formik.isValid || formik.isSubmitting}
//                       className="button"
//                       type="submit"
//                     >
//                       Save
//                     </button>
//                   </div>
//                 </Form>
//               );
//             }}
//           </Formik>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default AddDelegationDrawer;

export const AddDelegation = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      title="Add Delegation"
      open={open}
      onCancel={() => handleClose(false)}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item name="delegator" label="Delegator">
          <Input
            defaultValue="Godswill Smile"
            className="generalInputStyle"
            disabled
          />
        </Form.Item>

        <Form.Item
          name="delegatee"
          label="Delegatee"
          rules={generalValidationRules}
        >
          <Select
            showSearch
            allowClear
            optionLabelProp="label"
            className="SelectTag w-full"
            size="large"
            placeholder="Select Delegatee"
          >
            {["Isaac Odeh", "Obi james"].map((data) => (
              <Select.Option key={data} value={data} label={data}>
                {data}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="delegationType"
          label="Delegation Type"
          rules={textInputValidationRules}
        >
          <Select>
            <Select.Option> </Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
