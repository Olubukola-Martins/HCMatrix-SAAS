import { Collapse, Form, Input, Spin } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";

import { useContext, useEffect, useState } from "react";

import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";

import { useApiAuth } from "hooks/useApiAuth";
import {
  QUERY_KEY_FOR_SINGLE_BRANCH,
  useFetchSingleBranch,
} from "../hooks/useFetchSingleBranch";
import { FormCountryInput } from "components/generalFormInputs/FormCountryInput";
import { FormLGAInput } from "components/generalFormInputs/FormLGAInput";
import { FormStateInput } from "components/generalFormInputs/FormStateInput";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useUpdateBranch } from "../hooks/useUpdateBranch";

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
  const { companyId, token } = useApiAuth();
  const { dispatch } = useContext(GlobalContext);
  const [form] = Form.useForm();
  const [stateId, setStateId] = useState<number>();
  const [countryId, setCountryId] = useState<number>();

  const { data: branch } = useFetchSingleBranch({
    companyId,
    token,
    branchId: id,
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
    if (companyId) {
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
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
        },
        {
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
              queryKey: [QUERY_KEY_FOR_SINGLE_BRANCH, id],
            });
          },
        }
      );
    }
  };
  return (
    <>
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
            header={<span className="font-semibold">Branch Information</span>}
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
            header={<span className="font-semibold">Address Information</span>}
            key="2"
            style={panelStyle}
          >
            <div className="grid grid-cols-3 gap-x-4">
              <FormCountryInput
                Form={Form}
                control={{ label: "Country", name: "countryId" }}
                handleSelect={(val) => setCountryId(val)}
              />
              {countryId && (
                <FormStateInput
                  countryId={countryId}
                  Form={Form}
                  handleSelect={(val) => setStateId(val)}
                />
              )}

              {stateId && <FormLGAInput stateId={stateId} Form={Form} />}
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
    </>
  );
};

export default EditBranchForm;
