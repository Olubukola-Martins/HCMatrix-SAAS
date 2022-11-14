export const CurrentMedicalCondition = () => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-base text-accent">Current Medical Condition</h2>
        <button className="button">Add</button>
      </div>

      <div className="p-4 bg-gray-200 rounded mt-3">
        <table className="w-full text-center">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Date of Onset</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2].map((data) => (
              <tr>
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
