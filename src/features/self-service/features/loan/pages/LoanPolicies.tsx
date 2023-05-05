import { Switch } from "antd";
import SelfServiceSubNav from "features/self-service/components/SelfServiceSubNav";
import React, { useState } from "react";

const LoanPolicies = () => {
  const [bankDSwitch, setBankDSwitch] = useState(false);
  const [paymentPlanSwitch, setPaymentPlanSwitch] = useState(false);
  const [loanTypeSwitch, setLoanTypeSwitch] = useState(false);
  const [loanPec, setLoanPec] = useState(false);

  const boxStyle = "px-4 py-3 shadow rounded-md bg-mainBg";
  const boxTitle = "font-medium text-base pb-1";
  const inputStyle =
    "w-full rounded-md border border-gray-300 py-2 px-2 text-sm bg-mainBg focus:outline-none placeholder:text-accent";
  return (
    <>
      <SelfServiceSubNav />
      <div className="Container">
        <div className="flex items-center gap-3 font-extrabold ">
          <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
          <h5 className="text-xl md:text-2xl text-accent">Loan Policies</h5>
        </div>

        <div className="">
          <div className="bg-card px-5 py-7  rounded-md mt-7 grid grid-cols-1 md:grid-cols-2 gap-7 text-accent">
            <div className="flex flex-col gap-4">
              <div className={boxStyle}>
                <select name="" id="" className={inputStyle}>
                  <option value="">Select Work Flow Approval</option>
                </select>
              </div>

              <div className={`${boxStyle} text-sm`}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Upload company's Bank Details</h5>
                  <Switch
                    checked={bankDSwitch}
                    onChange={(value) => {
                      setBankDSwitch(value);
                    }}
                  />
                </div>
                <p className="text-sm pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tempor magna id fames cursus luctus scel
                </p>

                {bankDSwitch && (
                  <div>
                    <form className="flex flex-col gap-4 mt-5">
                      <input
                        type="text"
                        placeholder="Bank Name"
                        className={inputStyle}
                      />
                      <input
                        type="text"
                        placeholder="Account Name"
                        className={inputStyle}
                      />
                      <input
                        type="number"
                        placeholder="Account Number"
                        className={inputStyle}
                      />
                    </form>
                    <div className="flex items-center justify-between mt-6 mb-2">
                      <button
                        onClick={() => setBankDSwitch(false)}
                        className="transparentButton"
                        type="button"
                      >
                        Cancel
                      </button>
                      <button className="button" type="submit">
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className={`${boxStyle} text-sm`}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Set Payment Plan</h5>
                  <Switch
                    checked={paymentPlanSwitch}
                    onChange={(value) => {
                      setPaymentPlanSwitch(value);
                    }}
                  />
                </div>
                <p className="text-sm pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tempor magna id fames cursus luctus scel
                </p>
                {paymentPlanSwitch && (
                  <form className="mt-4">
                    <input
                      type="text"
                      placeholder="E.g 3 - 6 months"
                      className={inputStyle}
                    />
                    <span className="text-sm text-caramel font-medium text-right block pt-2 underline">
                      + Add More
                    </span>
                    <div className="flex items-center justify-between mt-6 mb-2">
                      <button
                        type="button"
                        onClick={() => setLoanTypeSwitch(false)}
                        className="transparentButton"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button">
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className={`${boxStyle} text-sm`}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Set Loan Types</h5>
                  <Switch
                    checked={loanTypeSwitch}
                    onChange={(value) => {
                      setLoanTypeSwitch(value);
                    }}
                  />
                </div>
                <p className="text-sm pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tempor magna id fames cursus luctus scel
                </p>

                {loanTypeSwitch && (
                  <form className="mt-4">
                    <input
                      type="text"
                      placeholder="E.g Car Loan"
                      className={inputStyle}
                    />
                    <span className="text-sm text-caramel font-medium text-right block pt-2 underline">
                      + Add More
                    </span>
                    <div className="flex items-center justify-between mt-6 mb-2">
                      <button
                        type="button"
                        onClick={() => setLoanTypeSwitch(false)}
                        className="transparentButton"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="button">
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>

              <div className={`${boxStyle} text-sm`}>
                <div className="flex items-center justify-between">
                  <h5 className={boxTitle}>Set Maximum Loan Percentage</h5>
                  <Switch
                    checked={loanPec}
                    onChange={(value) => {
                      setLoanPec(value);
                    }}
                  />
                </div>
                <p className="text-sm pt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tempor magna id fames cursus luctus scel
                </p>

                {loanPec && (
                  <div>
                    <form className="flex flex-col gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="Percentage"
                        className={inputStyle}
                      />

                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="loan_limit"
                          id="1"
                          className="scale-150 accent-caramel"
                        />
                        <label
                          htmlFor="1"
                          className="hover:text-caramel cursor-pointer"
                        >
                          Employees can not exceed set loan percentage
                        </label>
                      </div>
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="loan_limit"
                          id="2"
                          className="scale-150 accent-caramel"
                        />
                        <label
                          htmlFor="2"
                          className="hover:text-caramel cursor-pointer"
                        >
                          If employees should apply for loans that exceed the
                          set loan percentage, employees should fill guarantor's
                          forms
                        </label>
                      </div>
                      <div className="flex items-center justify-between mt-6 mb-2">
                        <button
                          type="button"
                          onClick={() => setLoanPec(false)}
                          className="transparentButton"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="button">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoanPolicies;
