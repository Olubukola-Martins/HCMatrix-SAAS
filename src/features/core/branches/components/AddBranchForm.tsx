import { Form, Input, Spin, Collapse } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { BeatLoader } from "react-spinners";
import { FormCountryInput } from "components/generalFormInputs/FormCountryInput";
import { FormLGAInput } from "components/generalFormInputs/FormLGAInput";
import { FormStateInput } from "components/generalFormInputs/FormStateInput";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { openNotification } from "utils/notifications";
import { useCreateBranch } from "../hooks/useCreateBranch";
import { useApiAuth } from "hooks/useApiAuth";
import { QUERY_KEY_FOR_BRANCHES } from "../hooks/useFetchBranches";

const { Panel } = Collapse;
const panelStyle = {
  // marginBottom: 24,
  // background: "#aaa111",
  borderRadius: "5px",
  border: "none",
};
const AddBranchForm = ({ handleClose }: { handleClose: Function }) => {
  const queryClient = useQueryClient();
  const { companyId, token } = useApiAuth();
  const [form] = Form.useForm();
  const [stateId, setStateId] = useState<number>();
  const [countryId, setCountryId] = useState<number>();
  const { dispatch } = useContext(GlobalContext);
  const { mutate, isLoading } = useCreateBranch();

  const handleSubmit = (data: any) => {
    if (companyId) {
      // return;
      openNotification({
        state: "info",
        title: "Wait a second ...",
        description: <Spin />,
      });
      mutate(
        {
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
              queryKey: [QUERY_KEY_FOR_BRANCHES],
            });
          },
        }
      );
    }
  };
  return (
    <>
      <Form
        requiredMark={false}
        form={form}
        onFinish={handleSubmit}
        size="small"
        labelCol={{ span: 24 }}
      >
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          accordion
        >
          <Panel
            header={<span className="font-semibold">Branch Information</span>}
            key="1"
            style={panelStyle}
          >
            <div>
              <Form.Item
                name="name"
                label="Branch Name"
                rules={textInputValidationRules}
                className="col-span-2"
              >
                <Input placeholder="Branch" />
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
          </Panel>
          <Panel
            header={<span className="font-semibold">Address Information</span>}
            key="2"
            style={panelStyle}
          >
            <div className="grid grid-cols-3 gap-x-4">
              {/* address */}

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
          </Panel>
        </Collapse>
        <div className="mt-4">
          <button className="button" type="submit">
            {isLoading ? <BeatLoader color="#fff" /> : "Submit"}
          </button>
        </div>
      </Form>
    </>
  );
};

export default AddBranchForm;
