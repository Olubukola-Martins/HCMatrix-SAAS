import { Form, Input, Popconfirm, Skeleton, Switch } from "antd";
import { RecruitmentSettingsIntro } from "../../components/RecruitmentSettingsIntro";
import { appRoutes } from "config/router/paths";
import { textInputValidationRules } from "utils/formHelpers/validation";
import { AppButton } from "components/button/AppButton";
import "../../assets/style.css";
import {
  QUERY_KEY_FOR_CANDIDATE_SOURCE,
  useGetCandidateSource,
} from "../hooks/useGetCandidateSource";
import { usePatchRecruitmentItem } from "../../hooks/usePatchRecruitmentSettings";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useDeleteRecruitmentItem } from "features/recruitment/hooks/useDeleteRecruitmentItem";

const CandidateSource = () => {
  const { data, isLoading } = useGetCandidateSource();
  const [form] = Form.useForm();

  const { patchData } = usePatchRecruitmentItem({
    patchEndpointUrl: "application-sources",
    queryKey: QUERY_KEY_FOR_CANDIDATE_SOURCE,
  });
  const { removeData } = useDeleteRecruitmentItem({
    deleteEndpointUrl: "",
    queryKey: QUERY_KEY_FOR_CANDIDATE_SOURCE,
  });

  // Patch request
  const handleSwitchValue = (checked: boolean, itemId: number) => {
    patchData(itemId, checked);
  };

  // Post request
  const handleSubmit = (values: any) => {
    if (!values.newSource) {
      return;
    }
    const newSourceName = values.newSource.map((item: any) => item.sourceName);
    for (let i = 0; i < newSourceName.length; i++) {
      const name = newSourceName[i];
    }
  };

  const handleAddField = () => {
    const newSource = form.getFieldValue("newSource") || [];
    const initialSource = { sourceName: "", allowSource: true };
    form.setFieldsValue({ newSource: [...newSource, initialSource] });
  };

  const handleRemoveField = (index: number) => {
    const newSource = form.getFieldValue("newSource") || [];
    form.setFieldsValue({
      newSource: newSource.filter((_: any, i: number) => i !== index),
    });
  };

  return (
    <>
      <RecruitmentSettingsIntro
        title="Candidate Source"
        description={"Integrate more platform to the system."}
        nextLink={appRoutes.recruitmentEmailTemplate}
      />

      <div className="Container mt-5">
        <div className="bg-card rounded md:p-5 p-3">
          <h2 className="pb-5 font-medium text-base">Sources</h2>
          <div className="bg-mainBg py-4 px-4 rounded">
            <Skeleton active loading={isLoading}>
              <Form form={form} layout="vertical" onFinish={handleSubmit}>
                {data?.map((item) => (
                  <div className=" recruitmentSettingsForm ">
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="flex gap-5 items-center justify-end">
                      <Form.Item
                        valuePropName="checked"
                        name={item.label}
                        className="flex justify-end items-end"
                        noStyle
                      >
                        <Switch
                          defaultChecked={item.isActive}
                          onChange={(checked) => {
                            handleSwitchValue(checked, item.id);
                          }}
                          disabled={item.label === "direct"}
                        />
                      </Form.Item>
                      <Popconfirm
                        title={`Are you sure to delete ${item.name} ?`}
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => removeData(item.id)}
                      >
                        <i
                          className={
                            !item.isDefault
                              ? "ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                              : "ri-delete-bin-line text-xl invisible"
                          }
                        ></i>
                      </Popconfirm>
                    </div>
                  </div>
                ))}

                {/* API URL to add new sources is not yet available */}
                {/* <div>
                  <h2 className="pb-5 font-medium text-base">Source name</h2>
                  <Form.List name="newSource">
                    {(fields) => (
                      <>
                        {fields.map((field, index) => (
                          <div key={field.key} className="grid grid-cols-2 ">
                            <Form.Item
                              {...field}
                              name={[field.name, "sourceName"]}
                              label="Name"
                              rules={textInputValidationRules}
                            >
                              <Input placeholder="Enter source name" />
                            </Form.Item>
                            <div className="flex gap-5 items-center justify-end">
                              <Form.Item
                                {...field}
                                name={[field.name, "allowSource"]}
                                noStyle
                                valuePropName="checked"
                              >
                                <Switch />
                              </Form.Item>
                              <i
                                className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
                                onClick={() => handleRemoveField(index)}
                              ></i>
                            </div>
                          </div>
                        ))}

                        <AppButton
                          variant="transparent"
                          label="+ Add sources"
                          handleClick={() => handleAddField()}
                        />
                      </>
                    )}
                  </Form.List>
                </div> 
                <div className="flex justify-end items-center mt-5 gap-4">
                  <button
                    className="text-base font-medium hover:text-caramel"
                    type="reset"
                  >
                    Cancel
                  </button>
                  <AppButton type="submit" label="Add" />
                </div>*/}
              </Form>
            </Skeleton>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateSource;
