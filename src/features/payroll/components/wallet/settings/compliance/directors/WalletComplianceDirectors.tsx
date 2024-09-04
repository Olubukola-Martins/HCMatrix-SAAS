import { Avatar, Card, Dropdown, Skeleton } from "antd";
import React, { useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";
import {
  SaveComplianceDirector,
  SaveComplianceDirectorBtn,
} from "./SaveComplianceDirector";
import { useGetDirectorsCompliance } from "features/payroll/hooks/compliance/director/useGetDirectorsCompliance";
import { DEFAULT_PROFILE_IMAGE_URL } from "constants/general";
import { EmptyDataWrapper } from "components/data/EmptyDataWrapper";
import { TDirectorsCompliance } from "features/payroll/types/compliance";
import { DeleteComplianceDirector } from "./DeleteComplianceDirector";

type TAction = "edit" | "delete";
const WalletComplianceDirectors: React.FC = () => {
  const { data, isLoading } = useGetDirectorsCompliance();
  const status = data?.approvalStatus;
  const [action, setAction] = useState<TAction>();
  const [selected, setSelected] = useState<
    TDirectorsCompliance["directors"][number] & { id: number }
  >();
  const handleAction = (
    action: TAction,
    selected?: TDirectorsCompliance["directors"][number] & { id: number }
  ) => {
    setAction(action);
    setSelected(selected);
  };
  const onClose = () => setAction(undefined);
  return (
    <>
      <SaveComplianceDirector
        handleClose={onClose}
        open={action === "edit"}
        directors={data?.directors}
        data={{
          action: "edit",
          director: selected,
        }}
      />
      <DeleteComplianceDirector
        handleClose={onClose}
        open={action === "delete"}
        director={selected}
        directors={data?.directors}
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
            emptyProps={{ description: "No Directors" }}
            isEmpty={!(data && data?.directors?.length > 0)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
              {data?.directors.map(({ name, position, imageUrl }, i) => (
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
                          Position:
                          <span className="text-sm ml-1 font-semibold capitalize">
                            {position}
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
                                position,
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
                                position,
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
            <SaveComplianceDirectorBtn directors={data?.directors} />
          </div>
        </div>
      </Skeleton>
    </>
  );
};

export default WalletComplianceDirectors;
