import { Drawer } from "antd";

export const AddDependents = (open: any, handleClose: any) => {
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={handleClose}
      open={open}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
