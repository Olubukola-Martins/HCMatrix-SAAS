import { Form, InputNumber, Popconfirm, Table, Tag } from "antd";
import type { FormInstance } from "antd/es/form";
import { AppButton } from "components/button/AppButton";
import { DeleteFilled } from "@ant-design/icons";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TTaxPolicyCreatorProps } from "./TaxPolicyCreator";
import { AddSalaryComponentForm } from "../salaryComponents/AddSalaryComponent";

const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  amount: number;
  taxRate: number;
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
      handleSave({ ...record, ...values });
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
  name: string;
  amount: number;
  taxRate: number;
}

type ColumnTypes = Exclude<EditableTableProps["columns"], undefined>;

export const TaxUIFormulaForm: React.FC<TTaxPolicyCreatorProps> = ({
  dependencies = [],
}) => {
  const [dataSource, setDataSource] = useState<DataType[]>([
    {
      key: "0",
      name: "First",
      amount: 300000,
      taxRate: 7,
    },
    {
      key: "1",
      name: "Next",
      amount: 300000,
      taxRate: 11,
    },
  ]);

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
      title: "",
      dataIndex: "name",
    },
    {
      title: "Annual Income (NGN)",
      dataIndex: "amount",
      width: "60%",
      editable: true,
    },
    {
      title: "Income Tax Rate",
      dataIndex: "taxRate",
      editable: true,
    },
    {
      title: "",
      dataIndex: "operation",
      render: (_, record: unknown) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete((record as DataType).key)}
          >
            <DeleteFilled />
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData: DataType = {
      key: count,
      name: `Next`,
      amount: 0,
      taxRate: 0,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

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
      <div className="mb-6 flex flex-col gap-4 px-4 border rounded-md">
        <h4 className="">
          Taxable Income : 0 (add btn to add/edi taxable_income)
        </h4>
      </div>
      <Table
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns as ColumnTypes}
      />
      <AppButton
        label="Add a row"
        handleClick={handleAdd}
        type="button"
        variant="transparent"
      />
    </div>
  );
};
