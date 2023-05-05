import { Form, Select, Switch, Typography, InputNumber } from "antd";
import { useState } from "react";

const btwnStyle =
  "bg-card pt-4 px-3 flex flex-row w-full justify-between align-center rounded-md";
const gapStyle = "bg-card pt-4 px-3 flex  gap-16 align-center rounded-md";
const LeavePolicyForm = () => {
  const [showMaxCODays, setShowMaxCODays] = useState(false);
  const [showCasualLLen, setShowCasualLLen] = useState(false);
  return (
    <div>
      <Form labelCol={{ span: 24 }}>
        <div className="flex flex-col gap-4">
          <div className={gapStyle}>
            <Form.Item label="" className="flex-1">
              <InputNumber
                placeholder="Default Leave Length"
                className="w-full"
              />
            </Form.Item>
            <Form.Item label="" className="flex-1">
              <Select placeholder="Select Approval Workflow">
                <Select.Option key={`1`} value={`2`}>
                  Leave Workflow
                </Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>
                Does your leave include weekends?
              </Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"
                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>
                Does your leave include holidays?
              </Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"

                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div>
              {" "}
              <Typography.Text>Do you carry leave over?</Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"
                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div className="flex flex-col gap-4">
              {" "}
              <Typography.Text>
                Do you have a maximum number of days when carrying leave over?
              </Typography.Text>
              {showMaxCODays && (
                <Form.Item label="" className="flex-1 ">
                  <InputNumber
                    placeholder="What is your Maximum Leave Carryover Length"
                    className="w-full"
                  />
                </Form.Item>
              )}
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"
                  // value={showMaxCODays}
                  onChange={() => setShowMaxCODays((val) => !val)}
                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div className="flex flex-col gap-4">
              {" "}
              <Typography.Text>Do you have casual leave?</Typography.Text>
              {showCasualLLen && (
                <Form.Item label="" className="flex-1">
                  <InputNumber
                    placeholder="What is your Casual Leave Length"
                    className="w-full"
                  />
                </Form.Item>
              )}
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"
                  // value={showCasualLLen}
                  onChange={() => setShowCasualLLen((val) => !val)}
                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div className="flex flex-col gap-4">
              {" "}
              <Typography.Text>Does your probationers apply?</Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"

                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className={btwnStyle}>
            <div className="flex flex-col gap-4">
              {" "}
              <Typography.Text>
                Does your probationers use casual leave?
              </Typography.Text>
            </div>
            <div>
              <Form.Item label="" className="flex-1">
                <Switch
                  unCheckedChildren="Yes"
                  checkedChildren="No"

                  // size="small"
                />
              </Form.Item>
            </div>
          </div>
          <div className="flex justify-end">
            <Form.Item>
              <button className="button">Save</button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default LeavePolicyForm;
