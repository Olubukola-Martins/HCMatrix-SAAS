import React from "react";
import { motion } from "framer-motion";

export const PayGradesTableView: React.FC<any> = ({ grades }) => {
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
      {grades.length > 0 ? (
        <table className="employee-profile-table w-full text-left text-accent">
          <thead>
            <tr className="border-b border-accent">
              <th className="p-3 text-left">
                <div className="flex gap-4 items-center">
                  <input type={"checkbox"} className="" />
                  <span>Level</span>
                </div>
              </th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Monthly Gross</th>

              {/* <th className="p-3 text-left">Leave Length</th> */}
              {/* <th className="opacity-0 p-3">Actions</th> */}
            </tr>
          </thead>

          <tbody>
            {grades.map((item: any) => (
              <tr key={item.id} className="border-b border-accent">
                <td className="p-3 text-sm capitalize text-left">
                  <div className="flex gap-4 items-center">
                    <input type={"checkbox"} className="" />
                    <span>{item.level}</span>
                  </div>
                </td>
                <td className="p-3 text-sm text-left">{item.category}</td>
                <td className="p-3 text-sm text-left">Department 1</td>

                <td className="p-3 text-sm capitalize text-left">
                  {item.gross}
                </td>

                {/* <td className="p-3 text-lg">
                  <i className="ri-pencil-fill cursor-pointer hover:text-caramel"></i>{" "}
                  <i className="ri-delete-bin-line pl-2 cursor-pointer hover:text-caramel"></i>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="h-72 flex items-center text-center  justify-center text-lg">
          <p>No grades found</p>
        </div>
      )}
    </motion.div>
  );
};
