import { Divider, Modal, Skeleton } from "antd";
import { hcMatrixLogo } from "assets/images";
import { DEFAULT_DATE_FORMAT } from "constants/dateFormats";
import { INVOICE_QUOTATION_BOTTOM_INFO } from "features/billing/constants";
import { useGetSubsciptionBillingDetails } from "features/billing/hooks/company/billingDetail/useGetSubsciptionBillingDetails";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import moment from "moment";
import React from "react";
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
      title={
        <div className="flex items-center justify-between">
          <h5 className="font-semibold text-lg">Billing Invoice</h5>
        </div>
      }
    >
      <Skeleton loading={isLoading} active paragraph={{ rows: 24 }}>
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-y-3">
              <img src={hcMatrixLogo} alt="hcmatrix logo" className="h-8" />
              <h4 className="font-semibold text-lg">Invoice</h4>
            </div>

            <button className="rounded-full  bg-white shadow-md flex justify-center items-center">
              <i className="ri-download-2-line px-2 py-2" />
            </button>
          </div>
          {/* billing info */}
          <div>
            <span>To</span> <br /> <span>{billingDetail?.billingName}</span>{" "}
            <br />
            <br /> <span>{billingDetail?.address.streetAddress}</span>
            <br />
            <span>{billingDetail?.address.state.name}</span>
            <br />
            <span>{billingDetail?.address.country.name}</span>
          </div>
          {/* details */}
          <div className="flex justify-between items-center">
            <div>
              <h6>Details</h6>
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
              <h6 className="font-semibold">HR Management Software</h6>
              <p>
                Summary for{" "}
                {moment(subscription?.startDate).format("MMMM DD, YYYY")} -{" "}
                {moment(subscription?.endDate).format("MMMM DD, YYYY")}
              </p>
              <Divider />
              <div>
                {[
                  { name: "Tenant ID", value: "0001" },
                  { name: "Customer ID", value: "00001" },
                  { name: "Quotation ID", value: "00001" },
                  { name: "Quotation Date", value: "August 02, 2022" },
                ].map(({ name, value }, i) => (
                  <div className="flex gap-2">
                    <span>{name}</span>
                    <span>:</span> <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Divider />
          {/* waring info */}
          <div>
            <span>This is not a bill</span>
            <span>
              This is a summary of billing activity for the time period of
              quotation request.
            </span>
          </div>

          {/* table info */}
          <div>
            <TableInfo />

            <Divider />
            <div className="flex justify-end">
              <table className="w-2/5">
                <tbody>
                  {[
                    { name: "Total", value: "0001" },
                    { name: "Vat", value: "00001" },
                    { name: "Quotation ID", value: "00001" },
                    { name: "Quotation Date", value: "August 02, 2022" },
                  ].map(({ name, value }, i) => (
                    <tr key={i} className="pb-6">
                      <td>
                        <h6 className={`font-light text-sm capitalize`}>
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
          <p>{INVOICE_QUOTATION_BOTTOM_INFO}</p>
        </div>
      </Skeleton>
    </Modal>
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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
