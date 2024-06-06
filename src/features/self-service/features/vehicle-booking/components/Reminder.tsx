import React from "react";

const Reminder = () => {
  return (
    <div>
      <div>
        <h3 className="text-base font-medium">Maintenance Reminders:</h3>
        <table className="payroll-table text-accent mt-4">
          <thead>
            <tr>
              <th>Description</th>
              <th>Vehicle Name</th>
              <th>Plate No</th>
              <th>Registered</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>Oil Change</td>
                <td>Toyota Corolla</td>
                <td>xxxx</td>
                <td>DD/MM/YY</td>
                <td>DD/MM/YY</td>
                <td>
                  <button
                    style={{ color: "var(--caramel)" }}
                    className="transparentButton"
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-6">
        <h3 className="text-base font-medium">Repair Reminders:</h3>
        <table className="payroll-table text-accent mt-4">
          <thead>
            <tr>
              <th>Description</th>
              <th>Vehicle Name</th>
              <th>Plate No</th>
              <th>Registered</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>Oil Change</td>
                <td>Toyota Corolla</td>
                <td>xxxx</td>
                <td>DD/MM/YY</td>
                <td>DD/MM/YY</td>
                <td>
                  <button
                    style={{ color: "var(--caramel)" }}
                    className="transparentButton"
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h3 className="text-base font-medium">Required Documents Reminders:</h3>
        <table className="payroll-table text-accent mt-4">
          <thead>
            <tr>
              <th>Description</th>
              <th>Vehicle Name</th>
              <th>Plate No</th>
              <th>Registered</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((item) => (
              <tr key={item}>
                <td>Oil Change</td>
                <td>Toyota Corolla</td>
                <td>xxxx</td>
                <td>DD/MM/YY</td>
                <td>DD/MM/YY</td>
                <td>
                  <button
                    style={{ color: "var(--caramel)" }}
                    className="transparentButton"
                  >
                    Renew
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reminder;
