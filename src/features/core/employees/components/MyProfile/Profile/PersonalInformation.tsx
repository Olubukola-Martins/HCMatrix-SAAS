import { DatePicker, Form, Input, message, Select, Tooltip } from "antd";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { FormAddressInput } from "components/generalFormInputs/FormAddressInput";
import { FormNationalityInput } from "components/generalFormInputs/FormNationalityInput";
import { FormPhoneInput } from "components/generalFormInputs/FormPhoneInput";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import {
  EMPLOYMENT_ELIGIBILITIES_OPTIONS,
  GENDERS,
  MARITAL_STATUSES,
} from "constants/general";
import { useSaveEmployeePersonalInformation } from "features/core/employees/hooks/personalInformation/useSaveEmployeePersonalInformation";
import { QUERY_KEY_FOR_SINGLE_EMPLOYEE } from "features/core/employees/hooks/useFetchSingleEmployee";
import { TSingleEmployee } from "features/core/employees/types";
import { FormExchangeRateInput } from "features/payroll/components/exchangeRates/FormExchangeRateInput";
import { useCurrentFileUploadUrl } from "hooks/useCurrentFileUploadUrl";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import { TEmploymentEligibity } from "types/employementEligibilities";
import { formatPhoneNumber } from "utils/dataHelpers/formatPhoneNumber";
import { parsePhoneNumber } from "utils/dataHelpers/parsePhoneNumber";
import {
  dateHasToBeLesserThanOrEqualToCurrentDayRule,
  emailValidationRulesOp,
  generalValidationRules,
} from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";

interface IProps {
  personalInfo?: TSingleEmployee["personalInformation"];
  employeeId?: number;
  isOwner?: boolean;
}

export const PersonalInformation: React.FC<IProps> = ({
  personalInfo,
  employeeId,
  isOwner = false,
}) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const [disable, setDisable] = useState(true);
  const [selectedEligibility, setSelectedEligibility] =
    useState<TEmploymentEligibity>();

  const documentUrl = useCurrentFileUploadUrl("documentUrl");

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  useEffect(() => {
    if (!personalInfo) return;

    form.setFieldsValue({
      dob: personalInfo.dob ? dayjs(personalInfo.dob) : null,
      nationality: personalInfo.nationality,
      gender: personalInfo.gender,
      maritalStatus: personalInfo.maritalStatus,
      exchangeRateId: personalInfo.exchangeRateId,
      eligibility: personalInfo.eligibility,
      timezone: personalInfo.address?.timezone,
      countryId: personalInfo.address?.countryId,
      stateId: personalInfo.address?.stateId,
      phone: {
        code: parsePhoneNumber(personalInfo?.phoneNumber)?.code,
        number: parsePhoneNumber(personalInfo?.phoneNumber).number,
      },
      lgaId: personalInfo.address?.lgaId,
      streetAddress: personalInfo.address?.streetAddress,
      passportExpirationDate: personalInfo.passportExpirationDate
        ? dayjs(personalInfo.passportExpirationDate)
        : null,
      alternativeEmail: personalInfo?.alternativeEmail,
      alternativePhoneNumber: {
        code: parsePhoneNumber(personalInfo.alternativePhoneNumber)?.code,
        number: parsePhoneNumber(personalInfo.alternativePhoneNumber).number,
      },
      nin: personalInfo?.nin,
      address: {
        timezone: personalInfo?.address?.timezone,
        streetAddress: personalInfo?.address?.streetAddress,
        countryId: personalInfo?.address?.countryId,
        stateId: personalInfo?.address?.stateId,
        lgaId: personalInfo?.address?.lgaId,
        latitude: personalInfo?.address?.latitude,
        longitude: personalInfo?.address?.longitude,
      },
    });
    setSelectedEligibility(
      personalInfo.eligibility as unknown as TEmploymentEligibity
    );
  }, [personalInfo, form]);

  const { mutate, isLoading } = useSaveEmployeePersonalInformation();

  const handleFinish = (data: any) => {
    if (!employeeId) return;

    mutate(
      {
        employeeId,
        data: {
          dob: data?.dob?.format(DEFAULT_DATE_FORMAT),
          gender: data.gender,
          phoneNumber: formatPhoneNumber({
            code: data?.phone?.code,
            number: data?.phone.number,
          }),
          eligibility: data.eligibility,
          exchangeRateId: data.exchangeRateId,
          maritalStatus: data.maritalStatus,
          nationality: data.nationality,
          address: {
            ...data.address,
            lgaId: data?.address?.lgaId ?? undefined,
          },

          validDocumentUrl: documentUrl,
          passportExpirationDate:
            data?.passportExpirationDate?.format(DEFAULT_DATE_FORMAT),
          alternativeEmail: data.alternativeEmail,
          alternativePhoneNumber: formatPhoneNumber({
            code: data.alternativePhoneNumber?.code,
            number: data.alternativePhoneNumber.number,
          }),
          nin: data.nin,
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
            // duration: 0.4,
          });

          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_SINGLE_EMPLOYEE],
            // exact: true,
          });
        },
      }
    );
  };

  return (
    <div>
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <div className="flex justify-between mb-3">
          <h2 className="font-medium text-lg">Personal Information</h2>
          {isOwner && (
            <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
              <i
                className={
                  disable
                    ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                    : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
                }
                onClick={enableEdit}
              ></i>
            </Tooltip>
          )}
        </div>

        <div className="bg-card p-3 rounded">
          <Form
            requiredMark={false}
            form={form}
            layout="vertical"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            onFinish={handleFinish}
            disabled={disable}
          >
            <Form.Item
              name="dob"
              label="Date of Birth"
              rules={[dateHasToBeLesserThanOrEqualToCurrentDayRule]}
            >
              <DatePicker className="w-full" format={DEFAULT_DATE_FORMAT} />
            </Form.Item>
            <FormNationalityInput
              Form={Form}
              control={{ label: "Nationality", name: "nationality" }}
            />
            <FormPhoneInput Form={Form} />
            <Form.Item
              name="eligibility"
              label="Employment Eligibility"
              rules={generalValidationRules}
            >
              <Select
                className="capitalize"
                placeholder="Select"
                onChange={(val: TEmploymentEligibity) =>
                  setSelectedEligibility(val)
                }
                options={EMPLOYMENT_ELIGIBILITIES_OPTIONS}
              />
            </Form.Item>

            {selectedEligibility === "expatriate" && (
              <FormExchangeRateInput
                Form={Form}
                control={{ label: "Exchange Rate", name: "exchangeRateId" }}
              />
            )}
            {selectedEligibility === "expatriate" && (
              <Form.Item
                name="passportExpirationDate"
                label="Passport Expiration Date"
                rules={generalValidationRules}
              >
                <DatePicker format={DEFAULT_DATE_FORMAT} className="w-full" />
              </Form.Item>
            )}
            {!disable && selectedEligibility === "expatriate" && (
              <Form.Item label="Supporting Document">
                <div className={`px-3 py-2 shadow rounded-sm bg-mainBg`}>
                  <FileUpload
                    allowedFileTypes={[
                      "image/jpeg",
                      "image/png",
                      "image/jpg",
                      "application/pdf",
                    ]}
                    fileKey="documentUrl"
                    textToDisplay="Upload file"
                    displayType="form-space-between"
                  />
                </div>
              </Form.Item>
            )}
            {disable && selectedEligibility === "expatriate" && (
              <Form.Item label="Supporting Document">
                <div className={`px-3 py-2 shadow rounded-sm bg-mainBg`}>
                  {personalInfo?.validDocumentUrl && (
                    <a
                      className="hover:text-caramel underline"
                      href={personalInfo?.validDocumentUrl}
                    >
                      Download Valid Document
                    </a>
                  )}
                  {!personalInfo?.validDocumentUrl && <span>No Document</span>}
                </div>
              </Form.Item>
            )}
            <Form.Item
              name="gender"
              label="Gender"
              rules={generalValidationRules}
            >
              <Select options={GENDERS} />
            </Form.Item>
            <Form.Item
              name="maritalStatus"
              label="Marital Status"
              rules={generalValidationRules}
            >
              <Select options={MARITAL_STATUSES} />
            </Form.Item>

            <Form.Item
              name="nin"
              label="National Identification Number"
              rules={generalValidationRules}
            >
              <Input className="w-full" />
            </Form.Item>
            <Form.Item
              name="alternativeEmail"
              rules={emailValidationRulesOp}
              label="Alternative Email"
            >
              <Input className="w-full" />
            </Form.Item>
            <FormPhoneInput
              Form={Form}
              control={{
                name: "alternativePhoneNumber",
                label: "Alternative Phone Number",
              }}
              optional
            />

            <>
              <FormAddressInput Form={Form} form={form} disabled={disable} />
            </>
            {!disable && (
              <div className="flex items-center justify-end md:col-span-2 lg:col-span-3">
                <AppButton
                  label="Save Changes"
                  isLoading={isLoading}
                  type="submit"
                />
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
