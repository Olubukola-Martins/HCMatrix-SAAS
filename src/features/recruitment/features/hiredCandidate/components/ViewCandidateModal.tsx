import { Form, Input, Modal, Tag } from "antd";
import { TbDownload } from "react-icons/tb";
import React from "react";
import { openNotification } from "utils/notifications";

interface IViewHireModalProps {
  visible: boolean;
  onCancel: () => void;
  candidate: {
    name: string;
    email: string;
    jobPosition: string;
    score: number;
    hiredDate: string;
    // requiredDocuments: string[];
  };
}

const ViewCandidateModal = ({ candidate, onCancel, visible }: IViewHireModalProps) => {
  const requiredDocuments = ["passport", "NYSC leaving cert", "National ID", "School certifiate"];
  return (
    <Modal open={visible} onCancel={onCancel} footer={null} title="Candidate Details" className="p-4 ">
      <Form layout="vertical" initialValues={candidate} className="space-y-4">
        <Form.Item label="Candidate Name" name="name">
          <Input value={candidate.name} readOnly />
        </Form.Item>

        <Form.Item label="Candidate Email" name="email">
          <Input value={candidate.email} readOnly />
        </Form.Item>

        <Form.Item label="Job Position" name="jobPosition">
          <Input value={candidate.jobPosition} readOnly />
        </Form.Item>

        <Form.Item label="Score" name="score">
          <Input value={candidate.score.toString()} readOnly />
        </Form.Item>

        <Form.Item label="Hired Date" name="hiredDate">
          <Input value={candidate.hiredDate} readOnly />
        </Form.Item>

        <Form.Item label="Required Documents" name="requiredDocuments">
          <div className="mt-2 border-gray-300 border rounded-md  py-2 px-3">
            {requiredDocuments.map((doc, index) => (
              <Tag key={index} className="mb-1 flex-nowrap">
                {doc}
              </Tag>
            ))}
            <TbDownload
              className=" text-right mt-3 ml-auto cursor-pointer hover:backdrop-grayscale"
              onClick={() =>
                openNotification({
                  state: "success",
                  title: "Success",
                  description: "All Document downloaded successfully",
                  duration: 3,
                })
              }
            />
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ViewCandidateModal;
