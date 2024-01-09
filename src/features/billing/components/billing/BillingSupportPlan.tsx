import { Divider, Modal, Skeleton } from "antd";
import { hcMatrixLogo } from "assets/images";
import { useGetSubsciptionBillingDetails } from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import React from "react";
import { IModalProps } from "types";
interface IProps extends IModalProps {
  subscription?: TCompanySubscription;
}

const BillingSupportPlan: React.FC<IProps> = ({ open, handleClose }) => {
  const { data: subscription, isLoading } = useGetCompanyActiveSubscription();
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      style={{ top: 5 }}
      width={`70%`}
      title={null}
    >
      <Skeleton loading={isLoading} active paragraph={{ rows: 24 }}>
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-y-3">
              <img src={hcMatrixLogo} alt="hcmatrix logo" className="h-8" />
              <h4 className="bold text-xl">Support Plan</h4>
            </div>

            <button className="rounded-full  bg-white shadow-md flex justify-center items-center">
              <i className="ri-download-2-line px-2 py-2" />
            </button>
          </div>

          {/* table info */}
          <div>
            <TableInfo />

            <Divider />
          </div>
        </div>
      </Skeleton>
    </Modal>
  );
};

const TableInfo: React.FC<{
  data?: {
    feature: string;
    liteSupport: string;
    enterpriseSupport: string;
  }[];
}> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Features
            </th>
            <th scope="col" className="px-6 py-3">
              Lite Support
            </th>
            <th scope="col" className="px-6 py-3">
              Enterprise Support
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ feature, liteSupport, enterpriseSupport }, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {feature}
              </th>
              <td className="px-6 py-4">{liteSupport}</td>
              <td className="px-6 py-4">{enterpriseSupport}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingSupportPlan;
