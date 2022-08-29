import React from "react";

const TableComparison = () => {
  return (
    <div>
      <table className="payroll-table mt-10">
        <thead>
          <tr>
            <th></th>
            <th>June 2022</th>
            <th>May 2022</th>
            <th>Variant(Different)</th>
          </tr>
        </thead>
        <tbody>
          {[
            "Number of Employees",
            "Gross Pay",
            "Employees Tax",
            "Employer’s Tax",
            "Pension",
            "Total Deductions",
            "Total Allowances",
          ]}
          {/* <tr>
            <td>Number of Employees</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
};

export default TableComparison;
