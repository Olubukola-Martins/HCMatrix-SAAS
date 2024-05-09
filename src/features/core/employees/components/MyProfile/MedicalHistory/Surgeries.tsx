import { useState } from "react";
import { AddSurgery } from "./AddSurgery";

export const Surgeries = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div>
      <AddSurgery open={openModal} handleClose={() => setOpenModal(false)} />
      <div className="flex justify-between items-center">
        <h2 className="text-base text-accent">Surgeries/Hospitalization</h2>
        <button className="button" onClick={() => setOpenModal(true)}>
          Add
        </button>
      </div>

      <div className="p-1 md:p-4 bg-gray-200 rounded mt-3">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Date of Onset</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((data, i) => (
              <tr key={i}>
                <td className="p-1">Headache</td>
                <td>19-07-2022</td>
                <td>
                  <i className="ri-delete-bin-5-line cursor-pointer hover:text-caramel"></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
