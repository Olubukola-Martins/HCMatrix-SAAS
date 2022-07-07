import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../../../Layout/DashboardLayout";

const LocationDetail = () => {
  return (
    <DashboardLayout>
      <div className="Container mt-3 h-screen">
        <div className="bg-card flex justify-between items-center py-2 px-4 rounded-md">
          <div className="flex items-center gap-2 text-accent font-semibold mt-2 pb-1">
            <Link to="/settings/locations">
              <i className="ri-arrow-left-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
            <h5 className="text-sm">Work Location</h5>
          </div>
          <div className="flex items-center gap-3">
            <i className="ri-pencil-fill cursor-pointer text-xl"></i>
            <i className="ri-question-fill text-xl text-slate-400"></i>
            <i className="ri-more-fill cursor-pointer text-xl font-semibold"></i>
          </div>
        </div>

        <div className="bg-card mt-5 pt-2 pb-10 px-4 rounded-md">
          <h3 className="text-accent font-bold">Location details</h3>
          <form className="whiteBg_form mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label>Location Name</label>
                <input type="text" placeholder="UI/UX Designer" required disabled/>
              </div>
              <div>
                <label>Mail Alias</label>
                <input type="email" placeholder="johndoe@email.com" required disabled/>
              </div>

              <div>
                <label>Modified by</label>
                <input type="text" placeholder="John Obi" required disabled/>
              </div>
              <div>
                <label>Time Modified</label>
                <input type="text" placeholder="24-07-2022  02-58pm" required disabled/>
              </div>
              <div>
                <label>Country</label>
                <select required disabled>
                  <option value="">Ghana</option>
                  <option value="1">Nigeria</option>
                  <option value="2">Ghana</option>
                </select>
              </div>
              <div>
                <label>State</label>
                <select required disabled>
                  <option value="">Ahafo</option>
                  <option value="1">Ashanti</option>
                </select>
              </div>
              <div>
                <label>Time zone</label>
                <select required disabled>
                  <option value="">Eastern Standard Time (EST)</option>
                  <option value="1">Mountain Standard Time (MST)</option>
                </select>
              </div>
              <div>
                <label>Added by</label>
                <input type="text" placeholder="isaac odeh" required disabled/>
              </div>
              <div>
                <label>Time Added</label>
                <input type="text" placeholder="24-07-2022  02-58pm" required disabled/>
              </div>
            </div>
            <div className="flex items-center gap-x-5 mt-6 justify-center">
          <button
            className="transparentButton"
          >
            Cancel
          </button>
          <button className="button">Save Changes</button>
        </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LocationDetail;
