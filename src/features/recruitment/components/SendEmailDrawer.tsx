import React, { useState } from "react";
import { AppButton } from "components/button/AppButton";
import { Drawer, Form } from "antd";
import { Link } from "react-router-dom";
import { appRoutes } from "config/router/paths";
import { IDrawerProps } from "types";
import { JoditEditorComponent } from "./JoditEditor";
//import IDrawerProps

// type DrawerProps = {
//   title: string;
//   placement: "right" | "left";
//   onClose: () => void;
//   open: boolean;
//   closable: boolean;
//   className: string;
//   children: React.ReactNode;
// };

// export const SendEmailDrawer: React.FC<DrawerProps> = ({
//   title,
//   placement = "right",
//   onClose,
//   open = false,
//   closable = true,
//   className,
//   children,
// }) => {
//   return (
//     <Drawer title={title} placement={placement} onClose={onClose} visible={open} closable={closable} className={className}>
//       {children}
//     </Drawer>
//   );
// };

export const SendEmailDrawer = ({ handleClose, open }: IDrawerProps) => {
  const onClose = () => {
    handleClose();
  };
  return (
    <Drawer
      title="Send Candidate an Email"
      open={open}
      onClose={onClose}
      size="large"
    >
      <Form>
        <JoditEditorComponent />
      </Form>
    </Drawer>
  );
};
