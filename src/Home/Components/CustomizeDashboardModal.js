import Modal from "@mui/material/Modal";
import Themes from "../../Themes/Themes";
import { useState } from "react";
import { settingNavItems } from "../../Settings/Data/index";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

let links = [];

settingNavItems.forEach((parent) => {
  links = [...parent.items, ...links];
});

const areas = [
  {
    title: "User Profile",
    capacity: 4,
    amountAdded: 1,
  },
  {
    title: "Sub Header",
    capacity: 4,
    amountAdded: 1,
  },
  {
    title: "Cards",
    capacity: 4,
    amountAdded: 1,
  },
];

const CustomizeDashboardModal = ({ open, handleClose }) => {
  console.log(links);

  const [step, setStep] = useState(0);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="Email Verification"
      aria-describedby="Please verify your account by checking your inbox."
      BackdropProps={{ invisible: false }}
    >
      <Themes>
        <div
          className="CModal overflow-y-auto"
          style={{
            maxWidth: 600,
            top: "20%",
            transform: "translate(-50%, -20%)",
            padding: 0,
          }}
        >
          {step === 0 && (
            <div className="overflow-hidden">
              {/* filter heading */}
              <div className="active w-full flex justify-between items-center md:px-5 px-10 py-4 notranslate">
                <div className="flex-1">
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={links}
                    getOptionLabel={(option) => option.name}
                    //   defaultValue={[links[1]]}
                    filterSelectedOptions
                    sx={{ width: "100%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Links to move"
                        placeholder="Search hcmatrix links"
                        size="small"
                      />
                    )}
                  />
                </div>
              </div>

              {/* content */}
              <div className="mt-2 text-accent border-0 overflow-y-auto">
                <div className="py-4 px-6">
                  <button
                    className="button"
                    title="Move to a new position on dashboard"
                    onClick={() => setStep(1)}
                  >
                    Move to
                  </button>
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="overflow-hidden">
              {/* filter heading */}
              <div className="active w-full flex gap-2 items-center md:px-5 px-10 py-4 notranslate">
                <i
                  className="fa fa-arrow-left text-accent cursor-pointer "
                  aria-hidden="true"
                  onClick={() => setStep(0)}
                ></i>
                <h4>Move Here</h4>
              </div>

              {/* content */}
              <div className="mt-2 text-accent border-0 overflow-y-auto">
                <div className="py-4 px-6 flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    {areas.map((item) => (
                      <div
                        className="bg-card rounded-xl  text-accent border"
                        key={item.title}
                      >
                        <h5 className="py-4 px-3 font-medium">{item.title}</h5>
                        <hr />
                        <span className="text-xs pt-1 pb-4 pl-3">
                          {item.capacity - item.amountAdded} out of{" "}
                          {item.capacity} added
                        </span>
                        <div className="px-3 pt-10">
                          <div className="flex justify-center">
                            <div className="cardImgBg p-4">
                              <img src="{image}" alt="bg" className="h-8" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <button
                      className="button"
                      title="Move to a new position on dashboard"
                    >
                      Move here
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Themes>
    </Modal>
  );
};

export default CustomizeDashboardModal;
