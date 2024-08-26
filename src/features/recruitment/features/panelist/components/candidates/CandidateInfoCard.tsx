import { Carousel } from "antd";
import { useEffect, useState } from "react";

interface IProps {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  city?: string;
  state?: string;
  country?: string;
  score: number;
  candidateImg: string;
  extraStyles?: string;
}

const CandidateInfoCard = ({ name, email, phone_number, address, city, state, country, candidateImg, extraStyles, score = 0 }: IProps) => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const subCardPersonalInfo1 = (
    <div className="bg-mainBg p-3 flex xl:flex-1 min-w-[250px] flex-col sm:flex-row sm:items-center gap-4 rounded-md h-full">
      <img alt="panelist" src={candidateImg} className="h-[120px] w-[120px] rounded-[50%] mx-auto object-cover" />
      <div className="w-auto flex flex-1  flex-row lg:gap-x-2 text-sm max-sm:w-full max-sm:max-w-72 justify-between sm:text-base h-full">
        <div className="flex flex-col justify-between">
          <p>Candidate's Name</p>
          <p>Email</p>
          <p>Phone Number</p>
        </div>
        <div className="flex flex-col justify-between max-[360px]:hidden">
          {[1, 2, 3].map(() => (
            <p>--:--</p>
          ))}
        </div>
        <div className="flex flex-col justify-between min-[361px]:hidden">
          {[1, 2, 3].map(() => (
            <p>~</p>
          ))}
        </div>
        <div className="flex flex-col justify-between">
          <p>{name}</p>
          <p>{email}</p>
          <p>{phone_number}</p>
        </div>
      </div>
    </div>
  );

  const subCardPersonalInfo2 = (
    <div style={{ display: "flex", flexDirection: "row" }} className="bg-mainBg p-3 flex w-auto flex-row lg:gap-x-2  min-w-[250px] justify-between rounded-md text-sm sm:text-base min-h-32 ">
      <div className="flex flex-col justify-between">
        <p>Address</p>
        <p>City</p>
        <p>State/Country</p>
      </div>
      <div className="flex flex-col justify-between max-[360px]:hidden">
        {[1, 2, 3].map(() => (
          <p>--:--</p>
        ))}
      </div>
      <div className="flex flex-col justify-between min-[361px]:hidden">
        {[1, 2, 3].map(() => (
          <p>~</p>
        ))}
      </div>
      <div className="flex flex-col justify-between">
        <p className="xl:max-w-44 xl:flex xl:flex-wrap">{address}</p>
        <p>{city}</p>
        <p>{`${state}/${country}`}</p>
      </div>
    </div>
  );

  const subCardOverallScore = (
    <div className="bg-mainBg px-3 py-5 xl:py-7 flex min-w-[120px]  xl:w-fit flex-col justify-between items-center rounded-md min-h-32">
      <p className="text-center">Over all score</p>
      <p className="text-3xl xl:text-2xl font-extrabold text-center">{score}</p>
    </div>
  );

  return isSmallScreen ? (
    <Carousel autoplay className={`bg-gray-100 p-5 pb-7  w-full ${extraStyles}`}>
      {subCardPersonalInfo1}
      <div >
        {subCardPersonalInfo2}
      </div>
      <div >{subCardOverallScore}</div>
    </Carousel>
  ) : (
    <div className={`bg-gray-100 p-5 w-full grid grid-cols-2   xl:flex   gap-5 ${extraStyles}`}>
        <div className="col-span-2 flex-1">      
        {subCardPersonalInfo1}
        </div>
      {subCardPersonalInfo2}
      {subCardOverallScore}
    </div>
  );
};

export default CandidateInfoCard;

