import { Drawer } from "antd";
import { IDrawerProps } from "types";

export const NewRequest = ({ handleClose, open }: IDrawerProps) => {
  return (
    <Drawer
      open={open}
      onClose={() => handleClose()}
      title={`New Request`}
    >
        
    </Drawer>
  );
};
