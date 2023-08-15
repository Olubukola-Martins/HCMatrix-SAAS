import { Form, Input, Modal, Tabs } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { FileUpload } from "components/FileUpload";
import { AppButton } from "components/button/AppButton";
import { IModalProps } from "types";

export const AddContent = ({ open, handleClose }: IModalProps) => {
  return (
    <Modal
      open={open}
      onCancel={() => handleClose()}
      footer={null}
      title="Add Content"
      style={{ top: 15 }}
    >
      <Form layout="vertical" onFinish={(val) => console.log(val)}>
        <Tabs
          defaultActiveKey="1"
          className=""
          items={[
            {
              key: "1",
              label: "Subheading",
              children: (
                <>
                  <Form.Item name="subheading" label="Subheading">
                    <Input />
                  </Form.Item>
                </>
              ),
            },
            {
              key: "2",
              label: "Video",
              children: (
                <FileUpload
                  displayType="icon"
                  allowedFileTypes={["video/mp4"]}
                  fileKey={""}
                />
              ),
            },
            {
              key: "3",
              label: "Audio",
              children: (
                <FileUpload
                  displayType="icon"
                  allowedFileTypes={["audio/mpeg"]}
                  fileKey={""}
                />
              ),
            },
            {
              key: "4",
              label: "Document",
              children: (
                <FileUpload
                  displayType="icon"
                  allowedFileTypes={[
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                  ]}
                  fileKey={""}
                />
              ),
            },
            {
              key: "5",
              label: "Text",
              children: (
                <Form.Item name="text" label="More Description">
                  <TextArea />
                </Form.Item>
              ),
            },
            {
              key: "6",
              label: "Link",
              children: (
                <Form.Item name="link" label="Link">
                  <Input />
                </Form.Item>
              ),
            },
          ]}
        />

        <div className="mt-3">
          <AppButton type="submit" />
        </div>
      </Form>
    </Modal>
  );
};
