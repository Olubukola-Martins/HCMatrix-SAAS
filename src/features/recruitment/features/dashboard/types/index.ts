export type TDBCard = {
  link: string;
  title: string;
  count: number;
};
export interface IApplicantDetails {
  key: string;
  name: string;
  email: string;
  jobTitle: string;
  date: string;
  status: string;
}
export interface IChatSlipProps {
  imgSrc?: string;
  name: string;
    lastMsg?: string;
    link:string
}
