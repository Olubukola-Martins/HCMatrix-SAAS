import { useState } from "react";
import Themes from "../../../../Themes/Themes";

import Modal from "@mui/material/Modal";

const companies = ["PgLang", "Boston", "Prime Atlantic", "LSETF", "UBA"];

const CModal = ({ open, handleClose }) => {
  const [showManual, setShowManual] = useState(false);
  const [sCompanies, setSCompanies] = useState(false);
  const [moveToCompany, setMoveToCompany] = useState("");
  const handleSearch = (e) => {
    const val = e.target.value;
    const result = companies.filter(
      (item) => item.toLowerCase().indexOf(val.toLowerCase()) !== -1
    );
    if (val !== "") {
      setSCompanies(() => result);
    } else {
      setSCompanies([]);
    }
  };
  return (
    <Modal
      open={open === "move-to-external-company"}
      onClose={() => {
        setShowManual(false);
        handleClose();
      }}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div className="CModal" style={{ maxWidth: 600 }}>
          <div className="flex flex-col items-center justify-center pb-8  text-accent">
            <div className="flex items-center justify-end w-full mb-4">
              <i
                class="fas fa-times cursor-pointer text-2xl"
                onClick={handleClose}
              ></i>
            </div>

            <h4 className="font-bold text-lg mb-4 text-center">
              Move to External Company {showManual && <span>(manually)</span>}
            </h4>
            {moveToCompany !== "" && !showManual && (
              <div className="mt-2 flex items-center">
                <div className="bg-green-700 py-1 px-2 rounded-md text-sm flex items-center text-white cursor-pointer">
                  {/* <input type={"checkbox"} className="mr-2" /> */}
                  <i className="ri-checkbox-circle-line text-base mr-2"></i>
                  <p>{moveToCompany}</p>
                </div>
              </div>
            )}
            {showManual && (
              <p className="text-sm">
                Would you like to search for the company{" "}
                <span
                  className="text-red-400 underline cursor-pointer"
                  onClick={() => {
                    setShowManual(false);
                    setMoveToCompany("");
                  }}
                >
                  here
                </span>
              </p>
            )}

            <div className="radio-inputs mt-6 w-3/4 flex flex-col gap-4">
              {!showManual && (
                <div className="input-container w-full">
                  <label className="text-sm mb-2 block">Search Companies</label>

                  <input
                    type="text"
                    placeholder="eg. PgLang"
                    className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    onChange={handleSearch}
                  />

                  <div className="flex flex-col gap-4 mt-1">
                    {sCompanies.length === 0 && (
                      <p className="text-sm ">
                        If company doesn't use HcMatrix, enter their details{" "}
                        <span
                          className="text-red-400 underline cursor-pointer"
                          onClick={() => setShowManual(true)}
                        >
                          here
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              )}

              {showManual && (
                <>
                  <div className="input-container w-full">
                    <label className="text-sm mb-2">Company name</label>

                    <input
                      type="text"
                      placeholder="Enter company name"
                      className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    />
                  </div>
                  <div className="input-container w-full">
                    <label className="text-sm mb-2">Company Email</label>

                    <input
                      type="text"
                      placeholder="Enter company email address"
                      className="w-full bg-transparent rounded-md p-2 border border-gray-400 focus:outline-none "
                    />
                  </div>
                </>
              )}
            </div>
            <div className="radio-inputs mt-2 w-4/5 flex flex-col gap-4">
              {!showManual && sCompanies.length > 0 && (
                <div className="flex gap-4">
                  {sCompanies.map((item) => (
                    <div
                      className="bg-caramel py-1 px-2 rounded-md text-xs flex items-center text-white cursor-pointer"
                      onClick={() => setMoveToCompany(item)}
                    >
                      {/* <input type={"checkbox"} className="mr-2" /> */}
                      <i className="ri-add-circle-fill text-base mr-2"></i>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="buttons mt-6 flex items-center gap-4">
              <button className="px-3 py-1 bg-caramel rounded text-sm text-white font-medium hover:bg-opacity-70">
                Move
              </button>
              <button
                onClick={() => {
                  setShowManual(false);
                  handleClose();
                }}
                className="px-3 py-1 bg-transparent rounded text-sm text-accent border border-slate-200 hover:border-slate-400 font-medium transition ease-in-out duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Themes>
    </Modal>
  );
};

export default CModal;
