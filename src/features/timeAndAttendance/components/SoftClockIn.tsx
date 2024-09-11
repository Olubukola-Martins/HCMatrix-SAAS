import { openNotification } from "utils/notifications";
import offIndicator from "../assets/images/onIndicator.svg";
import { useSoftClockIn } from "../hooks/useSoftClockIn";
import { useContext, useState } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { Dropdown, Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { LoadingOutlined } from "@ant-design/icons";
import { useManageLocation } from "../hooks/useManageLocation";
import { QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS } from "../hooks/useClockingAndBreakStatus";
import { QUERY_KEY_FOR_TIME_SHEET } from "../features/timeSheet/hooks/useGetTimeSheet";
import { QUERY_KEY_FOR_ANALYTICS_RECORDS } from "../features/home/hooks/useGetAnalyticsRecord";
import { QUERY_KEY_FOR_TIME_SHEET_DASHBOARD } from "../features/home/hooks/useGetTimeSheetRecord";
import { softClockInAndOutProps } from "../types";

export const SoftClockIn = ({ componentType }: softClockInAndOutProps) => {
  const [openModal, setOpenModal] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate } = useSoftClockIn();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { lat, long } = useManageLocation();

  const onSubmit = () => {
    openNotification({
      state: "info",
      title: "Wait a second ...",
      description: <LoadingOutlined />,
    });
    mutate(
      {
        location: {
          longitude: long ? long : null,
          latitude: lat ? lat : null,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
            duration: 7.0,
          });
        },
        onSuccess: (res: any) => {
          openNotification({
            state: "success",
            title: "Success",
            description: res.data.message,
            duration: 4,
          });
          dispatch({ type: EGlobalOps.setShowInitialSetup, payload: true });
          queryClient.invalidateQueries([
            QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS,
          ]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_SHEET]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_ANALYTICS_RECORDS]);
          queryClient.invalidateQueries([QUERY_KEY_FOR_TIME_SHEET_DASHBOARD]);
        },
      }
    );
    setDropdownVisible(false);
  };

  return (
    <div>
      {componentType === "image" ? (
        <img
          src={offIndicator}
          alt="off indicator"
          className="cursor-pointer"
          title="Clock in"
          onClick={() => setOpenModal(true)}
        />
      ) : (
        <button className="button w-full"  onClick={() => setOpenModal(true)}>Clock - In</button>
      )}
      {/* <Dropdown
        trigger={["click"]}
        visible={dropdownVisible}
        onVisibleChange={(visible) => setDropdownVisible(visible)}
        overlay={
          <div className="bg-mainBg rounded py-3 px-3 border shadow mt-3">
            <p className="font-medium">Want to clock in ?</p>

            <div className="flex justify-between items-center mt-5">
              <AppButton
                variant="transparent"
                label="No"
                handleClick={() => setDropdownVisible(false)}
              />

              <AppButton
                label="Yes"
                type="submit"
                handleClick={() => onSubmit()}
              />
            </div>
          </div>
        }
      >
        {componentType === "image" ? (
          <img
            src={offIndicator}
            alt="off indicator"
            className="cursor-pointer"
            title="Clock in"
          />
        ) : (
          <button className="button w-full">Clock - In</button>
        )}
      </Dropdown> */}
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title={"Clock in"}
        style={{ top: 15 }}
      >
        ClockInAndClockModal
      </Modal>
    </div>
  );
};
