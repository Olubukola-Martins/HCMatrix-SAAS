import { DatePicker, Drawer, Form, Select } from "antd";
import Themes from "components/Themes";
import { IModalProps } from "types";
import { AppButton } from "components/button/AppButton";
import { TWalletTransactionFilterProps } from "features/payroll/types/payrollWallet";
import {
  WALLET_TRANSACTION_STATUSES,
  WALLET_TRANSACTION_TYPES,
} from "features/payroll/constants";

interface IProps extends IModalProps {
  handleFilter: (props: TWalletTransactionFilterProps) => void;
}

const FilterWalletTransactions = ({
  handleClose,
  open,
  handleFilter,
}: IProps) => {
  const [form] = Form.useForm<TWalletTransactionFilterProps>();
  const handleSubmit = (data: TWalletTransactionFilterProps) => {
    handleFilter(data);
  };
  return (
    <Drawer open={open} onClose={() => handleClose()} title="Filter">
      <Themes>
        <Form
          requiredMark={false}
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
        >
          <Form.Item name={"type"} label="Transaction Type">
            <Select
              placeholder="Select"
              options={WALLET_TRANSACTION_TYPES.map((item) => ({
                label: <span className="capitalize">{item}</span>,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item name={"status"} label="Status">
            <Select
              placeholder="Select"
              options={WALLET_TRANSACTION_STATUSES.map((item) => ({
                label: <span className="capitalize">{item}</span>,
                value: item,
              }))}
            />
          </Form.Item>
          <Form.Item name={"date"} label="Date">
            <DatePicker.RangePicker
              placeholder={["From", "To"]}
              className="w-full"
            />
          </Form.Item>

          <div className="flex justify-between items-center">
            <AppButton
              label="Clear"
              type="button"
              variant="transparent"
              handleClick={() => {
                form.resetFields();
                handleFilter({});
              }}
            />
            <AppButton label="Apply " type="submit" />
          </div>
        </Form>
      </Themes>
    </Drawer>
  );
};

export default FilterWalletTransactions;
