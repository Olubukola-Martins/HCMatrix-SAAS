interface IProps {
  name: string;
  department: string;
  designation: string;
  panelistImg: string;
  extraStyles?: string;
}

const PanelistInfoCard = ({ name, department, designation, panelistImg, extraStyles }: IProps) => {
  return (
    <div className={` bg-gray-100 px-5 py-5 w-full sm:w-[616px] ${extraStyles}`}>
      <div className="bg-mainBg py-3 justify-evenly flex flex-col max-sm:gap-y-2 max-sm:items-center sm:flex-row rounded-md">
        <img alt="panelist" src={panelistImg} className="h-[120px] w-[120px] rounded-[50%] object-cover" />
        <div className="w-auto flex text-sm max-sm:w-full max-sm:max-w-72 justify-between sm:text-base">
          <div className="flex flex-col justify-between">
            <p>Panelist Name</p>
            <p>Department</p>
            <p>Designation</p>
          </div>
          <div className="flex flex-col justify-between max-[360px]:hidden">
            {[1, 2, 3].map(() => (
              <p >--:--</p>
            ))}
          </div>
          <div className="flex flex-col justify-between min-[361px]:hidden">
            {[1, 2, 3].map(() => (
              <p >~</p>
            ))}
          </div>
          <div className="flex flex-col justify-between">
            <p>{name}</p>
            <p>{department}</p>
            <p>{designation}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelistInfoCard;
