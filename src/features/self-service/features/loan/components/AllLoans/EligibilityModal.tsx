import { Modal } from "antd";
import { IModalProps } from "types";
import { ICheckEligibility } from "../../types/worthiness";

type IProps = IModalProps & ICheckEligibility;

export const EligibilityModal = ({
  open,
  handleClose,
  deduction,
  interest,
  salary,
  loanAmount,
  paymentPeriod,
}: IProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title={"Loan Calculator"}
      style={{ top: 20 }}
    >
      <hr />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-gray-600">
        <div className="border-r flex flex-col gap-2">
          <div>
            <h3 className="text-base">Salary</h3>
            <p className="text-lg text-green-500 pt-1">{salary}</p>
          </div>
          <div>
            <h3 className="text-base">Loan Amount</h3>
            <p className="text-lg text-green-500 pt-1">
              {loanAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-base">Payment Period</h3>
            <p className="text-lg pt-1">{paymentPeriod?.name}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <h3 className="text-base">Interest</h3>
            <p className="text-lg text-green-500 pt-1">
              {interest.toLocaleString()}
            </p>
          </div>
          <div>
            <h3 className="text-base">Deduction (%)</h3>
            <p className="text-lg text-green-500 pt-1">
              {deduction?.percentage}
            </p>
          </div>
          <div>
            <h3 className="text-base">Deduction Amount</h3>
            <p className="text-lg pt-1 text-green-500">
              {deduction?.amount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
