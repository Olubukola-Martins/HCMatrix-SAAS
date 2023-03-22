import { Collapse, Form, Input, Select, Skeleton, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import { IUpdateBranchProps } from "ApiRequesHelpers/Utility/branches";
import {
  useFetchSingleBranch,
  useUpdateBranch,
} from "APIRQHooks/Utility/branchHooks";
import {
  useFetchCountries,
  useFetchStates,
  useFetchLgas,
} from "APIRQHooks/Utility/countryHooks";
import React, { useContext, useEffect, useState } from "react";
import { useAuthUser } from "react-auth-kit";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

import { IAuthDets } from "../../../../AppTypes/Auth";

import {
  EGlobalOps,
  GlobalContext,
} from "../../../../Contexts/GlobalContextProvider";
import {
  textInputValidationRules,
  generalValidationRules,
} from "../../../../FormHelpers/validation";
import { openNotification } from "../../../../NotificationHelpers";

const { Option } = Select;

const panelStyle = {
  // marginBottom: 24,
  // background: "#aaa111",
  borderRadius: "5px",
  border: "none",
};

const EditBranchForm = ({
  handleClose,
  id,
  disabled,
}: {
  handleClose: Function;
  id: number;
  disabled: boolean;
}) => {
  const queryClient = useQueryClient();
  const auth = useAuthUser();

  const authDetails = auth() as unknown as IAuthDets;

  const token = authDetails.userToken;
  const globalCtx = useContext(GlobalContext);
  const { state: globalState, dispatch } = globalCtx;
  const companyId = globalState.currentCompany?.id as unknown as string;

  const [form] = Form.useForm();
  const [stateId, setStateId] = useState(0);
  const [countryId, setCountryId] = useState(0);
  const { data: branch } = useFetchSingleBranch({
    companyId,
    token,
    branchId: id,
  });
  const { data: countries, isSuccess, isFetching } = useFetchCountries();
  const { data: states, isSuccess: isStateSuccess } = useFetchStates({
    countryId: countryId as unknown as number,
  });
  const { data: lga, isSuccess: lgaSuccess } = useFetchLgas({
    stateId: stateId as unknown as number,
  });
  useEffect(() => {
    if (branch) {
      form.setFieldsValue({
        name: branch.name,
        description: branch.description,
        timezone: branch.address.timezone,
        countryId: branch.address.countryId,
        stateId: branch.address.stateId,

        lgaId: branch.address.lgaId,
        streetAddress: branch.address.streetAddress,
      });
      // this should be done after form, so it doesn't block form population => hint
      // or else they will be funny behavior
      setCountryId(() => branch.address.countryId);
      setStateId(() => branch.address.stateId);
    }
  }, [branch, form]);
  const { mutate, isLoading } = useUpdateBranch();

  const handleSubmit = (data: any) => {
    console.log("DATAAAAAA", data);
    if (companyId) {
      const props: IUpdateBranchProps = {
        id,
        companyId,
        name: data.name,
        description: data.description,
        address: {
          streetAddress: data.streetAddress,
          countryId: data.countryId,
          stateId: data.stateId,
          lgaId: data.lgaId,
          timezone: data.timezone,
        },
        token,
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
          const result = res.data.data;

          openNotification({
            state: "success",

            title: "Success",
            description: res.data.message,
            // duration: 0.4,
          });

          form.resetFields();
          handleClose();
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });

          queryClient.invalidateQueries({
            queryKey: ["branches"],
          });
          queryClient.invalidateQueries({
            queryKey: ["single-branch", id],
          });
        },
      });
    }
  };
  return (
    <>
      <Skeleton loading={!isSuccess || isFetching} active>
        {isSuccess && (
          <Form
            layout="vertical"
            requiredMark={false}
            form={form}
            onFinish={handleSubmit}
            size="small"
            disabled={disabled}
          >
            <Collapse
              bordered={false}
              defaultActiveKey={["1", "2"]} //so that the items in both will be in the form => consider upgrading to antd
              expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
              )}
              // this cannot be an accordian , will block form
              // consider upgrading antd
            >
              <Collapse.Panel
                header={
                  <span className="font-semibold">Branch Information</span>
                }
                key="1"
                style={panelStyle}
              >
                <div>
                  <Form.Item
                    name="name"
                    label="Branch Name"
                    rules={textInputValidationRules}
                  >
                    <Input placeholder="Branch name" />
                  </Form.Item>

                  <Form.Item
                    name="description"
                    label="Description"
                    rules={textInputValidationRules}
                    className="col-span-2"
                  >
                    <Input.TextArea />
                  </Form.Item>
                </div>
              </Collapse.Panel>
              {/* address */}
              <Collapse.Panel
                header={
                  <span className="font-semibold">Address Information</span>
                }
                key="2"
                style={panelStyle}
              >
                <div className="grid grid-cols-3 gap-x-4">
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
                      {isStateSuccess &&
                        states?.map((data) => (
                          <Option
                            key={data.id}
                            value={data.id}
                            label={data.name}
                          >
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
                          <Option
                            key={data.id}
                            value={data.id}
                            label={data.name}
                          >
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
                </div>
              </Collapse.Panel>
            </Collapse>

            {!disabled && (
              <div className="mt-4">
                <button className="button" type="submit">
                  {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
                </button>
              </div>
            )}
          </Form>
        )}
      </Skeleton>
    </>
  );
};

export default EditBranchForm;
