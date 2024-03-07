import { openNotification } from "utils/notifications";
import offIndicator from "../assets/images/offIndicator.svg";
import { useSoftClockIn } from "../hooks/useSoftClockIn";
import { useContext, useEffect, useState } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { Dropdown } from "antd";
import { AppButton } from "components/button/AppButton";
import { LoadingOutlined } from "@ant-design/icons";

export const SoftClockIn = () => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSoftClockIn();

  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        function (error) {
          console.error("Error getting geolocation:", error);
        }
      );
    };

    getLocation();
  }, []);

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
          queryClient.invalidateQueries([]);
        },
      }
    );
  };

  return (
    <div>
      <Dropdown
        trigger={["click"]}
        overlay={
          <div className="bg-mainBg rounded py-3 px-3 border shadow mt-3">
            <p className="font-medium">Want to clock in ?</p>

            <div className="flex justify-between items-center mt-5">
              <AppButton variant="transparent" label="No" />

              <AppButton
                label="Yes"
                type="submit"
                handleClick={() => onSubmit()}
              />
            </div>
          </div>
        }
      >
        <img
          src={offIndicator}
          alt="off indicator"
          className="cursor-pointer"
          title="Clock in"
        />
      </Dropdown>
    </div>
  );
};
