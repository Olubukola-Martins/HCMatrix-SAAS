import React from "react";
import { motion } from "framer-motion";

export const RolesTableView = ({ roles }) => {
  return (
    <motion.div
      className="  mt-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={2}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      {roles.length > 0 ? (
        <table className="employee-profile-table w-full text-left text-accent">
          <thead>
            <tr className="border-b border-accent">
              <th className="p-3 text-left">
                <div className="flex gap-4 items-center">
                  <input type={"checkbox"} className="invisible" />
                  <span>Role name</span>
                </div>
              </th>
              <th className="p-3 text-left">Last modified</th>
              <th className="p-3 text-left">Last modified by</th>

              <th className="opacity-0 p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((item) => (
              <tr key={item.id} className="border-b border-accent">
                <td className="p-3 text-sm capitalize text-left">
                  <div className="flex gap-4 items-center">
                    <input type={"checkbox"} className="" />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className="p-3 text-sm text-left">{item.updatedAt}</td>

                <td className="p-3 text-sm capitalize text-left">
                  {item.lastModifiedBy}
                </td>

                <td className="p-3 text-lg">
                  <i className="ri-pencil-fill cursor-pointer hover:text-caramel"></i>{" "}
                  <i className="ri-delete-bin-line pl-2 cursor-pointer hover:text-caramel"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-72 flex items-center text-center  justify-center text-lg">
          <p>No roles found</p>
        </div>
      )}
    </motion.div>
  );
};
