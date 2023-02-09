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
import { useCreateEmployeePersonalInfo } from "APIRQHooks/Utility/employeeHooks";
import { IAuthDets } from "AppTypes/Auth";
import { TEmployee, TPersonalInfo } from "AppTypes/DataEntitities";
import { GlobalContext } from "Contexts/GlobalContextProvider";
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
        dateOfBirth: moment(personalInfo.dob),
        nationality: personalInfo.nationality,
        gender: personalInfo.gender,
        maritalStatus: personalInfo.maritalStatus,
        state: personalInfo.address.stateId,
        lga: personalInfo.address.lgaId,
        employmentEligibility: personalInfo.eligibility,
        streetAddress: personalInfo.address.streetAddress,
        passportExpirationDate: personalInfo.passportExpirationDate,
      });
    }
  }, [employee]);

  const handleCitizen = (val: string) => {
    setHiddenInputs(val);
  };

  const { mutate, isLoading } = useCreateEmployeePersonalInfo();

  const handleFinish = (data: any) => {
    if (companyId && employee && !employee.personalInformation) {
      //if the personal info doesnt exist, then create
      const props: ICreateEmpPersonalInfoProps = {
        token,
        companyId,
        dob: data.dob,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
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
        passportExpirationDate: data.passportExpirationDate,
        validDocumentUrl: data.validDocumentUrl,
        employeeId: employee.id,
      };

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(props, {
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
      const props: ICreateEmpPersonalInfoProps = {
        token,
        companyId,
        dob: data.dob,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
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
        passportExpirationDate: data.passportExpirationDate,
        validDocumentUrl: data.validDocumentUrl,
        employeeId: employee.id,
      };

      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(props, {
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
            form={form}
            layout="vertical"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            onFinish={handleFinish}
            disabled={disable}
          >
            <Form.Item name="dateOfBirth" label="Date of Birth">
              <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="employmentEligibility"
              label="Employment Eligibility"
            >
              <Select
                className="SelectTag w-full"
                size="large"
                placeholder="Select"
                onChange={handleCitizen}
              >
                <Option value="citizen">Citizen</Option>
                <Option value="NotCitizen">Not a citizen</Option>
              </Select>
            </Form.Item>

            {hiddenInputs === "NotCitizen" && (
              <Form.Item
                name="passportExpirationDate"
                label="Passport Expiration Date"
              >
                <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
              </Form.Item>
            )}
            {hiddenInputs === "NotCitizen" && (
              <Form.Item label="Upload valid document">
                <Upload>
                  <Input type="file" className="generalInputStyle" />
                </Upload>
              </Form.Item>
            )}
            {/* <Form.Item name="document" className="hidden">
              <Input className="generalInputStyle"  />
            </Form.Item> */}

            <Form.Item name="gender" label="Gender">
              <Select className="SelectTag w-full" size="large">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
            <Form.Item name="maritalStatus" label="Marital Status">
              <Select className="SelectTag w-full" size="large">
                <Option value="married">Married</Option>
                <Option value="single">Single</Option>
                <Option value="widowed">Widowed</Option>
                <Option value="divorced">Divorced</Option>
                <Option value="separated">Separated</Option>
              </Select>
            </Form.Item>

            <Form.Item name="nationality" label="Nationality">
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                className="SelectTag w-full"
                size="large"
                placeholder="Select Nationality"
              >
                {countryList.map((data) => (
                  <Option key={data} value={data} label={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="state" label="State">
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                className="SelectTag w-full"
                size="large"
                placeholder="Select state"
              >
                {stateList.map((data) => (
                  <Option key={data} value={data} label={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="lga" label="LGA">
              <Select
                showSearch
                allowClear
                optionLabelProp="label"
                className="SelectTag w-full"
                size="large"
                placeholder="Select lga"
              >
                {stateList.map((data) => (
                  <Option key={data} value={data} label={data}>
                    {data}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="streetAddress"
              label="Street Address"
              className="col-span-3"
            >
              <Input.TextArea rows={3} />
            </Form.Item>

            {!disable && (
              <div className="flex items-center">
                <button className="button" type="submit">
                  {isLoading ? <BeatLoader color="#fff" /> : "Save changes"}
                </button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
