import { DatePicker, Form, Input, Select } from "antd";

import { useContext, useState } from "react";
import { GlobalContext } from "stateManagers/GlobalContextProvider";
import {
  textInputValidationRules,
  generalValidationRules,
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
} from "utils/formHelpers/validation";

import { stepperInputProps } from "features/authentication/types";
import {
  EMPLOYMENT_ELIGIBILITIES_OPTIONS,
  GENDERS,
  MARITAL_STATUSES,
} from "constants/general";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { AppButton } from "components/button/AppButton";
import { FormNationalityInput } from "components/generalFormInputs/FormNationalityInput";

export const PersonalInfo = ({
  onFinished,
  initialValues,
  setCurrent,
  isLoading,
  form,
}: stepperInputProps) => {
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  // TODO: Implement file upload for passport n also refactor passport expiration date input
  const fileUrl = globalState.upLoadFileString;

  const [hiddenInputs, setHiddenInputs] = useState("");
  const handleCitizen = (val: string) => {
    setHiddenInputs(val);
  };
  const citizenCheck = hiddenInputs === "expatriate" ? false : true;

  return (
    <div>
      <Form
        onFinish={onFinished}
        initialValues={initialValues}
        layout="vertical"
        requiredMark={false}
        form={form}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={textInputValidationRules}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="last Name"
            rules={textInputValidationRules}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <FormPhoneInput Form={Form} />

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
          >
            <DatePicker className="w-full" format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={generalValidationRules}
          >
            <Select className="w-full" placeholder="Gender" options={GENDERS} />
          </Form.Item>
          <Form.Item
            name="maritalStatus"
            label="Marital Status"
            rules={generalValidationRules}
          >
            <Select
              className="w-full"
              placeholder="Select"
              options={MARITAL_STATUSES}
            />
          </Form.Item>
          <Form.Item
            name="eligibility"
            label="Employment Eligibility"
            rules={generalValidationRules}
          >
            <Select
              placeholder="Select"
              onChange={handleCitizen}
              options={EMPLOYMENT_ELIGIBILITIES_OPTIONS}
            />
          </Form.Item>

          <Form.Item
            name="passportExpirationDate"
            label="Passport Expiration Date"
          >
            <DatePicker
              format="YYYY/MM/DD"
              className="w-full"
              disabled={citizenCheck}
            />
          </Form.Item>

          {/* <Form.Item label="Upload valid document" name="validDocumentUrl">
            <Input
              type="hidden"
              className="w-full"
              defaultValue={fileUrl}
            />
            <FileUpload
              allowedFileTypes={[
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                "image/png",
              ]}
            />
          </Form.Item> */}

          <FormNationalityInput
            Form={Form}
            control={{ label: "Nationality", name: "nationality" }}
          />
          {form && <FormAddressInput Form={Form} form={form} />}
        </div>
        <div className="flex justify-between mt-3">
          <AppButton
            variant="transparent"
            label="Previous"
            handleClick={() => setCurrent(0)}
          />
          <AppButton type="submit" isLoading={isLoading} label="Continue" />
        </div>
      </Form>
    </div>
  );
};
