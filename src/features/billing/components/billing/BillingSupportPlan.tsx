import { Modal, Skeleton } from "antd";
import LogoHeading from "components/LogoHeading";
import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
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
        <div className="relative">
          <div className="absolute right-0 top-8">
            <PrintBtn subscription={subscription} />
          </div>
        </div>
        <SupportInfo subscription={subscription} />
      </Skeleton>
    </Modal>
  );
};

const PrintBtn: React.FC<{
  subscription?: TCompanySubscription;
}> = ({ subscription }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <ReactToPrint
        trigger={() => {
          return (
            <button className="rounded-full  bg-white shadow-md flex justify-center items-center">
              <i className="ri-download-2-line px-2 py-2" />
            </button>
          );
        }}
        content={() => componentRef.current}
        bodyClass={"w-full justify-stretch items-center"}
      />
      <div className="hidden">
        <div ref={componentRef} className="w-full px-4 py-5">
          <SupportInfo subscription={subscription} />
        </div>
      </div>
    </>
  );
};
const SupportInfo: React.FC<{ subscription?: TCompanySubscription }> = ({
  subscription,
}) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between items-end">
        <LogoHeading title="Support Plan" />
      </div>

      {/* table info */}
      <div>
        <TableInfo
          data={[
            {
              feature: "Price",
              liteSupport: "$0",
              enterpriseSupport: "$0",
            },
            {
              feature: "User Guide",
              liteSupport: "Yes",
              enterpriseSupport: "Yes",
            },
            {
              feature: "Number of Users",
              liteSupport: "All Customers",
              enterpriseSupport: "All Customers",
            },
            {
              feature: "Response Time (by email)",
              liteSupport: "_",
              enterpriseSupport: "_",
            },
            {
              feature: "Phone Support",
              liteSupport: "Available",
              enterpriseSupport: "Available",
            },
            {
              feature: "Live Chat Support",
              liteSupport: "Available",
              enterpriseSupport: "Available",
            },
            {
              feature: "Technical Account Manager",
              liteSupport: "Available",
              enterpriseSupport: "Available",
            },
            {
              feature: "Training",
              liteSupport: "Paid",
              enterpriseSupport: "4 hours",
            },
          ]}
        />
      </div>
    </div>
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className=" text-gray-700 capitalize">
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
            <tr key={i} className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
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
