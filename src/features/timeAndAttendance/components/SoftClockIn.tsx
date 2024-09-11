import { openNotification } from "utils/notifications";
import offIndicator from "../assets/images/onIndicator.svg";
import { useSoftClockIn } from "../hooks/useSoftClockIn";
import { useContext, useState } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { Modal } from "antd";
import { AppButton } from "components/button/AppButton";
import { LoadingOutlined } from "@ant-design/icons";
import { useManageLocation } from "../hooks/useManageLocation";
import { QUERY_KEY_FOR_CLOCKING_AND_BREAK_STATUS } from "../hooks/useClockingAndBreakStatus";
import { QUERY_KEY_FOR_TIME_SHEET } from "../features/timeSheet/hooks/useGetTimeSheet";
import { QUERY_KEY_FOR_ANALYTICS_RECORDS } from "../features/home/hooks/useGetAnalyticsRecord";
import { QUERY_KEY_FOR_TIME_SHEET_DASHBOARD } from "../features/home/hooks/useGetTimeSheetRecord";
import { softClockInAndOutProps } from "../types";
import confirmActionSvg from "../assets/images/confirmClocking.svg";
import { QUERY_KEY_FOR_DASHBOARD_GRAPH } from "../features/home/hooks/useGetDashboardGraph";

export const SoftClockIn = ({ componentType }: softClockInAndOutProps) => {
  const [openModal, setOpenModal] = useState(false);
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSoftClockIn();
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
          queryClient.invalidateQueries([QUERY_KEY_FOR_DASHBOARD_GRAPH]);
          
        },
      }
    );
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
        <button className="button w-full" onClick={() => setOpenModal(true)}>
          Clock - In
        </button>
      )}
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
        title={"Clock In"}
        style={{ top: 15 }}
      >
        <div className="flex flex-col gap-4 items-center">
          <div className="flex justify-center h-[50vh] items-center">
            <img
              src={confirmActionSvg}
              alt="confirm action"
              className="object-contain h-4/5"
            />
          </div>
          <h4 className="text-center text-base mb-4 font-semibold">
            Are you sure you want to clock in
          </h4>
          <div className="flex justify-between w-full">
            <AppButton
              label="Cancel"
              variant="transparent"
              handleClick={() => setOpenModal(false)}
            />
            <AppButton label={"Confirm"} isLoading={isLoading} handleClick={() => onSubmit()} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
