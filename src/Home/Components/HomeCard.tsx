import React from "react";


interface HomeCardProps {
  title: string;
  image: string;
  desc: string;
  subTitle?: string
}

const HomeCard = ({ title, image, desc, subTitle }: HomeCardProps) => {
  return (
    <div className="bg-card rounded-xl h-80 text-accent">
      <h5 className="py-4 px-3 font-medium">{title}</h5>
      <hr />
      <span className="text-xs pt-1 pb-4 pl-3">{subTitle && subTitle}</span>
      <div className="px-3 pt-10">
        <div className="flex justify-center">
          <div className="cardImgBg p-4">
            <img src={image} alt={title} className="h-8" />
          </div>
        </div>
        <h5 className="text-center pt-16">{desc}</h5>
      </div>
    </div>
  );
};

export default HomeCard;
