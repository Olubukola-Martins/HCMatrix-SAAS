import React from "react";
import { motion } from "framer-motion";

export const GroupsTableView = ({ groups }) => {
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
      <table className="w-full text-left text-accent;">
        <thead>
          <tr className="border-b border-accent">
            <th className="p-3">
              <div className="flex gap-4 items-center">
                <input type={"checkbox"} className="invisible" />
                <span>Group Name</span>
              </div>
            </th>
            <th className="p-3">Group Email ID</th>
            <th className="p-3">Description</th>
            <th className="opacity-0 p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {groups.map((item) => (
            <tr key={item.id} className="border-b border-accent">
              <td className="p-3 text-sm capitalize">
                <div className="flex gap-4 items-center">
                  <input type={"checkbox"} />
                  <span>{item.name}</span>
                </div>
              </td>
              <td className="p-3 text-sm">{item.email}</td>
              <td className="p-3 text-sm">{item.description}</td>

              <td className="p-3 text-lg">
                <i className="ri-pencil-fill cursor-pointer hover:text-caramel"></i>{" "}
                <i className="ri-delete-bin-line pl-2 cursor-pointer hover:text-caramel"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};
