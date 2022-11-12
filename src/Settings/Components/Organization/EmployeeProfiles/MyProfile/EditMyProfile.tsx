import { UploadOutlined } from "@mui/icons-material";
import { Button, Drawer, Form, Input, Upload } from "antd";
import { useState } from "react";
import { IDrawerProps } from "../../../../../AppTypes/Component";

export const EditMyProfile = ({ open, handleClose }: IDrawerProps) => {
  const initialValues = {
    firstName: "",
    middleName: "",
    lastName: "",
  };

  return (
    <Drawer
      title="Edit Profile"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      className="drawerBg"
      width="50%"
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
            </div>
          </div>
          <div className="col-span-2 gap-x-3 grid grid-cols-1 lg:grid-cols-2">
            <Form.Item name="firstName" label="First Name">
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item name="middleName" label="Middle Name">
              <Input className="generalInputStyle" />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input className="generalInputStyle" />
            </Form.Item>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4"></div>
      </Form>
    </Drawer>
  );
};
