import React from "react";
import BillingsHistoryTable from "../BillingHistoryTable";

const BillingHistoryContainer = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold text-lg">Billing History</p>
      <BillingsHistoryTable />
    </div>
  );
};

export default BillingHistoryContainer;
