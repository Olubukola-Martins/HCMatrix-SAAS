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
                className={
                  disable
                    ? `ri-pencil-line cursor-pointer hover:text-caramel text-xl`
                    : `ri-lock-line cursor-pointer hover:text-caramel text-xl`
                }
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5"
          >
            <Form.Item name="name" label="Department Name">
              <Input className="generalInputStyle" disabled={disable} />
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
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item name="departmentHead" label="Department Head">
              <Input className="generalInputStyle" disabled={disable} />
            </Form.Item>
            <Form.Item name="Employees" label="Number of Employee">
              <Input className="generalInputStyle" defaultValue={10} disabled />
            </Form.Item>

            {!disable && (
              <div className="flex items-center">
                <button className="button">Save changes</button>
              </div>
            )}
          </Form>

          {/* <div className="mt-4">
            <form className="text-accent mt-6 grid grid-cols-2 gap-x-24 gap-y-5 w-4/5">
              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Department Name</label>
                  <input
                    type="text"
                    placeholder="eg. UI/UX Designer"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>

              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Mail Alias</label>
                  <input
                    type="text"
                    placeholder="eg. johndoe@gmail.com"
                    className="w-full bg-white rounded-md p-2 border border-gray-400 focus:outline-none "
                  />
                </div>
              </div>

              <div>
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Department Lead</label>
                  <select
                    placeholder="Select"
                    className="w-full bg-white text-black rounded-md p-2 border border-gray-400 focus:outline-none "
                  >
                    <option className="bg-card">Emeka</option>
                    <option className="bg-card">Chinyere</option>
                  </select>
                </div>
              </div>
            </form>
          </div> */}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DepartmentDetail;
