import {
  SupplementaryActions,
  SupplementaryActionsProps,
} from "SupplementaryActions";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";

type IntroProps = {
  title?: string;
  link?: string;
  close?: () => void;
  loading?: boolean;
  // close?: (event: React.MouseEvent<HTMLButtonElement>) => void
} & SupplementaryActionsProps;
export const PageIntro = ({
  title,
  link,
  close,
  loading,
  actions,
  comps,
}: IntroProps) => {
  return (
    <Skeleton loading={loading} active paragraph={{ rows: 2 }}>
      <div className="flex gap-y-3 flex-col lg:flex-row lg:justify-between lg:items-center">
        <div className="flex items-center gap-3 font-extrabold ">
          {link && (
            <Link to={link}>
              <i className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"></i>
            </Link>
          )}
          {close && (
            <i
              onClick={close}
              className="ri-arrow-left-s-line text-lg cursor-pointer hover:text-caramel"
            ></i>
          )}
          <h2 className="text-xl text-accent capitalize">{title}</h2>
        </div>
        <SupplementaryActions actions={actions} comps={comps} />
      </div>
    </Skeleton>
  );
};
