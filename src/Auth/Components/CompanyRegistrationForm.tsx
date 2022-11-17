import { Form, Input, Modal, Progress, Result, Select } from "antd";
import React, { useRef, useState } from "react";
import {
  generalValidationRules,
  textInputValidationRules,
} from "../../FormHelpers/validation";
import {
  LockOutlined,
  ReconciliationOutlined,
  UserOutlined,
  BankOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useMutation, useQuery } from "react-query";
import {
  createCompany,
  getIndustries,
  ICreateCompProps,
} from "../../ApiRequesHelpers/Utility";
import { openNotification } from "../../NotificationHelpers";
import { TIndustry } from "../../AppTypes/DataEntitities";
import { LoadingOutlined } from "@ant-design/icons";

const CompanyRegistrationForm = () => {
  const [showM, setShowM] = useState(false);
  const [email, setEmail] = useState("");
  const [form] = Form.useForm();
  const {
    data: industries,
    isError: isIndustryErr,
    isFetching: isIFetchingErr,
    isSuccess: isISuccess,
  } = useQuery("industries", () => getIndustries(), {
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    onError: (err: any) => {
      // show notification
      openNotification({
        state: "error",
        title: "Error Occured",
        description:
          err?.response.data.message ?? err?.response.data.error.message,
      });
    },
    onSuccess: (data: any) => {
      openNotification({
        state: "success",

        title: "Success",
        description: "Industries fetched successfully",
        // duration: 0.4,
      });
    },
    select: (res: any) => {
      const result = res.data.data;
      console.log("result", result);

      const data: TIndustry[] = result.map(
        (item: any): TIndustry => ({
          id: item.id,
          name: item.name,
        })
      );

      return data;
    },
  });
  const { mutate } = useMutation(createCompany);

  const handleSignUp = (data: any) => {
    console.log(data, "pop");
    const props: ICreateCompProps = {
      name: data.organization,
      email: data.email,
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
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res) => {
        const result = res.data.data;
        console.log("company", result);

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
      <Modal footer={null} visible={showM} onCancel={() => setShowM(false)}>
        <Result
          status="success"
          title="Company created successfully!"
          subTitle={
            <span>
              Please check your{" "}
              <a
                href={`mailto:${email}`}
                target={"_blank"}
                className="text-caramel"
              >
                email
              </a>{" "}
              to verify your account
            </span>
          }
          // extra={[
          //   <Button type="primary" key="console">
          //     Go Console
          //   </Button>,
          //   <Button key="buy">Buy Again</Button>,
          // ]}
        />
      </Modal>
      <Form onFinish={handleSignUp} form={form}>
        <Form.Item name="fullName" rules={textInputValidationRules} hasFeedback>
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
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            { type: "email", message: "Invalid Email Address" },
          ]}
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Field is required",
            },
            {
              min: 8,
              message: "password must be at least 6 characters",
            },
            // {
            //   validator: (_, value) =>
            //     value && value.includes("A")
            //       ? Promise.resolve()
            //       : Promise.reject("Password does not match criteria."),
            // },
          ]}
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
          <button className="authBtn w-full mt-4 mb-3" type="submit">
            Sign Up
          </button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CompanyRegistrationForm;
