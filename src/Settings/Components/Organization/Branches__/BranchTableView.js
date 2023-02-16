import React from "react";

export const BranchTableView = () => {
  return (
    <div>
      <table className="w-full text-center text-accent;">
        <thead>
          <tr className="border-b border-accent">
            <th className="p-3">Branch Name</th>
            <th className="p-3">Number of employee</th>
            <th className="p-3">Country</th>
            <th className="p-3">Mail Alias</th>
            <th className="p-3">Description</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {[1, 2, 3, 4, 5, 6, 7, 8,9].map((index) => (
            <tr key={index} className="border-b border-accent">
              <td className="p-3 text-sm">Lagos</td>
              <td className="p-3 text-sm">0</td>
              <td className="p-3 text-sm">Nigeria</td>
              <td className="p-3 text-sm">isaac@snapnet.com</td>
              <td className="p-3 text-sm">
                Lorem ipsum dolor sit amet consectetur...
              </td>
              <td className="p-3 text-lg">
                <i className="ri-pencil-fill cursor-pointer hover:text-caramel"></i>{" "}
                <i className="ri-delete-bin-line pl-2 cursor-pointer hover:text-caramel"></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
