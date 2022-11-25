import { Form, Input, message, Tooltip } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../../Layout/DashboardLayout";

const DepartmentDetail = () => {
  const [disable, setDisable] = useState(true);
  const enableEdit = () => {
    setDisable(!disable);
    message.success(
      disable ? "Editing enabled Successfully" : "Editing disabled successfully"
    );
  };

  const initialValues = {
    name: "App dev",
    email: "dev@snapnetsolutions.com",
    Employees: "10",
    departmentHead: "Basil Ikpe",
  };
  return (
    <DashboardLayout>
      <div className="Container  mt-3 h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/departments">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-sm">Department</h5>
          </div>
          <div>
            <Tooltip title={disable ? "Enable editing" : "Disable editing"}>
              <i
                className="ri-pencil-line cursor-pointer hover:text-caramel text-xl"
                onClick={enableEdit}
              ></i>
            </Tooltip>
          </div>
        </div>

        <div className="bg-card mt-5 pt-4 pb-10 px-4 rounded-md">
          <h3 className="text-accent font-bold text-lg mb-4">
            Department details
          </h3>
          <Form
            layout="vertical"
            initialValues={initialValues}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5"
            disabled={disable}
          >
            <Form.Item name="name" label="Department Name">
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Mail Alias"
              rules={[
                {
                  type: "email",
                },
              ]}
            >
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item name="departmentHead" label="Department Head">
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item name="Employees" label="Number of Employee">
              <Input className="generalInputStyle" disabled />
            </Form.Item>

            {!disable && (
              <div className="flex items-center">
                <button className="button">Save changes</button>
              </div>
            )}
          </Form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDetail;
