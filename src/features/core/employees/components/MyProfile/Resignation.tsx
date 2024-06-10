import { DatePicker, Drawer, Form, Input, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { IDrawerProps } from "types";

export const Resignation = ({ open, handleClose }: IDrawerProps) => {
  const initialValues = {
    resignationLetter: "img-url",
  };
  return (
    <Drawer
      title="Submit Resignation"
      placement="left"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
    >
      <Form layout="vertical" initialValues={initialValues}>
        <Form.Item
          name="resignationDate"
          rules={[{ required: true, message: "Field is required!" }]}
          label="Resignation Date"
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="policyLastDate"
          label="Last working day according to policy"
        >
          <DatePicker
            format="YYYY/MM/DD"
            className="generalInputStyle"
            disabled
            defaultPickerValue={moment("2020-06-09T12:40:14+0000")}
          />
        </Form.Item>
        <Form.Item
          name="lastDay"
          label="Last Day of Work Requested"
          rules={[{ required: true, message: "Field is required!" }]}
        >
          <DatePicker format="YYYY/MM/DD" className="generalInputStyle" />
        </Form.Item>
        <Form.Item name="reason" label="Reason">
          <TextArea rows={3} className="generalInputStyle" />
        </Form.Item>
        <Form.Item
          name="resignationLetter"
          label="Upload Signed Resignation Letter"
          rules={[{ required: true, message: "Field is required!" }]}
        >
          <Input type="hidden" />
          <Upload>
            <button
              type="button"
              className=" bg-mainBg w-full flex items-center border rounded px-4 py-2 gap-x-16"
            >
              <span>Upload</span> <i className="ri-upload-2-line"></i>
            </button>
          </Upload>
        </Form.Item>

        <button className="button">Submit</button>
      </Form>
    </Drawer>
  );
};
