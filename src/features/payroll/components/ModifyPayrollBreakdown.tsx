import { Modal, Switch } from "antd";
import Themes from "components/Themes";
import React from "react";
import { IModalProps } from "types";

const ModifyPayrollBreakdown: React.FC<IModalProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 5 }}
      width={`65%`}
      title={
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-lg">Modify Employee Payroll</h5>
        </div>
      }
    >
      <Themes>
        <div className="scrollBar overflow-auto">
          <div className="text-sm mt-5 font-medium">
            <div className="bg-mainBg flex items-center justify-between px-5 py-2">
              <span> Employee Name</span>
              <span>Ruth Godwin</span>
            </div>
            <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
              <span> Employee ID</span>
              <span>HC54321</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 my-6">
              <div>
                <table className="payroll-table view">
                  <thead>
                    <tr>
                      <th>Earnings</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array(4)
                      .fill({ label: "Meal Allowance", value: 2000 })
                      .map((item, i) => (
                        <tr key={i}>
                          <td>{item.label}</td>
                          <td>N{item.value}</td>
                          <td>
                            <Switch
                              unCheckedChildren={"inactive"}
                              size="small"
                              checkedChildren={`active`}
                            />
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td>Sub Total</td>
                      <td colSpan={2}>N0.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <table className="payroll-table view">
                <thead>
                  <tr>
                    <th>Deductions</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>NSSF-employees deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>NSSF-employer deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>NHIF-employees deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>NHIF-employers deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SDL-employees deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SDL-employers deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>WCF-employees deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>WCF-employers deduction</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Employees Tax</td>
                    <td>N0.00</td>
                    <td>
                      <Switch
                        unCheckedChildren={"inactive"}
                        size="small"
                        checkedChildren={`active`}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>Sub Total</td>
                    <td colSpan={2}>N0.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-mainBg flex items-center justify-between px-5 py-2">
              <span> Total</span>
              <span>N0.00</span>
            </div>
            <div className="bg-mainBg flex items-center justify-between px-5 py-2 mt-3">
              <span>Account Number</span>
              <span>xxxxxxxxxx</span>
            </div>

            {/* <div className="flex items-center justify-around mt-6">
              <button className="neutralButton">Roll back</button>
              <button className="button">Approve</button>
            </div> */}
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default ModifyPayrollBreakdown;
