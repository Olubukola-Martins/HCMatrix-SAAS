export interface ICurrentCompany {
  companyId: number;
  token: string;
}

export interface IPaginationProps {
  limit?: number;
  offset?: number;
}

export interface ISearchParams {
  name?: string;
  //   other params can be optional
}
export type TFetchListDataExtraProps = {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
};
export type TFetchListDataProps = TFetchListDataExtraProps & ICurrentCompany;

export interface IDrawerProps {
  id?: number;
  open: boolean;
  handleClose: Function;
}

export interface IModalProps extends IDrawerProps {}

// container props
export type TListDataTypeView = "list" | "grid";
