import { Table } from "antd";
import { useState } from "react";
import { RequestDocumentModal } from "./RequestDocumenttModal";


export const RequestDocument = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      document: "Passport",
      fileType: "PDF",
      maximumSize: "5 MB",
    },
  ]);

  const columns = [
    {
      title: "Document",
      dataIndex: "document",
      key: "document",
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType",
    },
    {
      title: "Maximum Size",
      dataIndex: "maximumSize",
      key: "maximumSize",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: any, val: any, index: number) => (
        <div className="flex gap-3 items-center">
          <i
            className="ri-delete-bin-line text-xl cursor-pointer hover:text-caramel"
            onClick={() => handleDelete(index)}
          ></i>
          <i
            className="ri-pencil-line text-xl cursor-pointer hover:text-caramel"
            onClick={() => handleEdit(index)}
          ></i>
        </div>
      ),
    },
  ];

  const handleFormSubmit = (values: any) => {
    const newDocument = {
      key: editIndex !== null ? editIndex + 1 : dataSource.length + 1,
      document: values.document,
      fileType: values.fileType.join(", "),
      maximumSize: `${values.maxSize} ${values.sizeType.toUpperCase()}`,
    };

    if (editIndex !== null) {
      const newData = [...dataSource];
      newData[editIndex] = newDocument;
      setDataSource(newData);
      setEditIndex(null);
    } else {
      setDataSource([...dataSource, newDocument]);
    }

    setOpenModal(false);
    
  };

  const handleDelete = (index: number) => {
    const newData = dataSource.filter((_, i) => i !== index);
    setDataSource(newData);
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
    setOpenModal(true);
  };

  const initialValues =
    editIndex !== null
      ? {
          document: dataSource[editIndex].document,
          fileType: dataSource[editIndex].fileType.split(", "),
          maxSize: parseInt(dataSource[editIndex].maximumSize),
          sizeType: dataSource[editIndex].maximumSize
            .split(" ")[1]
            .toLowerCase(),
        }
      : {};

  return (
    <div className="Container">
      <p className="p-y text-base mb-3">
        Define required documents needed from hired candidates
      </p>
      <button
        onClick={() => setOpenModal(true)}
        className="p-2 my-4 border border-[#686868] rounded"
      >
        + Add Document
      </button>
      <RequestDocumentModal
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setEditIndex(null);
        }}
        handleSubmit={handleFormSubmit}
        initialValues={initialValues}
      />
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};
