import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { useAddHospital } from "../../../hooks/hospital/useAddHospital";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormHospitalCategoryInput } from "./category/FormHospitalCategoryInput";
import { FormHMOPlanInput } from "../hmoPlan/FormHMOPlanInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { QUERY_KEY_FOR_HOSPITALS } from "../../../hooks/hospital/useGetHospitals";
import { QUERY_KEY_FOR_HOSPITALS_4_EMPLOYEE_WITH_HMO } from "../../../hooks/hospital/useGetHospitalsForEmployeeWithHMO";
import AppSwitch from "components/switch/AppSwitch";

export const AddHospital: React.FC<IModalProps> = ({ open, handleClose }) => {
  const queryClient = useQueryClient();

  const [form] = Form.useForm();
  const { mutate, isLoading } = useAddHospital();
  const [isRecommended, setIsRecommended] = useState(false);

  const handleSubmit = (data: any) => {
    mutate(
      {
        name: data.name,
        categoryId: data.categoryId,
        isRecommended: !!data.isRecommended,
        phoneNumber: formatPhoneNumber({
          code: data.phone.code,
          number: data.phone.number,
        }),
        address: data.address,
        hmoPlanManagement: (data.hmoPlanIds as unknown as number[]).map(
          (item) => ({
            hmoPlanId: item,
          })
        ),
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
          });
          form.resetFields();
          handleClose();

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_HOSPITALS],
          });
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_HOSPITALS_4_EMPLOYEE_WITH_HMO],
          });
        },
      }
    );
  };
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Add Hospital"}
      style={{ top: 20 }}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        requiredMark={false}
      >
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
          <AppSwitch
            checkedChildren="Yes"
            unCheckedChildren="No"
            checked={isRecommended}
            onChange={(val) => setIsRecommended(val)}
          />
        </Form.Item>
        <FormAddressInput Form={Form} form={form} />

        <div className="flex justify-end">
          <AppButton type="submit" isLoading={isLoading} />
        </div>
      </Form>
    </Modal>
  );
};

export const AddHospitalBtn = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddHospital open={open} handleClose={() => setOpen(false)} />
      <AppButton
        handleClick={() => {
          setOpen(true);
        }}
        label="Add Hospital"
      />
    </>
  );
};
