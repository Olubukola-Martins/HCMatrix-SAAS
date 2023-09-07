import { Switch } from "antd";
import React, { useState } from "react";
import { boxStyle, boxTitle, inputStyle } from "styles/reused";

const MaxloanPercentSetup = () => {
  const [loanPec, setLoanPec] = useState(false);

  return (
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tempor magna id
        fames cursus luctus scel
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
              <label htmlFor="1" className="hover:text-caramel cursor-pointer">
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
              <label htmlFor="2" className="hover:text-caramel cursor-pointer">
                If employees should apply for loans that exceed the set loan
                percentage, employees should fill guarantor's forms
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
  );
};

export default MaxloanPercentSetup;
