import { Progress } from "antd";
import { SimpleCard } from "components/cards/SimpleCard";
import { ActivitiesGraph } from "../trackProgress/ActivitiesGraph";

export const Overview = () => {
  return (
    <>
      <div className="bg-card rounded p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3">
        <div className="bg-mainBg rounded-l-md px-2 py-3 flex lg:justify-center gap-3">
          <div>
            <img
              src="https://res.cloudinary.com/ddvaelej7/image/upload/v1657714689/samples/personal-info_vgptbq.png"
              alt="user"
              className="h-28"
            />
          </div>
          <div className="hidden md:flex flex-col gap-2">
            <h3 className="font-semibold">Training Title:</h3>
            <h3 className="font-semibold">Training Description:</h3>
          </div>
        </div>

        <div className="bg-mainBg rounded-r-md px-2 py-3 gap-2 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <p>
              <span className="font-semibold pr-2 md:hidden flex">
                Training Title:
              </span>
              Angular js
            </p>
            <p className="text-sm">
              <span className="font-semibold pr-2 md:hidden flex">
                Training Description:
              </span>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Neque
              temporibus enim culpa, dignissimos recusandae alias a ut.
              Laboriosam doloremque ipsa cumque dolore a sed, alias, accusantium
              nemo tenetur dolorum amet.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-7">
        <SimpleCard title="Assigned Learners" highlight="10" />
        <SimpleCard title="Completed Learners" highlight="5" />
        <SimpleCard title="Grand Cost" highlight="$100" />
        <SimpleCard title="Duration" highlight="1 week" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-x-5 gap-y-8">
        <div className="lg:col-span-4 col-span-6">
          <h3 className="font-medium text-lg">Active</h3>
          <ActivitiesGraph />
        </div>
        <div className="lg:col-span-2 col-span-6">
          <h3 className="font-medium text-lg pb-7">Progress Overview</h3>
          <div className="flex justify-center">
            <Progress
              type="circle"
              percent={75}
              strokeColor="var(--caramel)"
              width={220}
            />
          </div>
          <div className="flex items-center justify-around mt-7">
            <button className="transparentButton flex items-center gap-2">
              <div className="rounded-full h-3 w-3 bg-green-700" />
              <span>{Math.floor((10 / 33) * 100)}% In progress</span>
            </button>
            <button className="transparentButton flex items-center gap-2">
              <div className="rounded-full h-3 w-3 bg-gray-400" />
              <span>{Math.floor((3 / 33) * 100)}% Not Started</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
