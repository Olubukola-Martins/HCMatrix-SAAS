import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { PageIntro } from "../../../../Layout/Components/PageIntro";
import DashboardLayout from "../../../../Layout/DashboardLayout";
import type { ColumnsType } from "antd/es/table";
import { Dropdown, Menu, Space, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { AddDelegation } from "../../../Components/Organization/Delegations/AddDelegation";

interface DataType {
  key: React.Key;
  delegator: string;
  delegatee: string;
  type: string;
  action: any;
}

const columns: ColumnsType<DataType> = [
  {
    title: "Delegator",
    dataIndex: "delegator",
  },
  {
    title: "Delegatee",
    dataIndex: "delegatee",
  },
  {
    title: "Delegation Type",
    dataIndex: "type",
  },
  {
    title: "Action",
    dataIndex: "action",
    // render: () => (
    //   <Dropdown
    //     trigger={["click"]}
    //     overlay={
    //       <Menu>
    //         <Menu.Item>item 1</Menu.Item>
    //         <Menu.Item>item 2</Menu.Item>
    //       </Menu>
    //     }
    //   >
    //     More <DownOutlined />
    //   </Dropdown>
    // ),
  },
];

const data: DataType[] = [];

for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    delegator: "Edward King",
    delegatee: "Godswill Smile",
    type: "Permanent",
    action: "Action",
  });
}

const Delegation = () => {
  const [addDelegationModal, setAddDelegationModal] = useState(false);
  return (
    <DashboardLayout>
      <AddDelegation
        open={addDelegationModal}
        handleClose={() => setAddDelegationModal(false)}
      />
      <div className="Container">
        <div className="mt-4">
          <PageIntro title="Delegations" link="/settings" />
          <div className="flex justify-end mb-5 mt-2">
            <button
              className="button"
              onClick={() => setAddDelegationModal(true)}
            >
              Add delegation
            </button>
          </div>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    </DashboardLayout>
  );
};

export default Delegation;
