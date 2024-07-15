import { Empty, Skeleton } from "antd";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import React from "react";
import { IDivProps } from "types/html";
import { useManageLocation } from "features/timeAndAttendance/hooks/useManageLocation";
import "../../styles/attendance_location_map.css";

type IProps = IDivProps & {
  isLoading?: boolean;
};
const customIcon = new Icon({
  iconUrl: require("../../assets/location_marker.png"),
  iconSize: [38, 38], // size of the icon
});

const AttendanceLocationCard: React.FC<IProps> = ({
  className = "col-span-3 bg-mainBg border mt-4 rounded-lg text-sm shadow p-3",

  isLoading,
}) => {
  const { lat, long } = useManageLocation();
  return (
    <div className={className}>
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium text-lg">Your Current Location</h4>
        </div>
      </div>
      <Skeleton active paragraph={{ rows: 9 }} loading={isLoading}>
        <div className="attendance_location_map">
          {lat && long ? (
            <MapContainer
              center={[lat, long]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[lat, long]} icon={customIcon}>
                <Popup>
                  <span>My Position</span>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <Empty description="Unable to retrieve user location!" />
          )}
        </div>
      </Skeleton>
    </div>
  );
};

export default AttendanceLocationCard;
