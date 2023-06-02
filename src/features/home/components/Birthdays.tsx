import { Collapse } from "antd";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

export const Birthdays = () => {
  return (
    <div>
      <h4 className="text-gray-300 text-xl text-center py-5">No Birthday</h4>
      <Collapse defaultActiveKey={["1"]}>
        <Panel header="Upcoming Birthdays" key="1">
          <div className="grid grid-cols-2 gap-3">
            {[1, 2].map((item) => (
              <div
                className="shadow border p-2 rounded flex items-center gap-2"
                key={item}
              >
                <img
                  src="https://res.cloudinary.com/ddvaelej7/image/upload/v1639659955/HCmatrix/User-Icon_wdkmsf.png"
                  alt="user"
                  className="h-7"
                />
                <div>
                  <h5 className="text-xs">Godswill Smile</h5>
                  <span className="text-xs">10 Aug</span>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Collapse>
      <Link to="/" className="underline text-caramel flex justify-center pt-7">
        View All
      </Link>
    </div>
  );
};
