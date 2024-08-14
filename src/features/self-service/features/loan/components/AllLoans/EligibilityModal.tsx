import { Modal } from "antd";
import { useEffect } from "react";
import { IModalProps } from "types";
import { useCheckEligibility } from "../../hooks/worthiness/useCheckEligibility";
import { ICheckEligibilityProps } from "../../types/worthiness";

type IProps = IModalProps & ICheckEligibilityProps;

export const EligibilityModal = ({
  open,
  handleClose,
  amount,
  paymentPlanId,
  typeId,
}: IProps) => {
  const { data, isLoading, isSuccess } = useCheckEligibility({
    amount,
    paymentPlanId,
    typeId,
  });
  
  console.log(data);

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
            <p className="text-lg text-green-500 pt-1">#100,000</p>
          </div>
          <div>
            <h3 className="text-base">Salary</h3>
            <p className="text-lg text-green-500 pt-1">#100,000</p>
          </div>
        </div>
        <div>2</div>
      </div>
    </Modal>
  );
};
