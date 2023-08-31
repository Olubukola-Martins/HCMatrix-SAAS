import { Select, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";

const CandidateSources = () => {
  interface NumberOfType {
    numberOf: number;
  }

  // TABLE 1 DATA
  //Table Data Interface
  type DataSourceItemFirstTb = {
    key: React.Key;
    sources: string;
    views: NumberOfType;
    newCandidates: NumberOfType;
    putOnHold: NumberOfType;
    scheduledInterview: NumberOfType;
    hired: NumberOfType;
    references: NumberOfType;
  };
  const columnsFirstTb: ColumnsType<DataSourceItemFirstTb> = [
    { key: "sources", title: "Sources", dataIndex: "sources" },
    {
      key: "views",
      title: "Views",
      dataIndex: "views",
      render: (views) => `${views.numberOf} (${views.numberOf}%)`,
    },
    {
      key: "newCandidates",
      title: "New Candidates",
      dataIndex: "newCandidates",
      render: (newCandidates) =>
        `${newCandidates.numberOf} (${newCandidates.numberOf}%)`,
    },
    {
      key: "putOnHold",
      title: "Put On Hold",
      dataIndex: "putOnHold",
      render: (putOnHold) => `${putOnHold.numberOf} (${putOnHold.numberOf}%)`,
    },
    {
      key: "scheduledInterview",
      title: "Scheduled Interview",
      dataIndex: "scheduledInterview",
      render: (scheduledInterview) =>
        `${scheduledInterview.numberOf} (${scheduledInterview.numberOf}%)`,
    },
    {
      key: "hired",
      title: "Hired",
      dataIndex: "hired",
      render: (hired) => `${hired.numberOf} (${hired.numberOf}%)`,
    },
    {
      key: "references",
      title: "References",
      dataIndex: "references",
      render: (references) =>
        `${references.numberOf} (${references.numberOf}%)`,
    },
  ];

  const sourcesListFirstTb = ["LinkedIn", "Others"];
  // Table1 dataSource
  const dataSourceFirstTb: DataSourceItemFirstTb[] = [];
  for (let i: number = 0; i < 2; i++) {
    dataSourceFirstTb.push({
      key: i,
      sources: sourcesListFirstTb[i],
      views: {
        numberOf: 0,
      },
      newCandidates: {
        numberOf: 0,
      },
      putOnHold: {
        numberOf: 0,
      },
      scheduledInterview: {
        numberOf: 0,
      },
      hired: {
        numberOf: 0,
      },
      references: {
        numberOf: 0,
      },
    });
  }

  // TABLE 2 DATA
  //Table Data Interface
  type DataSourceItemSecondTb = {
    key: React.Key;
    sources: string;
    notFit: NumberOfType;
    declinedOffer: NumberOfType;
    notQualified: NumberOfType;
    overQualified: NumberOfType;
    hiredElsewhere: NumberOfType;
  };
  const columnsSecondTb: ColumnsType<DataSourceItemSecondTb> = [
    { key: "sources", title: "Sources", dataIndex: "sources" },
    {
      key: "notFit",
      title: "Not Fit",
      dataIndex: "notFit",
      render: (notFit) => `${notFit.numberOf} (${notFit.numberOf}%)`,
    },
    {
      key: "declinedOffer",
      title: "Declined Offer",
      dataIndex: "declinedOffer",
      render: (declinedOffer) =>
        `${declinedOffer.numberOf} (${declinedOffer.numberOf}%)`,
    },
    {
      key: "notQualified",
      title: "Not Qualified",
      dataIndex: "notQualified",
      render: (notQualified) =>
        `${notQualified.numberOf} (${notQualified.numberOf}%)`,
    },
    {
      key: "overQualified",
      title: "Over Qualified",
      dataIndex: "overQualified",
      render: (overQualified) =>
        `${overQualified.numberOf} (${overQualified.numberOf}%)`,
    },
    {
      key: "hiredElsewhere",
      title: "Hired Elsewhere",
      dataIndex: "hiredElsewhere",
      render: (hiredElsewhere) =>
        `${hiredElsewhere.numberOf} (${hiredElsewhere.numberOf}%)`,
    },
  ];

  const sourcesListSecondTb = ["LinkedIn", "Others"];
  // Table dataSource
  const dataSourceSecondTb: DataSourceItemSecondTb[] = [];
  for (let i: number = 0; i < 2; i++) {
    dataSourceSecondTb.push({
      key: i,
      sources: sourcesListSecondTb[i],
      notFit: {
        numberOf: 0,
      },
      declinedOffer: {
        numberOf: 0,
      },
      notQualified: {
        numberOf: 0,
      },
      overQualified: {
        numberOf: 0,
      },
      hiredElsewhere: {
        numberOf: 0,
      },
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {/* first table */}
        <div>
          <h2>
            This demonstrates how successful sources are in turning candidates
            into employees.
          </h2>
          <Select
            className="w-40 mt-4"
            defaultValue="statuses"
            placeholder="Please select"
            dropdownMatchSelectWidth={false}
            // onChange={handleChange}
            options={[
              {
                value: "statuses",
                label: "Statuses (4)",
              },
            ]}
          />
          {/* TABLE 1*/}
          <Table
            className="mt-8"
            columns={columnsFirstTb}
            dataSource={dataSourceFirstTb}
            scroll={{ x: 900 }}
            summary={(pageData) => {
              let totalViews = 0;
              let totalNewCandidates = 0;
              let totalPutOnHold = 0;
              let totalScheduledInterview = 0;
              let totalHired = 0;
              let totalReferences = 0;

              pageData.forEach(
                ({
                  views,
                  newCandidates,
                  putOnHold,
                  scheduledInterview,
                  hired,
                  references,
                }) => {
                  totalViews += views.numberOf;
                  totalNewCandidates += newCandidates.numberOf;
                  totalPutOnHold += putOnHold.numberOf;
                  totalScheduledInterview += scheduledInterview.numberOf;
                  totalHired += hired.numberOf;
                  totalReferences += references.numberOf;
                }
              );
              return (
                <>
                  <Table.Summary.Row className="font-bold">
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {totalViews}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      {totalNewCandidates}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      {totalPutOnHold}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      {totalScheduledInterview}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      {totalHired}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={6}>
                      {totalReferences}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>

        {/* second table */}
        <div>
          <div className="w-full h-px bg-gray-300"></div>
          <h2 className="mt-6 text-lg">Not Hired Candidates</h2>
          <h3 className="mt-4">
            This displays the final position of each inactive candidate in your
            status workflow, as indicated by the source.
          </h3>
          <Select
            className="w-40 mt-4"
            defaultValue="statuses"
            placeholder="Please select"
            dropdownMatchSelectWidth={false}
            // onChange={handleChange}
            options={[
              {
                value: "statuses",
                label: "Statuses (4)",
              },
            ]}
          />
          <Table
            className="mt-8"
            columns={columnsSecondTb}
            dataSource={dataSourceSecondTb}
            scroll={{ x: 900 }}
            summary={(pageData) => {
              let totalNotFit = 0;
              let totalDeclinedOffer = 0;
              let totalNotQualified = 0;
              let totalOverQualified = 0;
              let totalHiredElsewhere = 0;

              pageData.forEach(
                ({
                  notFit,
                  declinedOffer,
                  notQualified,
                  overQualified,
                  hiredElsewhere,
                }) => {
                  totalNotFit += notFit.numberOf;
                  totalDeclinedOffer += declinedOffer.numberOf;
                  totalNotQualified += notQualified.numberOf;
                  totalOverQualified += overQualified.numberOf;
                  totalHiredElsewhere += hiredElsewhere.numberOf;
                }
              );
              return (
                <>
                  <Table.Summary.Row className="font-bold">
                    <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      {totalNotFit}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      {totalDeclinedOffer}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={3}>
                      {totalNotQualified}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={4}>
                      {totalOverQualified}
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={5}>
                      {totalHiredElsewhere}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default CandidateSources;
