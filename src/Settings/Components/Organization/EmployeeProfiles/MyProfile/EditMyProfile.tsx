import { Drawer, Form, Input, Select, Upload } from "antd";
import { IDrawerProps } from "../../../../../AppTypes/Component";

export const EditMyProfile = ({ open, handleClose }: IDrawerProps) => {
  const initialValues = {
    image: "",
    firstName: "",
    lastName: "",
    employeeId: "",
    designation: "",
    department: "",
    role: "",
    email: "",
    phone: "",
    address: "",
  };

  return (
    <Drawer
      title="Edit Profile"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
      width="45%"
    >
      <Form
        layout="vertical"
        initialValues={initialValues}
        onFinish={(val) => console.log(val)}
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="flex justify-center">
            <div>
              <img
                src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
                alt="user"
                className="h-28"
              />
              <Upload>
                <button className="flex items-center gap-2 border border-slate-400 rounded-md px-3 py-1 mt-4">
                  <i className="ri-camera-line text-lg"></i>
                  <span>Edit Image</span>
                </button>
              </Upload>
              <Form.Item name="image" noStyle>
                <Input type="hidden" />
              </Form.Item>
            </div>
          </div>
          <div className="col-span-2 gap-x-3 grid grid-cols-1 lg:grid-cols-2">
            <Form.Item name="firstName" label="First Name">
              <Input className="generalInputStyle" placeholder="First Name" />
            </Form.Item>

            <Form.Item name="lastName" label="Last Name">
              <Input className="generalInputStyle" placeholder="Last Name" />
            </Form.Item>
            <Form.Item name="employeeId" label="Employee ID">
              <Input className="generalInputStyle" placeholder="Employee ID" />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mt-2">
          <Form.Item name="designation" label="Designation">
            <Input className="generalInputStyle" placeholder="Designation" />
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Input className="generalInputStyle" placeholder="Department" />
          </Form.Item>
          <Form.Item name="role" label="Role">
            <Select
              className="SelectTag w-full"
              size="large"
              placeholder="Select"
            >
              <Select.Option value="Hiring manager 1">
                Hiring manager 1
              </Select.Option>
              <Select.Option value="Hiring manager 2">
                Hiring manager 2
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Work/Official Email"
            rules={[{ type: "email", message: "Please enter a valid email" }]}
          >
            <Input className="generalInputStyle" placeholder="Enter Email" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input className="generalInputStyle" placeholder="Phone Number" />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input className="generalInputStyle" placeholder="Enter Address" />
          </Form.Item>
        </div>
        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={() => handleClose()}
            className="transparentButton"
          >
            Cancel
          </button>
          <button className="button">Submit</button>
        </div>
      </Form>
    </Drawer>
  );
};
