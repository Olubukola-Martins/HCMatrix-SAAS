import { Form, Input, Select } from "antd";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {},
};

interface IProps {
  handleClose: Function;
}

const CustomerComplaintForm = ({ handleClose }: IProps) => {
  return (
    <Form requiredMark={false} labelCol={{ span: 24 }} size="small">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
        <Form.Item name={`email`} label="Email Address">
          <Input placeholder="email address" />
        </Form.Item>
        <Form.Item name={`module`} label="Select Module">
          <Select placeholder="Select module">
            <Select.Option value="payroll">Payroll</Select.Option>
            <Select.Option value="performance">Performance</Select.Option>
            <Select.Option value="attendance">Attendance</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name={`complaintType`} label="Select Complaint">
          <Select placeholder="Select Complaint">
            <Select.Option value="systemFaliure">System failure</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="subject" label="Subject">
          <Input placeholder="e.g Not receiving OTP" />
        </Form.Item>
      </div>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={2} placeholder="Description" />
      </Form.Item>

      <Form.Item label="Attachment">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <i className="ri-upload-cloud-2-line text-3xl"></i>
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>
      </Form.Item>

      <div className="flex items-center justify-around mt-5">
        <button
          onClick={() => handleClose()}
          className="transparentButton"
          type="button"
        >
          Cancel
        </button>
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </Form>
  );
};

export default CustomerComplaintForm;
