import {
  DatePicker,
  Form,
  Input,
  message,
  Select,
  Spin,
  Tooltip,
  Upload,
} from "antd";
import { ICreateEmpPersonalInfoProps } from "ApiRequesHelpers/Utility/employee";
import {
  useFetchCountries,
  useFetchStates,
  useFetchLgas,
} from "APIRQHooks/Utility/countryHooks";
import {
  useCreateEmployeePersonalInfo,
  useUpdateEmployeePersonalInfo,
} from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TEmployee, TPersonalInfo } from "AppTypes/DataEntitities";
import {
  employmentEligibilities,
  genders,
  maritalStatuses,
  timeZones,
} from "Constants";
import { GlobalContext } from "Contexts/GlobalContextProvider";
import {
  generalValidationRules,
  phoneNumberValidationRule,
  textInputValidationRules,
} from "FormHelpers/validation";
import moment from "moment";
import { openNotification } from "NotificationHelpers";
import { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { countryList } from "../../../../../../Helpers/countryList";
import { stateList } from "../../../../../../Helpers/stateList";
const { Option } = Select;

interface IProps {
  employee?: TEmployee;
}

export const Profile = ({ employee }: IProps) => {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;
  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;
  const [disable, setDisable] = useState(true);
  const [hiddenInputs, setHiddenInputs] = useState("");
  const [stateId, setStateId] = useState(
    employee?.personalInformation?.address.stateId ?? 0
  );
  const [countryId, setCountryId] = useState(
    employee?.personalInformation?.address.countryId ?? 0
  );
  const { data: countries, isSuccess } = useFetchCountries();
  const { data: states, isSuccess: stateSuccess } = useFetchStates({
    countryId: countryId as unknown as string,
  });
  const { data: lga, isSuccess: lgaSuccess } = useFetchLgas({
    stateId: stateId as unknown as string,
  });

  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  useEffect(() => {
    const personalInfo = employee?.personalInformation;
    if (personalInfo) {
      form.setFieldsValue({
        dob: personalInfo.dob ? moment(personalInfo.dob) : null,
        nationality: personalInfo.nationality,
        gender: personalInfo.gender,
        maritalStatus: personalInfo.maritalStatus,

        eligibility: personalInfo.eligibility,
        timezone: personalInfo.address.timezone,
        countryId: personalInfo.address.countryId,
        stateId: personalInfo.address.stateId,
        phone: {
          number: personalInfo.phoneNumber.split("-")[1],
          code: personalInfo.phoneNumber.split("-")[0].slice(1), //remove the plus
        },
        lgaId: personalInfo.address.lgaId,
        streetAddress: personalInfo.address.streetAddress,
        passportExpirationDate: personalInfo.passportExpirationDate
          ? moment(personalInfo.passportExpirationDate)
          : null,
      });
    }
  }, [employee]);

  const handleCitizen = (val: string) => {
    setHiddenInputs(val);
  };

  const { mutate: createMutate, isLoading: createLoading } =
    useCreateEmployeePersonalInfo();
  const { mutate: updateMutate, isLoading: updateLoading } =
    useUpdateEmployeePersonalInfo();

  const handleFinish = (data: any) => {
    const countryPhoneCode =
      countries?.find((item) => item.id === data.phone.code)?.code ?? "";
    if (companyId && employee && !employee.personalInformation) {
      //if the personal info doesnt exist, then create
      let props: ICreateEmpPersonalInfoProps = {
        token,
        companyId,
        dob: data.dob.format("YYYY-MM-DD"),
        gender: data.gender,
        phoneNumber: `+${countryPhoneCode}-${data.phone.number}`,
        eligibility: data.eligibility,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality,
        address: {
          streetAddress: data.streetAddress,
          countryId: data.countryId,
          stateId: data.stateId,
          lgaId: data.lgaId,
          timezone: data.timezone,
        },

        validDocumentUrl: data.validDocumentUrl,
        employeeId: employee.id,
      };
      if (data?.passportExpirationDate) {
        props = {
          ...props,
          passportExpirationDate:
            data?.passportExpirationDate?.format("YYYY-MM-DD"),
        };
      }

      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      createMutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res?.data?.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["single-employee", employee?.id],
          });
        },
      });
    }
    if (companyId && employee && employee.personalInformation) {
      //if the personal info exist, then update
      let props: ICreateEmpPersonalInfoProps = {
        token,
        companyId,
        dob: data?.dob?.format("YYYY-MM-DD"),
        gender: data.gender,
        phoneNumber: `+${countryPhoneCode}-${data.phone.number}`,
        eligibility: data.eligibility,
        maritalStatus: data.maritalStatus,
        nationality: data.nationality,
        address: {
          streetAddress: data.streetAddress,
          countryId: data.countryId,
          stateId: data.stateId,
          lgaId: data.lgaId,
          timezone: data.timezone,
        },

        validDocumentUrl: data.validDocumentUrl,
        employeeId: employee.id,
      };
      if (data?.passportExpirationDate) {
        props = {
          ...props,
          passportExpirationDate:
            data?.passportExpirationDate?.format("YYYY-MM-DD"),
        };
      }

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      updateMutate(props, {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occured",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res?.data?.message,
          });
          queryClient.invalidateQueries({
            queryKey: ["single-employee", employee?.id],
          });
        },
      });
    }
  };

  return (
    <div>
      <div className="bg-mainBg shadow-sm rounded-md p-4 mt-5">
        <div className="flex justify-between mb-3">
          <h2 className="font-medium text-lg">Personal Information</h2>
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
              rules={[{ required: true }]}
            >
              <DatePicker format="YYYY/MM/DD" className="w-full" />
            </Form.Item>
            <Form.Item name="phone" label="Phone Number">
              <Input.Group compact>
                <Form.Item
                  noStyle
                  rules={generalValidationRules}
                  name={["phone", "code"]}
                >
                  {isSuccess && (
                    <Select
                      // showSearch
                      // allowClear
                      // optionLabelProp="label"
                      className="rounded border-slate-400"
                      style={{ width: "35%" }}
                      options={countries.map((item) => ({
                        label: `+${item.code}`,
                        value: item.id,
                      }))}
                    />
                  )}
                </Form.Item>
                <Form.Item
                  noStyle
                  rules={[
                    ...textInputValidationRules,
                    phoneNumberValidationRule,
                  ]}
                  name={["phone", "number"]}
                >
                  <Input
                    style={{ width: "65%" }}
                    placeholder="Business Phone"
                    className="rounded border-slate-400 text-left"
                    autoComplete="phone"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              name="eligibility"
              label="Employment Eligibility"
              rules={generalValidationRules}
            >
              <Select
                placeholder="Select"
                onChange={handleCitizen}
                options={employmentEligibilities}
              />
            </Form.Item>
            <Form.Item
              name="timezone"
              label="Time Zone"
              rules={generalValidationRules}
            >
              <Select placeholder="Select" options={timeZones} />
            </Form.Item>

            {hiddenInputs === "not a citizen" && (
              <Form.Item
                name="passportExpirationDate"
                label="Passport Expiration Date"
              >
                <DatePicker format="YYYY/MM/DD" className="w-full" />
              </Form.Item>
            )}
            {hiddenInputs === "NotCitizen" && (
              <Form.Item label="Upload valid document">
                <Upload>
                  <Input type="file" />
                </Upload>
              </Form.Item>
            )}
            <Form.Item
              name="gender"
              label="Gender"
              rules={generalValidationRules}
            >
              <Select options={genders} />
            </Form.Item>
            <Form.Item
              name="maritalStatus"
              label="Marital Status"
              rules={generalValidationRules}
            >
              <Select options={maritalStatuses} />
            </Form.Item>
            <Form.Item
              name="nationality"
              label="Nationality"
              rules={generalValidationRules}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder="Select"
              >
                {countries?.map((data) => (
                  <Option key={data.id} value={data.name} label={data.name}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="countryId"
              label="Country"
              rules={generalValidationRules}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder="Select"
                onChange={(val) => setCountryId(val)}
              >
                {countries?.map((data) => (
                  <Option key={data.id} value={data.id} label={data.name}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="stateId"
              label="State"
              rules={generalValidationRules}
            >
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                placeholder="Select state"
                onChange={(val) => setStateId(val)}
              >
                {states?.map((data) => (
                  <Option key={data.id} value={data.id} label={data.name}>
                    {data.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            {lgaSuccess && lga.length > 0 && (
              <Form.Item
                name="lgaId"
                label="LGA"
                rules={generalValidationRules}
              >
                <Select
                  showSearch
                  allowClear
                  optionLabelProp="label"
                  placeholder="Select"
                >
                  {lga?.map((data) => (
                    <Option key={data.id} value={data.id} label={data.name}>
                      {data.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="streetAddress"
              label="Street Address"
              className="col-span-3"
              rules={textInputValidationRules}
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            {!disable && (
              <div className="flex items-center">
                <button className="button" type="submit">
                  {createLoading || updateLoading ? (
                    <BeatLoader color="#fff" />
                  ) : (
                    "Save changes"
                  )}
                </button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
