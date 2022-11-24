import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Dropdown, Menu } from "antd";

const departments = [
  {
    id: "1",
    name: "Human Resource",
    email: "isaac@snapnet.com",
    noOfEmployees: 4,
    head: "Emeka Chukwu",
  },
  {
    id: "3",
    name: "Dev Team",
    email: "isaac@snapnet.com",
    noOfEmployees: 2,
    head: "Emeka Chukwu",
  },
  {
    id: "2",
    name: "Marketing",
    email: "isaac@snapnet.com",
    noOfEmployees: 15,
    head: "Emeka Chukwu",
  },
  {
    id: "4",
    name: "Devops",
    email: "isaac@snapnet.com",
    noOfEmployees: 15,
    head: "Emeka Chukwu",
  },
  {
    id: "12",
    name: "Graphic Design",
    email: "isaac@snapnet.com",
    noOfEmployees: 15,
    head: "Emeka Chukwu",
  },
];

export const DepartmentsGridView = () => {
  return (
    <motion.div
      className="  mt-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={0}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {departments.map((item) => (
          <div className="border px-4 py-2 rounded-lg grid grid-cols-1 gap-4 border-caramel">
            <div className="flex justify-between items-center gap-4">
              <h6 className="md:text-lg text-sm font-medium capitalize">
                {item.name}
              </h6>
              <Dropdown
                trigger={["click"]}
                overlay={
                  <Menu className="rounded">
                    <Menu.Item><Link to="/settings/departments/1">View</Link></Menu.Item>
                    <Menu.Item><Link to="/settings/departments/1">Edit</Link></Menu.Item>
                    <Menu.Item>Delete</Menu.Item>
                  </Menu>
                }
              >
                <i className="fa-solid fa-ellipsis cursor-pointer"></i>
              </Dropdown>
            </div>
            <div className="flex flex-col md:flex-row justify-between md:items-center">
              <p className="text-sm">{item.email}</p>
              <div className="rounded-full bg-caramel h-6 w-6 flex items-center justify-center text-white">
                <span className="text-sm">{item.noOfEmployees}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
