import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Empty, Pagination, Skeleton } from "antd";
import { usePagination } from "hooks/usePagination";
import {
  QUERY_KEY_FOR_COST_CENTRES,
  useGetCostCentres,
} from "features/payroll/hooks/costCentres/useGetCostCentres";
import { TCostCentre } from "features/payroll/types";
import moment from "moment";
import { DeleteCostCentre } from "./DeleteCostCentre";
import { AppButton } from "components/button/AppButton";
import { useAddCostCentre } from "features/payroll/hooks/costCentres/useAddCostCentre";
import { openNotification } from "utils/notifications";
import { useQueryClient } from "react-query";
import { SaveCostCentre } from "./SaveCostCentre";
import { useUpdateCostCentre } from "features/payroll/hooks/costCentres/useUpdateCostCentre";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";

export const CostCentreContainer = () => {
  const [showD, setShowD] = useState(false);
  const { mutate, isLoading } = useAddCostCentre();
  const [url, setUrl] = useState<string>();
  const queryClient = useQueryClient();

  const handleSubmit = (data: { name?: string; amountEntered?: number }) => {
    if (!data.name || !data.amountEntered) return;
    mutate(
      {
        name: data?.name,
        amountEntered: data?.amountEntered,
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
          queryClient.invalidateQueries({
            queryKey: [QUERY_KEY_FOR_COST_CENTRES],
            // exact: true,
          });
        },
      }
    );
  };
  const onClose = () => {
    setShowD(false);
    setUrl(undefined);
  };
  return (
    <>
      <SaveCostCentre
        open={showD}
        handleClose={() => onClose()}
        url={url}
        handleSubmit={{ fn: handleSubmit, isLoading }}
      />
      <div className="flex flex-col gap-8">
        <PageSubHeader
          description={`You can now create/edit cost centres`}
          actions={[
            {
              name: "Add Cost Centre",
              handleClick: () => setShowD(true),
              btnVariant: "transparent",
            },
          ]}
        />
        <CostCentreCardList />
      </div>
    </>
  );
};

const CostCentreCardList = () => {
  const { pagination, onChange } = usePagination({ pageSize: 6 });
  const { data, isFetching } = useGetCostCentres({
    pagination,
  });
  return (
    <div>
      <Skeleton loading={isFetching} paragraph={{ rows: 8 }}>
        {data?.data && data?.data.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 lg:gap-x-10 gap-y-10">
              {data?.data.map((item) => (
                <CostCentreCard key={item.id} data={item} />
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Pagination
                {...{ ...pagination, total: data?.total }}
                onChange={onChange}
                size="small"
              />
            </div>
          </>
        )}
        {data?.data && data?.data.length === 0 && (
          <Empty description="No Cost Centres" />
        )}
      </Skeleton>
    </div>
  );
};

type TAction = "fund" | "delete" | "view" | "edit";
const CostCentreCard: React.FC<{ data: TCostCentre }> = ({ data }) => {
  const queryClient = useQueryClient();

  const [action, setAction] = useState<TAction>();
  const { mutate, isLoading } = useUpdateCostCentre();
  const [url, setUrl] = useState<string>();

  const handleSubmit = (props: { name?: string; amountEntered?: number }) => {
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
              queryKey: [QUERY_KEY_FOR_COST_CENTRES],
              // exact: true,
            });
          }
        },
      }
    );
  };
  const onClose = () => {
    setAction(undefined);
    setUrl(undefined);
  };
  return (
    <>
      <SaveCostCentre
        key="fund"
        open={action === "fund"}
        handleClose={onClose}
        url={url}
        handleSubmit={{ fn: handleSubmit, isLoading }}
        costCentre={data}
        title="Fund Cost Centre"
        fieldsToDisplay={["amountEntered"]}
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

      <DeleteCostCentre
        open={action === "delete"}
        handleClose={onClose}
        costCentre={data}
      />

      <div className="rounded border shadow bg-mainBg">
        <div className="bg-card p-3 flex justify-between items-center">
          <Link to={appRoutes.singleCostCentre(data.id).path} className="">
            <h4 className="font-medium text-lg text-caramel underline underline-offset-2 hover:no-underline capitalize">
              {data.name}
            </h4>
          </Link>

          <div className="flex gap-4 items-center">
            <AppButton label="Fund" handleClick={() => setAction("fund")} />

            <i
              className="ri-pencil-line text-lg cursor-pointer"
              onClick={() => setAction("edit")}
            />
            <i
              className="ri-delete-bin-6-line text-lg cursor-pointer"
              onClick={() => setAction("delete")}
            />
          </div>
        </div>
        <div className="px-3">
          <div className="border-b flex  gap-5 text-sm">
            <div className="py-7 ">
              <p className="pb-2">
                Date Created: {moment(data.createdAt).format("YYYY-MM-DD")}
              </p>
              <p>
                Last Modified: {moment(data.updatedAt).format("YYYY-MM-DD")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
