import React, { useState } from "react";
import { CostCentreOverview } from "./CostCentreOverview";
import { TCostCentre } from "features/payroll/types";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import moment from "moment";
import { SaveCostCentre } from "./SaveCostCentre";
import { useUpdateCostCentre } from "features/payroll/hooks/costCentres/useUpdateCostCentre";
import { openNotification } from "utils/notifications";
import { DeleteCostCentre } from "./DeleteCostCentre";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import CostCentreTransactions from "./CostCentreTransactions";

type TAction = "update" | "delete";
const ViewCostCentreContainer: React.FC<{ data?: TCostCentre }> = ({
  data,
}) => {
  const [action, setAction] = useState<TAction>();
  const { mutate, isLoading } = useUpdateCostCentre();
  const [url, setUrl] = useState<string>();

  const handleSubmit = (props: { name: string; amountEntered: number }) => {
    if (!data) return;
    mutate(
      {
        id: data.id,
        body: {
          name:
            props.name.toLowerCase() === data.name.toLowerCase()
              ? undefined
              : props.name,
          amountEntered: props.amountEntered,
        },
      },
      {
        onError: (err: any) => {
          openNotification({
            state: "error",
            title: "Error Occurred",
            description:
              err?.response.data.message ?? err?.response.data.error.message,
          });
        },
        onSuccess: (res) => {
          openNotification({
            state: "success",

            title: "Success",
            description: res.message,
            // duration: 0.4,
          });
          console.log("url", res.data?.paymentData.authorization_url);
          setUrl(res.data?.paymentData.authorization_url);
        },
      }
    );
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-4">
      <SaveCostCentre
        open={action === "update"}
        handleClose={() => setAction(undefined)}
        url={url}
        handleSubmit={{ fn: handleSubmit, isLoading }}
        costCentre={data}
        title="Update Cost Centre"
      />
      {data && (
        <DeleteCostCentre
          open={action === "delete"}
          handleClose={() => setAction(undefined)}
          costCentre={data}
          onDelete={() => navigate(appRoutes.payrollCostCentres)}
        />
      )}
      <CostCentreOverview
        handleDelete={() => setAction("delete")}
        data={{
          balance: data?.balance,
          lastFundedAmount: data?.amountEntered,
          createdAt: moment(data?.createdAt).format(DEFAULT_DATE_FORMAT),
          updatedAt: moment(data?.updatedAt).format(DEFAULT_DATE_FORMAT),
        }}
        handleUpdate={() => setAction("update")}
      />
      {data && <CostCentreTransactions costCentreId={data?.id} />}
    </div>
  );
};

export default ViewCostCentreContainer;
