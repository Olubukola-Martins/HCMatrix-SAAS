import React from "react";
import "../../../../style/settingsStyle.css";

const EmployeeInformation = () => {
  return (
    <form>
      {/* Personal Information section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="P_Form_Group">
            <label>Expatriate</label>
            <select>
              <option value="male">No</option>
              <option value="female">Yes</option>
            </select>
          </div>
          <div className="P_Form_Group">
            <label>Payroll type</label>
            <select>
              <option value="male">Direct Salary</option>
            </select>
          </div>
          <div className="P_Form_Group">
            <label>LGA</label>
            <select>
              <option value="male">Eteosa</option>
            </select>
          </div>
          <div className="P_Form_Group">
            <label>State</label>
            <select>
              <option value="male">Lagos</option>
            </select>
          </div>
          <div className="P_Form_Group">
            <label>Company</label>
            <input type="text" placeholder="Snapnet LTD" />
          </div>
          <div className="P_Form_Group">
            <label>Branch</label>
            <select>
              <option value="male">Abuja</option>
              <option value="male">Lagos</option>
            </select>
          </div>
          <div className="P_Form_Group">
            <label>Current Role</label>
            <input type="text" placeholder="UI/UX Designer" />
          </div>
          <div className="P_Form_Group">
            <label>Grade</label>
            <select>
              <option value="male">Grade 1</option>
              <option value="male">Grade 2</option>
            </select>
          </div>
        </div>

        <div>
          <div className="P_Form_Group">
            <label>Probation End Date</label>
            <input
              type="text"
              placeholder="23 - 09 - 2022"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
          <div className="P_Form_Group my-4">
            <label>Country</label>
            <select>
              <option value="male">Nigeria</option>
              <option value="male">Ghana</option>
            </select>
          </div>
          <div className="P_Form_Group">
            <label>Department</label>
            <input type="text" placeholder="App Dev" />
          </div>
          <div className="P_Form_Group mt-4">
            <label>Hire Date</label>
            <input
              type="text"
              placeholder="23 - 09 - 2022"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
        </div>
      </div>

      {/* NEXT of Kind section */}
      <div className="my-12">
        <h5 className="text-accent font-semibold pb-2">Next of Kin</h5>
        <div className="border-b mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10  gap-y-3 lg:gap-y-10">
          <div>
            <div className="P_Form_Group">
              <label>Name</label>
              <input type="text" placeholder="Godswill Omenuko" />
            </div>

            <div className="P_Form_Group mt-4">
              <label>Address</label>
              <textarea
                className="resize-none"
                placeholder="No 3 United Estate Ajah Lagos Nigeria"
              />
            </div>
          </div>

          <div>
            <div className="P_Form_Group">
              <label>Relation</label>
              <select>
                <option value="male">Spouse</option>
              </select>
            </div>
            <div className="P_Form_Group my-4">
              <label>Employee Number</label>
              <input type="tel" placeholder="+234 | 9078657754" />
            </div>
          </div>
        </div>
      </div>

      {/* Personal Account detail */}
      <div className="my-12">
        <h5 className="text-accent font-semibold pb-2">
          Pension Account Details
        </h5>
        <div className="border-b mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10  gap-y-3 lg:gap-y-10">
          <div className="P_Form_Group">
            <label>Pension fund Administrator</label>
            <select>
              <option value="male">Stanbic IBTC Pension</option>
            </select>
          </div>

          <div className="P_Form_Group">
            <label>Pension Account Number</label>
            <input type="text" placeholder="RSA275697464" />
          </div>
        </div>
      </div>
      {/* Bank Account Details */}
      <div className="my-12">
        <h5 className="text-accent font-semibold pb-2">Bank Account Details</h5>
        <div className="border-b mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-10  gap-y-3 lg:gap-y-10">
          <div className="P_Form_Group">
            <label>Bank</label>
            <select>
              <option value="male">Access Bank Ltd</option>
            </select>
          </div>

          <div className="P_Form_Group">
            <label>Bank Account Number</label>
            <input type="number" placeholder="2756970464" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default EmployeeInformation;
