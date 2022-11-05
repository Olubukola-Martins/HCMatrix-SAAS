import { Link } from "react-router-dom";

type introProps = {
    title: string,
    link?: string,
    close?: any
}
export const PageIntro = ({ title, link, close }: introProps) => {
  return (
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
      <h2 className="text-xl text-accent">{title}</h2>
    </div>
  );
};
