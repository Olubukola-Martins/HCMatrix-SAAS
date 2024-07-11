import { useState } from "react";
import { Table } from "antd";
import { ConfigureScoreForm } from "./ConfigureScoreForm";
import { INTERVIEW_STAGE_SETTINGS_SCORES } from "../../constants/defaultOtherSettings";

export const ConfigureScoreTable = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [dataSource, setDataSource] = useState(INTERVIEW_STAGE_SETTINGS_SCORES);

  const columns = [
    {
      title: "Score Title",
      dataIndex: "scoreTitle",
      key: "scoreTitle",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
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

  const handleTableFormSubmit = (values: any) => {
    const newScore = {
      key: editIndex !== null ? editIndex + 1 : dataSource.length + 1,
      scoreTitle: values.scores[0].scoreTitle,
      score: values.scores[0].score,
    };

    if (editIndex !== null) {
      const newData = [...dataSource];
      newData[editIndex] = newScore;
      setDataSource(newData);
      setEditIndex(null);
    } else {
      setDataSource([...dataSource, newScore]);
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

  const getInitialValues = () => {
    if (editIndex !== null) {
      return [
        {
          scoreTitle: dataSource[editIndex].scoreTitle,
          score: dataSource[editIndex].score,
        },
      ];
    }
    return [];
  };

  return (
    <div>
      <ConfigureScoreForm
        open={openModal}
        onCancel={() => {
          setOpenModal(false);
          setEditIndex(null);
        }}
        handleScoreFormSubmit={handleTableFormSubmit}
        initialValues={getInitialValues()}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        scroll={{ x: 500 }}
        className="lg:w-1/2"
      />
      <button
        onClick={() => {
          setEditIndex(null);
          setOpenModal(true);
        }}
        className="p-2 border border-[#686868] rounded"
      >
        Add new row to table
      </button>
    </div>
  );
};
