import { Drawer } from "antd";
import { AppButton } from "components/button/AppButton";
import { radioFormOptions } from "features/timeAndAttendance/constants";
import { UseWindowWidth } from "features/timeAndAttendance/hooks/UseWindowWidth";
import { useCreateTimeTrackingRule } from "features/timeAndAttendance/hooks/useCreateTimeTrackingRule";
import { QUERY_KEY_FOR_COMPANY_POLICY } from "features/timeAndAttendance/hooks/useGetTimeTrackingRule";
import { useApiAuth } from "hooks/useApiAuth";
import { useState, useContext } from "react";
import { useQueryClient } from "react-query";
import { GlobalContext, EGlobalOps } from "stateManagers/GlobalContextProvider";
import { IDrawerProps } from "types";
import { openNotification } from "utils/notifications";
import checkboxBase from "../../assets/images/CheckboxBase.svg";
import faceReg from "../../assets/images/lucide_scan-face.svg";
import locationIcon from "../../assets/images/symbols_location.svg";
import editPenIcon from "../../assets/images/edit-outline.svg";

export const CreateTrackingRule = ({ handleClose, open }: IDrawerProps) => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { companyId, token, currentUserId } = useApiAuth();
  const queryClient = useQueryClient();
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const { mutate, isLoading } = useCreateTimeTrackingRule();
  const { drawerSize } = UseWindowWidth();

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedOption) {
      setError("Please select an option");
    } else {
      if (companyId) {
        mutate(
          {
            companyId,
            token,
            adminId: currentUserId,
            policy: selectedOption,
          },
          {
            onError: (err: any) => {
              openNotification({
                state: "error",
                title: "Error Occurred",
                description:
                  err?.response.data.message ??
                  err?.response.data.error.message,
                duration: 5.0,
              });
            },
            onSuccess: (res: any) => {
              openNotification({
                state: "success",
                title: "Success",
                description: "Time tracking created successfully",
              });
              dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
              queryClient.invalidateQueries([QUERY_KEY_FOR_COMPANY_POLICY]);
              handleClose();
            },
          }
        );
      }
    }
  };

  return (
    <Drawer
      size={drawerSize}
      open={open}
      onClose={() => handleClose()}
      title="Create Tracking Rule"
    >
      <form onSubmit={handleSubmit}>
        {radioFormOptions.map((option) => (
          <label
            key={option.value}
            htmlFor={option.value}
            className="relative flex flex-col bg-white p-4 rounded-lg shadow-sm cursor-pointer border border-gray-300 my-5"
          >
            <div className="flex justify-between mb-4">
              <div className="flex items-center gap-x-3">
                <div className="text-sm">
                  <span className="font-medium text-orange-600">
                    {option.label}
                  </span>
                  <p className="pt-1">{option.description}</p>
                </div>
              </div>

              <img src={checkboxBase} alt="checkbox" className="h-4 mt-1" />
            </div>
            <div className="px-10">
              <hr />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7 lg:gap-y-3 lg:gap-x-3 mt-4">
              <div className="flex items-center gap-2">
                <img src={faceReg} alt="face recognition" className="h-11" />
                <div>
                  <h3 className="font-medium text-base">{option.faceRTitle}</h3>
                  <p className="text-xs pt-1">{option.faceRDes}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img src={locationIcon} alt="GPS" className="h-11" />
                <div>
                  <h3 className="font-medium text-base">
                    {option.locationTitle}
                  </h3>
                  <p className="text-xs pt-1">Goefence disable</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <img
                  src={editPenIcon}
                  alt="Editable Time Entries"
                  className="h-11"
                />
                <div>
                  <h3 className="font-medium text-base">
                    Editable Time Entries
                  </h3>
                </div>
              </div>
            </div>
            <input
              type="radio"
              name="plan"
              id={option.value}
              value={option.value}
              className="absolute h-0 w-0 appearance-none"
              onChange={handleOptionChange}
            />
            <span
              style={{ background: "#fff" }}
              aria-hidden="true"
              className="hidden absolute inset-0 border pl-4 bg-opacity-1 border-caramel rounded-lg"
            >
              <div className="flex items-center gap-x-3 mt-3 mb-4">
                <div className="text-sm">
                  <span className="font-medium text-orange-600">
                    {option.label}
                  </span>
                  <p className="pt-1">{option.description}</p>
                </div>
              </div>
              <span className="absolute top-4 right-4 h-4 w-4 mt-2 inline-flex items-center justify-center rounded-full bg-caramel">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-5 w-5 text-white"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className="px-10">
                <hr />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-7 lg:gap-y-3 lg:gap-x-3 mt-4">
                <div className="flex items-center gap-2">
                  <img src={faceReg} alt="face recognition" className="h-11" />
                  <div>
                    <h3 className="font-medium text-base">
                      {option.faceRTitle}
                    </h3>
                    <p className="text-xs pt-1">{option.faceRDes}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img src={locationIcon} alt="GPS" className="h-11" />
                  <div>
                    <h3 className="font-medium text-base">
                      {option.locationTitle}
                    </h3>
                    <p className="text-xs pt-1">Goefence disable</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src={editPenIcon}
                    alt="Editable Time Entries"
                    className="h-11"
                  />
                  <div>
                    <h3 className="font-medium text-base">
                      Editable Time Entries
                    </h3>
                  </div>
                </div>
              </div>
            </span>
          </label>
        ))}
        <div className="flex justify-end">
          <div>
            <AppButton
              type="submit"
              isLoading={isLoading}
              additionalClassNames={["button py-1"]}
            />
            {error && (
              <p className="text-sm pt-2 text-red-500 font-medium">{error}</p>
            )}
          </div>
        </div>
      </form>
    </Drawer>
  );
};
