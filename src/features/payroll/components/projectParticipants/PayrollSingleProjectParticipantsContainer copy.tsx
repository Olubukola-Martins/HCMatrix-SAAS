import { Form, InputNumber, Popconfirm, Table } from "antd";
import type { FormInstance } from "antd/es/form";

import React, { useContext, useEffect, useRef, useState } from "react";

interface IProps {
  participants?: DataType[];
}

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  amount: number;
  exchangeRate: { currency: string; rate: number };
  equivalent?: number;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<any>(null);
  const form = useContext(EditableContext)!;

  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();

      toggleEdit();
      handleSave({
        ...record,
        ...values,
        equivalent: record.exchangeRate.rate * values.amount,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
            type: "number",
          },
        ]}
      >
        <InputNumber ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

type EditableTableProps = Parameters<typeof Table>[0];

interface DataType {
  key: React.Key;
  empuid: string;
  name: string;
  amount: number;
  exchangeRate: { currency: string; rate: number };
  equivalent?: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const PayrollSingleProjectParticipantsContainer: React.FC<IProps> = ({
  participants = [],
}) => {
  const [dataSource, setDataSource] = useState<DataType[]>([]); //TO DO: Refactor to useEffect popultion
  useEffect(() => {
    const data = participants.map((item) => ({
      ...item,
      equivalent: item.amount * item.exchangeRate.rate,
    }));
    setDataSource(data);
  }, [participants]);
  const [count, setCount] = useState(2);

  const handleDelete = (key: React.Key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns: (ColumnTypes[number] & {
    editable?: boolean;
    dataIndex: string;
  })[] = [
    {
      title: "Emp Num",
      dataIndex: "empuid",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Gross Income (NGN)",
      dataIndex: "amount",
      width: "40%",
      editable: true,
    },
    {
      title: "Exchange Rate",
      dataIndex: "exchangeRate",
      render: (_, val) => (val as DataType).exchangeRate.currency,
      editable: false,
    },
    {
      title: "Currency Equivalent",
      dataIndex: "equivalent",
      editable: false,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record: unknown) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title=""
            onConfirm={() => handleDelete((record as DataType).key)}
          >
            <span>Edit by clickin on row</span>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleSave = (row: DataType) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div className="flex flex-col gap-4">
      <Table
        size={"small"}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
    </div>
  );
};
