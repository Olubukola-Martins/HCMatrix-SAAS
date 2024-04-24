import {  Menu, Button, Dropdown } from "antd";
import { ColumnsType } from "antd/lib/table";
import { AppButton } from "components/button/AppButton";
import { TAssetRequisition } from "features/self-service/features/requisitions/types/asset";
import { MoreOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useState } from "react";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetAssetRequisitions4AuthEmployee } from "../../hooks/requisitions/useGetAssetRequisitions4AuthEmployee";
import { usePagination } from "hooks/usePagination";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { SelectApprovalStatus } from "features/core/workflows/components/SelectApprovalStatus";
import { TApprovalStatus } from "types/statuses";
import { NewAssetRequest } from "../NewAssetRequest";
import { AssetRequestDetails } from "../AssetRequestDetails";
import { CancelAssetRequistion } from "./CancelAssetRequistion";
import ViewApprovalStages from "features/core/workflows/components/approval-request/ViewApprovalStages";
import { TableWithFocusType } from "components/table";

type TAction = "add" | "cancel" | "view" | "view-approval-stages";
export const EmployeeAssetRequisitionHistory: React.FC<{
  title?: string;
}> = ({ title }) => {
  const { pagination, onChange } = usePagination();

  const { data, isFetching } = useGetAssetRequisitions4AuthEmployee({
    pagination,
  });
  const [status, setStatus] = useState<TApprovalStatus>();
  const [showM, setShowM] = useState<TAction>();
  const [request, setRequest] = useState<TAssetRequisition>();
  const handleAction = (action: TAction, item?: TAssetRequisition) => {
    setShowM(action);
    setRequest(item);
  };
  const columns: ColumnsType<TAssetRequisition> = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (_, item) => (
        <span>{moment(item.date).format(DEFAULT_DATE_FORMAT)} </span>
      ),
    },

    {
      title: "Asset",
      dataIndex: "asset",
      key: "asset",
      render: (_, item) => (
        <span className="capitalize">{item.asset.name} </span>
      ),
    },

    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
      ellipsis: true,
      render: (_, item) => <span>{item.description} </span>,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, item) => (
        <span
          style={{ color: getAppropriateColorForStatus(item.status) }}
          className="capitalize"
        >
          {item.status}{" "}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, item) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item
                key="cancel"
                hidden={item.status !== "pending"}
                onClick={() => {
                  handleAction("cancel", item);
                }}
              >
                Cancel
              </Menu.Item>
              <Menu.Item
                key="5"
                onClick={() => {
                  handleAction("view-approval-stages", item);
                }}
              >
                Approval Stages
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  handleAction("view", item);
                }}
              >
                View Details
              </Menu.Item>
            </Menu>
          }
          trigger={["click"]}
        >
          <Button title="Actions" icon={<MoreOutlined />} type="text" />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <NewAssetRequest
        open={showM === "add"}
        handleClose={() => setShowM(undefined)}
      />
      {request && (
        <AssetRequestDetails
          open={showM === "view"}
          handleClose={() => setShowM(undefined)}
          id={request.id}
        />
      )}
      {request && (
        <ViewApprovalStages
          handleClose={() => setShowM(undefined)}
          open={showM === "view-approval-stages"}
          id={request?.id}
          type="asset"
        />
      )}
      <CancelAssetRequistion
        handleClose={() => setShowM(undefined)}
        data={request}
        open={showM === "cancel"}
      />

      <div className="flex flex-col gap-2">
        <h4 className="text-lg font-light">{title}</h4>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <div className="">
              <SelectApprovalStatus
                value={status}
                onSelect={(id) => {
                  setStatus(id);
                }}
                onClear={() => {
                  setStatus(undefined);
                }}
              />
            </div>
          </div>
          <AppButton
            {...{
              label: "New Asset Request",
              handleClick: () => handleAction("add"),
            }}
          />
        </div>
        <TableWithFocusType
          columns={columns}
          size="small"
          dataSource={data?.data}
          loading={isFetching}
          pagination={{ ...pagination, total: data?.total }}
          onChange={onChange}
        />
      </div>
    </>
  );
};
