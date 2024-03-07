import { openNotification } from "utils/notifications";
import offIndicator from "../assets/images/offIndicator.svg";
import { useSoftClockIn } from "../hooks/useSoftClockIn";
import { useContext } from "react";
import { EGlobalOps, GlobalContext } from "stateManagers/GlobalContextProvider";
import { useQueryClient } from "react-query";
import { Popconfirm } from "antd";

export const SoftClockIn = () => {
  const globalCtx = useContext(GlobalContext);
  const { dispatch } = globalCtx;
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useSoftClockIn();

  const onSubmit = (values: any) => {
    mutate(
      {
        ...values,
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
      <Popconfirm title={`Want to clock in ?`} onConfirm={() => onSubmit}>
        <img src={offIndicator} alt="off indicator" className="cursor-pointer" title="Clock in"/>
      </Popconfirm>
    </div>
  );
};
