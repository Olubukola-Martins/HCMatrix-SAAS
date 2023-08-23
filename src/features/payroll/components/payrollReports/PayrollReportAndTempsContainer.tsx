import PageSubHeader from "components/layout/PageSubHeader";
import React, { useState } from "react";
import { Tabs } from "antd";

import { PayrollReportTemplateList } from "./templates/PayrollReportTemplateList";
import PayrollReportTable from "./PayrollReportTable";

export const PayrollReportAndTempsContainer = () => {
  const tabItems = [
    {
      key: "Templates",
      label: "Templates",
      children: (
        <PayrollReportTemplateList
          asset={{
            id: 1,
            name: "HP EliteBook",
            typeId: 3,
            status: "unassigned",
            imageUrl: "http://placeimg.com/640/480",
            uid: "A0016",
            serialNumber: "8.5.4",
            brand: "Hewlett Packard",
            model: "2019",
            cost: "247000.67",
            vendor: "Chibuzor & Sons",
            purchaseDate: "2022-08-16T00:00:00.000Z",
            color: "Black",
            description:
              "Officia eos ratione qui eum in libero dignissimos. Expedita nostrum necessitatibus qui quis dolores officiis voluptas error voluptatum. Ut nam ut voluptatum fugiat voluptate voluptatem deleniti.",
            assigneeId: null,
            dateAssigned: null,
            documentUrls: Array(12).fill(""),
            companyId: 1,
            createdAt: "2023-04-27T05:11:56.000Z",
            updatedAt: "2023-04-27T05:11:56.000Z",
            type: {
              id: 3,
              name: "Computer Accessories",
              label: "computer-accessories",
              companyId: 1,
              createdAt: "2023-04-27T04:56:26.000Z",
              updatedAt: "2023-04-27T04:56:26.000Z",
            },
            assigneeHistory: [],
          }}
        />
      ),
    },
    {
      key: "Reports",
      label: "Reports",
      children: <PayrollReportTable />,
    },
  ];
  return (
    <>
      <div className="flex flex-col gap-6">
        {/* <NewTransfer open={showM} handleClose={() => setShowM(false)} /> */}
        <PageSubHeader
          description={`You can now manage payroll reports and their parent templates.`}
          actions={[
            {
              name: "New Template",
              handleClick: () => {},
            },
            { name: "Create Report", handleClick: () => {} },
          ]}
        />
        <Tabs items={tabItems} />
      </div>
    </>
  );
};
