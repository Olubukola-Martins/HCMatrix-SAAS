import { Drawer, Form, Input, Select, DatePicker } from "antd";
import moment from "moment";
import { useState } from "react";
import { calcDuration } from "../../../Helpers/dateHelpers";
import Themes from "../../../Themes/Themes";
const { RangePicker } = DatePicker;
const { Option } = Select;
export const NewTask = ({ open, handleClose }) => {
  const [taskLength, setTaskLength] = useState("");
  const inputStyle =
    "w-full rounded-md py-2 px-2 text-sm bg-mainBg placeholder:text-accent";
  const errorMsg = "Field is required";

  const FormRules = [
    { required: true, message: errorMsg },
    { whitespace: true },
  ];

  const handleDateChange = (period) => {
    period[0].format("YYYY:MM:DD hh:mm:ss A");
    period[1].format("YYYY:MM:DD hh:mm:ss A");
    let dif = moment
      .duration(period[1].diff(period[0], "seconds"), "seconds")
      .add(1, "minutes");
    let difResult = calcDuration(dif);
    setTaskLength(difResult);
  };

  return (
    <Drawer
      placement="right"
      width="37%"
      bodyStyle={{
        background: "var(--card)",
      }}
      onClose={handleClose}
      open={open}
    >
      <Themes>
        <div className="bg-card h-full overflow-auto">
          <div className="border-b font-semibold  px-3 py-2 flex items-center justify-between">
            <h3 className="text-lg">New Task1</h3>
            <i
              onClick={handleClose}
              className="ri-close-line text-xl cursor-pointer"
            ></i>
          </div>
          <div className="px-3 mt-7">
            <Form
              onFinish={(values) => {
                console.log({ values });
              }}
            >
              <Form.Item name="name" rules={FormRules}>
                <Input className={inputStyle} placeholder="Task Name" />
              </Form.Item>
              <Form.Item name="description" rules={FormRules}>
                <Input.TextArea
                  className={inputStyle}
                  placeholder="Description"
                />
              </Form.Item>
              <Form.Item
                name="priority"
                rules={[{ required: true, message: errorMsg }]}
              >
                <Select className={inputStyle} placeholder="Priority">
                  <Option value="high">High</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="low">Low</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="supervisor"
                rules={[{ required: true, message: errorMsg }]}
              >
                <Select
                  showSearch
                  className={inputStyle}
                  placeholder="Task Supervisor"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  <Option value="isaac odeh">Isaac Odeh</Option>
                  <Option value="Ruth Godwin">Ruth Godwin</Option>
                  <Option value="Godswill Omenuko">Godswill Omenuko</Option>
                  <Option value="Peter Obi">Peter Obi</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="date"
                rules={[{ required: true, message: errorMsg }]}
              >
                <RangePicker
                  className={inputStyle}
                  showTime={{
                    format: "HH:mm",
                  }}
                  use12Hours
                  format="YYYY-MM-DD HH:mm"
                  placeholder={["Start date", "End date"]}
                  onChange={handleDateChange}
                />
              </Form.Item>
              <h3 className="text-sm -mt-4">{taskLength}</h3>
              <button type="submit" className="button mt-5">
                Submit
              </button>
            </Form>
          </div>
        </div>
      </Themes>
    </Drawer>
  );
};
