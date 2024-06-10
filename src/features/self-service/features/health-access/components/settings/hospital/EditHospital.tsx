import { Form, Input, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import React, { useEffect, useState } from "react";
import { IModalProps } from "types";
import {
  generalValidationRules,
  textInputValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormHospitalCategoryInput } from "./category/FormHospitalCategoryInput";
import { FormHMOPlanInput } from "../hmoPlan/FormHMOPlanInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { QUERY_KEY_FOR_HOSPITALS } from "../../../hooks/hospital/useGetHospitals";
import { QUERY_KEY_FOR_HOSPITALS_4_EMPLOYEE_WITH_HMO } from "../../../hooks/hospital/useGetHospitalsForEmployeeWithHMO";
import AppSwitch from "components/switch/AppSwitch";
import { useUpdateHospital } from "../../../hooks/hospital/useUpdateHospital";
import { THospital } from "../../../types/hospital/hospital";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";

interface IProps extends IModalProps {
  hospital?: THospital;
}
export const EditHospital: React.FC<IProps> = ({
  open,
  handleClose,
  hospital,
}) => {
  const queryClient = useQueryClient();
  const [isRecommended, setIsRecommended] = useState(false);
  const [form] = Form.useForm();
  const { mutate, isLoading } = useUpdateHospital();
  useEffect(() => {
    form.setFieldsValue({
      name: hospital?.name,
      categoryId: hospital?.categoryId,
      isRecommended: hospital?.isRecommended,
      phone: {
        code: parsePhoneNumber(hospital?.phoneNumber)?.code,
        number: parsePhoneNumber(hospital?.phoneNumber).number,
      },
      address: {
        streetAddress: hospital?.address?.streetAddress,
        countryId: hospital?.address?.countryId,
        stateId: hospital?.address?.stateId,
        lgaId: hospital?.address?.lgaId ?? undefined, //Done to prevent sending null, instead send undefined
        timezone: hospital?.address?.timezone,
      },
      hmoPlanIds: hospital?.hmoPlanManagement.map((item) => item.hmoPlanId),
    });
    setIsRecommended(!!hospital?.isRecommended);
  }, [form, hospital]);

  const handleSubmit = (data: any) => {
    if (!hospital) return;
    mutate(
      {
        hospitalId: hospital?.id,
        currentHmoPlanManagement: hospital.hmoPlanManagement,
        body: {
          data: {
            name: data.name,
            categoryId: data.categoryId,
            isRecommended: !!data.isRecommended,
            phoneNumber: formatPhoneNumber({
              code: data?.phone?.code,
              number: data?.phone.number,
            }),
            address: data.address,
          },
          hmoPlanManagement: (data.hmoPlanIds as unknown as number[]).map(
            (item) => ({
              hmoPlanId: item,
            })
          ),
        },
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
      title={"Edit Hospital"}
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
