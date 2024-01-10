import { Divider, Modal, Skeleton } from "antd";
import LogoHeading from "components/LogoHeading";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { INVOICE_QUOTATION_BOTTOM_INFO } from "features/billing/constants";
import { useGetSubsciptionBillingDetails } from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { TCompanySubscriptionBillingDetail } from "features/billing/types/company/billingDetails/companySubscriptionBillingDetail";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import moment from "moment";
import React, { useRef } from "react";
import ReactToPrint from "react-to-print";
import { IModalProps } from "types";
interface IProps extends IModalProps {
  subscription?: TCompanySubscription;
}

const BillingInvoice: React.FC<IProps> = ({
  open,
  handleClose,
  subscription,
}) => {
  const { data: billingDetail, isLoading } = useGetSubsciptionBillingDetails();
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
            <PrintBtn
              subscription={subscription}
              billingDetail={billingDetail}
            />
          </div>
        </div>
        <BillingInvoiceInfo
          billingDetail={billingDetail}
          subscription={subscription}
        />
      </Skeleton>
    </Modal>
  );
};
const PrintBtn: React.FC<{
  subscription?: TCompanySubscription;
  billingDetail?: TCompanySubscriptionBillingDetail;
}> = ({ subscription, billingDetail }) => {
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
          <BillingInvoiceInfo
            billingDetail={billingDetail}
            subscription={subscription}
          />
        </div>
      </div>
    </>
  );
};
const BillingInvoiceInfo: React.FC<{
  subscription?: TCompanySubscription;
  billingDetail?: TCompanySubscriptionBillingDetail;
}> = ({ subscription, billingDetail }) => {
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex justify-between items-end">
        <LogoHeading title="Invoice" />
      </div>
      {/* billing info */}
      <div className="flex flex-col gap-y-2">
        <div>
          <span>To</span> <br /> <span>{billingDetail?.billingName}</span>{" "}
        </div>

        <div>
          <span>{billingDetail?.address.streetAddress}</span>
          <br />
          <span>{billingDetail?.address.state.name}</span>
          <br />
          <span>{billingDetail?.address.country.name}</span>
        </div>
      </div>
      {/* details */}
      <div className="flex justify-between ">
        <div>
          <h6 className="font-semibold">Details</h6>
          {[
            { name: "Tenant ID", value: "0001" },
            { name: "Customer ID", value: "00001" },
            { name: "Quotation ID", value: "00001" },
            { name: "Quotation Date", value: "August 02, 2022" },
          ].map(({ name, value }, i) => (
            <div className="flex gap-2">
              <span>{name}</span>
              <span>______________</span> <span>{value}</span>
            </div>
          ))}
        </div>
        <div>
          <h6 className=" uppercase font-semibold">HR Management Software</h6>
          <p>
            Summary for{" "}
            {moment(subscription?.startDate).format("MMMM DD, YYYY")} -{" "}
            {moment(subscription?.endDate).format("MMMM DD, YYYY")}
          </p>
          <Divider className="my-1 border-slate-400" />
          <div>
            {[
              { name: "Starting Balance", value: "$0" },
              { name: "Total New Activity", value: "$0" },
              { name: "Total Payments Received", value: "$0" },
              { name: "Quotation Date", value: "August 02, 2022" },
            ].map(({ name, value }, i) => (
              <div className="flex gap-2">
                <span>{name}</span>
                <span>:</span> <span>{value}</span>
              </div>
            ))}
          </div>
          <Divider className="my-1 border-slate-400" />
          <div className="flex gap-2 mt-2">
            <span>Ending Balance in USD</span>
            <span>:</span> <span>{`$0`}</span>
          </div>
        </div>
      </div>

      {/* table info */}
      <div>
        <Divider className="my-1 border-slate-700" />
        {/* waring info */}
        <div className="text-xs mt-2 mb-10">
          <span>This is not a bill</span>
          <br />
          <span>
            This is a summary of billing activity for the time period of
            quotation request.
          </span>
        </div>
        <TableInfo
          data={[
            {
              desc: "Licensed User(s)",
              qty: subscription?.licensedEmployeeCount ?? 0,
              unitPrice: "_",
              totalAmount: "_",
            },
            {
              desc: "Unlicensed User(s)",
              qty: subscription?.unlicensedEmployeeCount ?? 0,
              unitPrice: "_",
              totalAmount: "_",
            },
            {
              desc: "Storage",
              qty: "_",
              unitPrice: "_",
              totalAmount: "_",
            },
            {
              desc: "Employee Management",
              qty: "_",
              unitPrice: "_",
              totalAmount: "_",
            },
            {
              desc: "Payroll",
              qty: "_",
              unitPrice: "_",
              totalAmount: "_",
            },
            {
              desc: "Time and Attendance",
              qty: "_",
              unitPrice: "_",
              totalAmount: "_",
            },
          ]}
        />

        <Divider className="my-1 border-slate-700" />

        <div className="flex justify-end mt-4">
          <table className="w-2/5">
            <tbody>
              {[
                { name: "Total", value: "0001", capitalize: true },
                { name: "VAT 0%", value: "00001" },
                { name: "Discount", value: "00001" },
                {
                  name: "TOTAL INCLUDING VAT",
                  value: "August 02, 2022",
                  capitalize: true,
                },
              ].map(({ name, value, capitalize }, i) => (
                <tr key={i} className="pb-6">
                  <td>
                    <h6
                      className={`font-light text-sm ${
                        capitalize ? "capitalize" : "uppercase"
                      }`}
                    >
                      {name}
                    </h6>
                  </td>
                  <td>
                    <p className={`font-bold text-right`}>{value}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* sub balance expiry date */}
      <div className={`flex gap-x-4 items-center`}>
        <td>
          <h6 className={`font-light text-sm capitalize`}>
            Subscription Balance expire date
          </h6>
        </td>
        <td>
          <p className={`font-bold text-right`}>
            {moment(subscription?.endDate).format(DEFAULT_DATE_FORMAT)}
          </p>
        </td>
      </div>
      {/* quote info */}
      <p className="text-xs">{INVOICE_QUOTATION_BOTTOM_INFO}</p>
    </div>
  );
};

const TableInfo: React.FC<{
  data?: {
    desc: string;
    qty: number | string;
    unitPrice: string;
    totalAmount: string;
  }[];
}> = ({ data }) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
        <thead className=" text-gray-700 capitalize">
          <tr>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Unit Price
            </th>
            <th scope="col" className="px-6 py-3">
              Total Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map(({ desc, qty, totalAmount, unitPrice }, i) => (
            <tr key={i} className="bg-white border-b">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {desc}
              </th>
              <td className="px-6 py-4">{qty}</td>
              <td className="px-6 py-4">{unitPrice}</td>
              <td className="px-6 py-4">{totalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingInvoice;
