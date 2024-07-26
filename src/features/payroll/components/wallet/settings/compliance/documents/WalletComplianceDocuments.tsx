import { Button, Card, Skeleton } from "antd";
import React, { useState } from "react";
import { EmptyDataWrapper } from "components/data/EmptyDataWrapper";
import { TComplianceDocument } from "features/payroll/types/compliance";
import { useGetDocumentsCompliance } from "features/payroll/hooks/compliance/document/useGetDocumentsCompliance";
import {
  SaveComplianceDocument,
  SaveComplianceDocumentBtn,
} from "./SaveComplianceDocument";
import ProgressBar from "features/home/components/ProgressBar";
import { AiOutlineEdit } from "react-icons/ai";
import { getAppropriateColorForStatus } from "utils/colorHelpers/getAppropriateColorForStatus";


type TAction = "edit";
const WalletComplianceDocuments: React.FC = () => {
  const { data, isLoading } = useGetDocumentsCompliance();
  const [action, setAction] = useState<TAction>();
  const [selected, setSelected] = useState<TComplianceDocument>();
  const handleAction = (action: TAction, selected?: TComplianceDocument) => {
    setAction(action);
    setSelected(selected);
  };
  const onClose = () => setAction(undefined);
  return (
    <>
      <SaveComplianceDocument
        handleClose={onClose}
        open={action === "edit"}
        data={{
          action: "edit",
          document: selected,
        }}
      />

      <Skeleton loading={isLoading} active paragraph={{ rows: 10 }}>
        <div className="space-y-6">
          {data && data?.length > 0 ?<div className="space-y-4">
            <p>Approval Status</p>
              <ProgressBar
                width={`${
                  (data?.filter((item) => item.approvalStatus === "approved")
                    .length /
                    data?.length) *
                  100
                }%`}
              />
          </div> : null}
          <EmptyDataWrapper
            emptyProps={{ description: "No Documents" }}
            isEmpty={!(data && data?.length > 0)}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-4">
              {data?.map(
                ({ approvalStatus, documentUrl, type, ...document }, i) => (
                  <Card key={i}>
                    <div className="flex justify-between">
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <p className="font-normal">
                            Name:
                            <a href={documentUrl} className="hover:underline text-caramel"><span className="text-sm ml-1 font-semibold capitalize">
                              {type}
                            </span></a>
                          </p>
                          <p className="font-normal">
                            Status:
                            <span className="text-sm ml-1 font-semibold capitalize" style={{color:getAppropriateColorForStatus(approvalStatus)}}>
                              {approvalStatus}
                            </span>
                          </p>
                          <Button
                            icon={<AiOutlineEdit />}
                            onClick={() =>
                              handleAction("edit", {
                                approvalStatus,
                                documentUrl,
                                type,
                                ...document,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )
              )}
            </div>
          </EmptyDataWrapper>
          <div className="flex justify-end">
            <SaveComplianceDocumentBtn />
          </div>
        </div>
      </Skeleton>
    </>
  );
};

export default WalletComplianceDocuments;
