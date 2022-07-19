import React from "react";

const MedicalHistory = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-10 gap-x-8">
      {/* Current of Medical Condition */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">
            Current of Medical Condition
          </span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of medical condition" />
            </div>
            <div className="whiteBg_form mt-4">
              <input
                type="text"
                placeholder="Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Headache</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ear infection</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pest Medical Condition */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Pest Medical Condition</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of medical condition" />
            </div>
            <div className="whiteBg_form mt-4">
              <input
                type="text"
                placeholder="Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Headache</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ear infection</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Surgeries/Hospitalization */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Surgeries/Hospitalization</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Surgeries/Hospitalization" />
            </div>
            <div className="whiteBg_form mt-4">
              <input
                type="text"
                placeholder="Date"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Headache</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Ear infection</td>
                  <td>19-07-200</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Family History */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Family History</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of Medical Condition" />
            </div>
            <div className="whiteBg_form mt-4">
              <select name="" id="">
                <option value="">Member</option>
              </select>
            </div>
            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th>Date of Onset</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Migraine</td>
                  <td>Brother</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Blood pressure</td>
                  <td>Father</td>
                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Medication */}
      <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Medication</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of Medication" />
            </div>

            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Migraine</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Blood pressure</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
              {/* Allergy */}
              <div>
        <div className="flex items-center justify-between mb-1 px-1">
          <span className="text-sm font-medium">Allergy</span>
          <i className="ri-information-line font-medium cursor-pointer"></i>
        </div>
        <div className="border border-gray-300 rounded-md">
          <form className="p-5">
            <div className="whiteBg_form">
              <input type="text" placeholder="Name of Medication" />
            </div>

            <div className="flex justify-end mt-5">
              <button className="button">Submit</button>
            </div>
          </form>
          <div className="medicalTableWrap">
            <table>
              <thead>
                <tr>
                  <th>Condition</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="mt-10">
                <tr>
                  <td>Migraine</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
                <tr>
                  <td>Blood pressure</td>

                  <td>
                    <i className="ri-delete-bin-fill cursor-pointer hover:text-caramel"></i>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
