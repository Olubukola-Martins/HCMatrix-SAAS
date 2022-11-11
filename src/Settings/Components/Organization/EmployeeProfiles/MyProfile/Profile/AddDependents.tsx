import { Drawer } from "antd";
import { IDrawerProps } from "../../../../../../AppTypes/Component";

export const AddDependents = ({ open, handleClose }: IDrawerProps) => {
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={() => handleClose()}
      open={open}
      // style={{backgroundColor: "red"}}
      className="drawerBg"
    >
      <p onClick={() => handleClose()}>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
