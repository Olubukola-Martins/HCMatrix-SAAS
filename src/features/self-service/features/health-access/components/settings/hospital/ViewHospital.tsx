import { Form, Input, Modal } from "antd";
import React, { useEffect } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormHospitalCategoryInput } from "./category/FormHospitalCategoryInput";
import { FormHMOPlanInput } from "../hmoPlan/FormHMOPlanInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import AppSwitch from "components/switch/AppSwitch";
import { THospital } from "../../../types/hospital/hospital";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";

interface IProps extends IModalProps {
  hospital?: THospital;
}
export const ViewHospital: React.FC<IProps> = ({
  open,
  handleClose,
  hospital,
}) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      name: hospital?.name,
      categoryId: hospital?.categoryId,
      isRecommended: hospital?.isRecommended,
      phone: {
        code: parsePhoneNumber(hospital?.phoneNumber).code,
        number: parsePhoneNumber(hospital?.phoneNumber).number,
      },
      address: hospital?.address,
      hmoPlanIds: hospital?.hmoPlanManagement.map((item) => item.hmoPlanId),
    });
  }, [form, hospital]);

  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"View Hospital"}
      style={{ top: 20 }}
    >
      <Form layout="vertical" form={form} requiredMark={false} disabled>
        <Form.Item rules={textInputValidationRules} name="name" label="Name">
          <Input placeholder="Name" />
        </Form.Item>
        <FormHospitalCategoryInput
          Form={Form}
          control={{ label: "Category", name: "categoryId" }}
        />
        <FormHMOPlanInput
          Form={Form}
          control={{ label: "HMO Plan", name: "hmoPlanIds" }}
          mode="multiple"
        />
        <FormPhoneInput Form={Form} />

        <Form.Item
          rules={generalValidationRules}
          name="isRecommended"
          label="Is Recommended ?"
        >
          <AppSwitch checkedChildren="Yes" unCheckedChildren="No" />
        </Form.Item>
        <FormAddressInput Form={Form} form={form} />
      </Form>
    </Modal>
  );
};
