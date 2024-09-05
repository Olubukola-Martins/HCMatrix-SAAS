import { Avatar, Card, Dropdown, Skeleton } from "antd";
import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import { useGetShareholdersCompliance } from "features/payroll/hooks/compliance/shareholder/useGetShareholdersCompliance";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { EmptyDataWrapper } from "components/data/EmptyDataWrapper";
import {
  SaveComplianceShareholder,
  SaveComplianceShareholderBtn,
} from "./SaveShareholder";
import { TShareholdersCompliance } from "features/payroll/types/compliance";
import { DeleteShareholder } from "./DeleteShareholder";

type TAction = "edit" | "delete";

const WalletComplianceShareholders: React.FC = () => {
  const { data, isLoading } = useGetShareholdersCompliance();
  const status = data?.approvalStatus;
  const [action, setAction] = useState<TAction>();
  const [selected, setSelected] = useState<
    TShareholdersCompliance["shareholders"][number] & { id: number }
  >();
  const handleAction = (
    action: TAction,
    selected?: TShareholdersCompliance["shareholders"][number] & { id: number }
  ) => {
    setAction(action);
    setSelected(selected);
  };
  const onClose = () => setAction(undefined);
  return (
    <>
      <SaveComplianceShareholder
        handleClose={onClose}
        open={action === "edit"}
        shareholders={data?.shareholders}
        data={{
          action: "edit",
          shareholder: selected,
        }}
      />
      <DeleteShareholder
        handleClose={onClose}
        open={action === "delete"}
        shareholder={selected}
        shareholders={data?.shareholders}
      />
      <Skeleton loading={isLoading} active paragraph={{ rows: 10 }}>
        <div className="space-y-6">
          <div className="flex justify-end">
            {status ? (
              <button
                className="rounded-lg px-4 py-2 flex items-center text-sm font-semibold cursor-default"
                style={{
                  background: `${getAppropriateColorForStatus(status)}20`,
                  backgroundBlendMode: "difference",
                }}
              >
                <span
                  className="text-center capitalize"
                  style={{
                    color: getAppropriateColorForStatus(status),
                    opacity: 3,
                  }}
                >
                  Approval Status: {status}
                </span>
              </button>
            ) : null}
          </div>

          <EmptyDataWrapper
            isEmpty={!(data && data?.shareholders?.length > 0)}
            emptyProps={{ description: "No Shareholders" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
              {data?.shareholders.map(({ name, sharesHeld, imageUrl }, i) => (
                <Card key={i}>
                  <div className="flex justify-between">
                    <div className="space-y-4">
                      <Avatar
                        size={100}
                        alt={name}
                        src={imageUrl ?? DEFAULT_PROFILE_IMAGE_URL}
                      />
                      <div className="space-y-1">
                        <p className="font-normal">
                          Name:
                          <span className="text-sm ml-1 font-semibold capitalize">
                            {name}
                          </span>
                        </p>
                        <p className="font-normal">
                          Shares Held:
                          <span className="text-sm ml-1 font-semibold capitalize">
                            {sharesHeld}
                          </span>
                        </p>
                      </div>
                    </div>
                    <Dropdown
                      trigger={["click"]}
                      menu={{
                        items: [
                          {
                            label: "Update",
                            key: "Update",
                            onClick: () =>
                              handleAction("edit", {
                                name,
                                sharesHeld,
                                imageUrl,
                                id: i,
                              }),
                          },
                          {
                            label: "Delete",
                            key: "Delete",
                            onClick: () =>
                              handleAction("delete", {
                                name,
                                sharesHeld,
                                imageUrl,
                                id: i,
                              }),
                          },
                        ],
                      }}
                    >
                      <AiOutlineMore className="cursor-pointer" />
                    </Dropdown>
                  </div>
                </Card>
              ))}
            </div>
          </EmptyDataWrapper>
          <div className="flex justify-end">
            <SaveComplianceShareholderBtn shareholders={data?.shareholders} />
          </div>
        </div>
      </Skeleton>
    </>
  );
};

export default WalletComplianceShareholders;
