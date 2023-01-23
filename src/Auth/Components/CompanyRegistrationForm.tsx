import { Form, Input, Modal, Result, Select, Skeleton } from "antd";
import { useState } from "react";
import {
  emailValidationRules,
  generalValidationRules,
  passwordValidationRules,
  textInputValidationRules,
} from "../../FormHelpers/validation";
import {
  LockOutlined,
  ReconciliationOutlined,
  UserOutlined,
  BankOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useMutation } from "react-query";
import {
  createCompany,
  ICreateCompProps,
} from "../../ApiRequesHelpers/Utility/company";
import { openNotification } from "../../NotificationHelpers";
import { LoadingOutlined } from "@ant-design/icons";
import { Rule } from "antd/lib/form";
import { BeatLoader } from "react-spinners";
import { useFetchIndustries } from "../../APIRQHooks/Utility/industryHooks";
import { useFetchCountries } from "../../APIRQHooks/Utility/countryHooks";
import CompanySucess from "../Assets/SVGComponents/CompanySucess";

const CompanyRegistrationForm = () => {
  const [showM, setShowM] = useState(false);
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const {
    data: industries,

    isSuccess: isISuccess,
  } = useFetchIndustries();
  const {
    data: countries,

    isSuccess: isCSuccess,
  } = useFetchCountries();
  const { mutate, isLoading } = useMutation(createCompany);

  const handleSignUp = (data: any) => {
    const countryPhoneCode =
      countries?.find((item) => item.id == data.phone.code)?.code ?? "";
    const props: ICreateCompProps = {
      name: data.organization,
      email: data.email,
      phoneNumber: `+${countryPhoneCode}-${data.phone.number}`,
      industryId: data.industry,
      customerFullName: data.fullName,
      password: data.password,
      confirmPassword: data.cPassword,
    };
    openNotification({
      state: "info",
      title: "Wait a second ...",
      // description: <Progress percent={80} status="active" />,
      description: <LoadingOutlined />,
    });
    mutate(props, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },

      onSuccess: (res) => {
        const result = res.data.data;

        openNotification({
          state: "success",

          title: "Success",
          description:
            "Company created successfully. Please verify your email to continue!",
          // duration: 0.4,
        });
        setEmail(props.email);
        setShowM(true);
        form.resetFields();
      },
    });
  };
  return (
    <>
      <Modal footer={null} open={showM} onCancel={() => setShowM(false)}>
        <Result
          icon={<CompanySucess />}
          title="Company created successfully!"
          subTitle={<span>Please check {email} to verify your account</span>}
        />
      </Modal>
      <Skeleton
        loading={!isCSuccess || !isISuccess}
        paragraph={{ rows: 15, width: 100 }}
      >
        {" "}
        <Form
          onFinish={handleSignUp}
          form={form}
          size="middle"
          initialValues={{
            phone: { code: 160 }, //nigerian id -> phone code as default
          }}
        >
          <Form.Item
            name="fullName"
            rules={textInputValidationRules}
            hasFeedback
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon pr-1" />}
              placeholder="Full Name"
              className="rounded border-slate-400"
              style={{ padding: "6px 5px" }}
            />
          </Form.Item>
          <Form.Item
            name="organization"
            rules={textInputValidationRules}
            hasFeedback
          >
            <Input
              prefix={
                <ReconciliationOutlined className="site-form-item-icon pr-1" />
              }
              placeholder="Organization Name"
              className="rounded border-slate-400"
              style={{ padding: "6px 5px" }}
            />
          </Form.Item>
          <Form.Item name="industry" rules={generalValidationRules}>
            <Select
              showSearch
              allowClear
              optionLabelProp="label"
              className="authSelectTag"
              placeholder={
                <div className="flex justify-start items-center">
                  <BankOutlined className="site-form-item-icon pr-1 text-black" />
                  &nbsp; Industry
                </div>
              }
              style={{ width: "100%" }}
            >
              {isISuccess &&
                industries.map(({ name, id }) => (
                  <Select.Option
                    key={id}
                    value={id}
                    className="py-2"
                    label={
                      <div className="flex justify-start items-center">
                        <BankOutlined className="site-form-item-icon pr-1 text-black" />
                        &nbsp;
                        {name}
                      </div>
                    }
                  >
                    {name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            rules={emailValidationRules as Rule[]}
            hasFeedback
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon pr-1" />}
              placeholder="Business Email"
              className="rounded border-slate-400"
              style={{ padding: "6px 5px" }}
              autoComplete="username"
            />
          </Form.Item>


          <Form.Item name="phone" hasFeedback>
            <Input.Group compact>
              <Form.Item
                noStyle
                rules={generalValidationRules}
                name={["phone", "code"]}
              >
                {isCSuccess && (
                  <Select
                    // showSearch
                    // allowClear
                    // optionLabelProp="label"
                    className="rounded border-slate-400"
                    style={{ width: "25%" }}
                    options={countries.map((item) => ({
                      label: `+${item.code}`,
                      value: item.id,
                    }))}
                  />
                )}
              </Form.Item>
              <Form.Item
                noStyle
                rules={textInputValidationRules}
                name={["phone", "number"]}
              >
                <Input
                  style={{ width: "75%" }}
                  placeholder="Business Phone"
                  className="rounded border-slate-400 text-left"
                  autoComplete="phone"
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>


          
          <Form.Item
            name="password"
            rules={passwordValidationRules}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon pr-1" />}
              placeholder="Password"
              className="rounded border-slate-400"
              style={{ padding: "6px 5px" }}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="cPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Field is required",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered does not match."
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon pr-1" />}
              placeholder="Confirm Password"
              className="rounded border-slate-400"
              style={{ padding: "6px 5px" }}
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item>
            <button
              className="authBtn w-full mt-4 mb-3"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <BeatLoader color="#fff" /> : "Sign Up"}
            </button>
          </Form.Item>
        </Form>
      </Skeleton>
    </>
  );
};

export default CompanyRegistrationForm;
