import React from "react";
import "../style/settingsStyle.css";

const AddEmployee = ({ close }) => {
  return (
    <div className="Container pb-10">
      <div className="bg-card pt-5 pb-10 px-5 rounded-md mt-5">
        <div className="flex items-center gap-3">
          <i
            className="ri-arrow-left-line hover:text-caramel cursor-pointer text-xl text-accent"
            onClick={close}
          ></i>
          <h5 className="font-semibold text-lg text-accent">Add Employee</h5>
        </div>

        <form className="whiteBg_form mt-7">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label>First Name</label>
              <input type="text" required placeholder="godswill" />
            </div>
            <div>
              <label>Middle Name</label>
              <input type="text" required placeholder="smile" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" required placeholder="walter" />
            </div>
            <div>
              <label>Email</label>
              <input type="email" required placeholder="johndoe@email.com" />
            </div>
            <div>
              <label>Phone</label>
              <input type="tel" required placeholder="+234 | 90-456-54-299" />
            </div>
            <div>
              <label>Employee Number</label>
              <input type="tel" required placeholder="SNN 2345" />
            </div>
            <div>
              <label>Role</label>
              <select required>
                <option value="">e.g Line manager</option>
                <option value="1">Line Manager</option>
                <option value="2">Team lead</option>
              </select>
            </div>
            <div>
              <label>Gender</label>
              <select required>
                <option value="">e.g Male</option>
                <option value="1">Male</option>
                <option value="2">Female</option>
              </select>
            </div>
            <div>
              <label>Date of Birth</label>
              <input
                type="text"
                required
                placeholder="23-07-2020"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
            <div>
              <label>Grade</label>
              <select required>
                <option value="">e.g Grade 1</option>
                <option value="1">Grade 1</option>
                <option value="2">Grade 2</option>
              </select>
            </div>
            <div>
              <label>Branch</label>
              <input type="text" required placeholder="New york" />
            </div>
            <div>
              <label>Department</label>
              <select required>
                <option value="">e.g App dev</option>
                <option value="1">Sales</option>
                <option value="2">CSI</option>
              </select>
            </div>
            <div>
              <label>Resumption Date</label>
              <input
                type="text"
                required
                placeholder="23-07-2020"
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-center mt-4">
            <h5
              className="font-medium cursor-pointer hover:font-semibold"
              onClick={close}
            >
              Cancel
            </h5>
            <button className="button">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
