import { Form, Input, InputNumber, Modal, Slider } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";

interface IProps extends IModalProps {
  template: any;
}
const ViewPayslipTemplate: React.FC<IProps> = ({
  open,
  handleClose,
  template,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Payslip Template"}
      style={{ top: 20 }}
    >
      Template Details will be shown here
    </Modal>
  );
};

export default ViewPayslipTemplate;
