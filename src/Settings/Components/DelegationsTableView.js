import React from "react";
import { motion } from "framer-motion";

export const DelegationsTableView = ({ delegations }) => {
  return (
    <motion.div
      className="Container mt-4"
      initial={{ opacity: 0, y: 400 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      key={2}
      transition={{ ease: "easeIn" }}
      exit={{ opacity: 0, y: 400 }}
    >
      {delegations.length > 0 ? (
        <table className="w-full text-left text-accent;">
          <thead>
            <tr className="border-b border-accent">
              <th className="p-3">
                <div className="flex gap-4 items-center">
                  <input type={"checkbox"} className="invisible" />
                  <span>Delegator</span>
                </div>
              </th>
              <th className="p-3">Delegatee</th>
              <th className="p-3">Type</th>
              <th className="p-3">Date range</th>
              <th className="opacity-0 p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {delegations.map((item) => (
              <tr key={item.id} className="border-b border-accent">
                <td className="p-3 text-sm capitalize">
                  <div className="flex gap-4 items-center">
                    <input type={"checkbox"} />
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                        alt="user"
                      />
                      <div className="flex flex-col">
                        <h6 className="font-medium text-sm">
                          {item.delegator.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-sm capitalize">
                  <div className="flex gap-4 items-center">
                    <div className="flex items-center gap-2 justify-center">
                      <img
                        src="https://res.cloudinary.com/ddvaelej7/image/upload/v1656616707/samples/Ellipse_1915_maqdtn.png"
                        alt="user"
                      />
                      <div className="flex flex-col">
                        <h6 className="font-medium text-sm">
                          {item.delegatee.name}
                        </h6>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-3 text-sm capitalize">{item.type}</td>
                <td className="p-3 text-sm">{item.dateRange}</td>

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
          <p>No delegations found</p>
        </div>
      )}
    </motion.div>
  );
};
