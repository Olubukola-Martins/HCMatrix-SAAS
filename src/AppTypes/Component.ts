export interface IDrawerProps {
  open: boolean;
  handleClose: Function;
}

export interface IModalProps extends IDrawerProps {}

// container props
export type TDataView = "list" | "grid";
