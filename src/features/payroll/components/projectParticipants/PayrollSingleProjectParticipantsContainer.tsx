import { Button, Form, Input, InputNumber, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useState } from "react";

import { TProjectParticipantTableEntry } from "features/payroll/types/payrollSchemes";

interface IProps {
  data?: TProjectParticipantTableEntry[];
  loading?: boolean;
  handleParticipants: {
    fn: (props: {
      projectParticipantId: number;
      employeeId: number;
      grossPay: number;
    }) => void;
    loading?: boolean;
  };
  baseCurrency?: string;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number";
  record: TProjectParticipantTableEntry;
  index: number;
  children: React.ReactNode;
}
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === "number" ? (
      <InputNumber
        value={record.grossPay}
        placeholder="Gross Pay"
        className="w-full"
      />
    ) : (
      <Input />
    );

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export const PayrollSingleProjectParticipantsContainer = ({
  data = [],
  loading,
  handleParticipants,
  baseCurrency,
}: IProps) => {
  const [form] = Form.useForm();

  const [editingKey, setEditingKey] = useState<number>();
  const isEditing = (record: TProjectParticipantTableEntry) =>
    record.employeeId === editingKey;
  const edit = (record: Partial<TProjectParticipantTableEntry>) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.employeeId);
  };

  const cancel = () => {
    setEditingKey(undefined);
  };
  const save = async (key: React.Key) => {
    try {
      const row =
        (await form.validateFields()) as TProjectParticipantTableEntry;

      const member = data?.find(
        (item) => item.employeeId === key
      ) as unknown as TProjectParticipantTableEntry;

      handleParticipants.fn({
        employeeId: member.employeeId,
        grossPay: row.grossPay,
        projectParticipantId: member.id,
      });
      cancel();
    } catch (errInfo) {
    }
  };
  const columns: ColumnsType<TProjectParticipantTableEntry> = [
    {
      title: "Employee Id",
      dataIndex: "empuid",
      key: "empuid",
      render: (_, item) => item.empuid,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => item.name,
    },
    {
      title: `Gross Income (${baseCurrency ?? ""})`,
      dataIndex: "grossPay",
      key: "grossPay",
      width: "25%",
      render: (_, item) => item.grossPay,
    },
    {
      title: "Exchange Rate",
      dataIndex: "exchangeRate",
      key: "exchangeRate",
      render: (_, item) => item.exchangeRate.currency,
    },
    {
      title: "Currency Equivalent",
      dataIndex: "equivalent",
      key: "equivalent",
      render: (_, item) => item.grossPay * item.exchangeRate.rate,
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        const editable = isEditing(item);
        return editable ? (
          <div className="flex gap-4">
            <Button
              onClick={() => save(item.employeeId)}
              type="text"
              loading={
                handleParticipants.loading && editingKey === item.employeeId
              }
            >
              <span className="capitalize text-caramel cursor-pointer">
                Save
              </span>
            </Button>
            <Button onClick={() => cancel()} type="text">
              <span>Cancel</span>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 text-lg">
            {!editingKey ? (
              <i
                className="ri-pencil-line cursor-pointer hover:text-caramel"
                onClick={() => edit(item)}
              />
            ) : (
              <>
                <i className="ri-pencil-line cursor-not-allowed text-slate-200" />
              </>
            )}
          </div>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (col.key !== "grossPay") {
      return col;
    }
    return {
      ...col,
      onCell: (record: TProjectParticipantTableEntry) => ({
        record,
        inputType: col.key === "grossPay" ? "number" : null,
        dataIndex: col.key,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        columns={mergedColumns as any}
        size="small"
        dataSource={data}
        loading={loading}
      />
    </Form>
  );
};
