export const LeaningProgressHeader = () => {
  return (
    <div className="bg-card rounded p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
      <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-3">
        <div>
          <img
            src="https://res.cloudinary.com/ddvaelej7/image/upload/v1657714689/samples/personal-info_vgptbq.png"
            alt="user"
            className="h-28"
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">Godswill Omenuko</h3>
          <h3 className="font-medium">Frontend Developer</h3>
          <span>Manager | App Dev</span>
        </div>
      </div>

      <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-2">
        <div className="flex flex-col gap-2  font-medium">
          <h3>
            Training In Progress: <span className="pl-5">---</span>
          </h3>
          <h3>
            Training Completion: <span className="pl-5">---</span>
          </h3>
          <h3>
            Training Not Started: <span className="pl-5">---</span>
          </h3>
        </div>
      </div>

      <div className="bg-mainBg rounded-md px-2 py-3 flex justify-center gap-2">
        <div className="flex flex-col gap-2  font-medium">
          <h3>
            Certifications: <span className="pl-5">---</span>
          </h3>
          <h3>
            Points: <span className="pl-5">---</span>
          </h3>
          <h3>
            Total Badges: <span className="pl-5">---</span>
          </h3>
        </div>
      </div>
    </div>
  );
};
