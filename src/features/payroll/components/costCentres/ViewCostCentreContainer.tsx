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
import { useQueryClient } from "react-query";
import { QUERY_KEY_FOR_SINGLE_COST_CENTRE } from "features/payroll/hooks/costCentres/useGetSingleCostCentre";

type TAction = "edit" | "fund" | "delete";
const ViewCostCentreContainer: React.FC<{ data?: TCostCentre }> = ({
  data,
}) => {
  const queryClient = useQueryClient();

  const [action, setAction] = useState<TAction>();
  const { mutate, isLoading } = useUpdateCostCentre();
  const [url, setUrl] = useState<string>();

  const handleSubmit = (props: { name?: string; amountEntered?: number }) => {
    if (!data) return;

    mutate(
      {
        id: data.id,
        body: {
          name:
            props?.name?.toLowerCase() === data.name.toLowerCase()
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
          res.data?.paymentData?.authorization_url &&
            setUrl(res.data?.paymentData?.authorization_url);
          if (!res.data?.paymentData?.authorization_url) {
            // only invalidate query when there is no payment
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEY_FOR_SINGLE_COST_CENTRE],
              // exact: true,
            });
          }
        },
      }
    );
  };
  const navigate = useNavigate();
  const onClose = () => {
    setAction(undefined);
    setUrl(undefined);
  };
  const onPaymentCompletion = () => {
    queryClient.invalidateQueries({
      queryKey: [QUERY_KEY_FOR_SINGLE_COST_CENTRE],
      // exact: true,
    });
    setUrl(undefined);
  };
  return (
    <div className="flex flex-col gap-4">
      <SaveCostCentre
        key="fund"
        open={action === "fund"}
        handleClose={onClose}
        url={url}
        handleSubmit={{ fn: handleSubmit, isLoading }}
        costCentre={data}
        title="Fund Cost Centre"
        fieldsToDisplay={["amountEntered"]}
        onPaymentCompletion={onPaymentCompletion}
      />
      <SaveCostCentre
        key="edit"
        open={action === "edit"}
        handleClose={onClose}
        handleSubmit={{ fn: handleSubmit, isLoading }}
        costCentre={data}
        title="Edit Cost Centre"
        fieldsToDisplay={["name"]}
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
          totalCredit: data?.totalCredits,
          totalDebit: data?.totalDebits,
          totalTransactions: data?.totalCompletedTransaction,
          lastFundedAmount: data?.lastAmountCredited,
          createdAt: moment(data?.createdAt).format(DEFAULT_DATE_FORMAT),
          updatedAt: moment(data?.updatedAt).format(DEFAULT_DATE_FORMAT),
        }}
        handleUpdate={() => setAction("edit")}
        handleFund={() => setAction("fund")}
      />
      {data && <CostCentreTransactions costCentreId={data?.id} />}
    </div>
  );
};

export default ViewCostCentreContainer;
