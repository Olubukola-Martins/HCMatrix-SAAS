import { useEffect, useState } from "react";

export const useManageLocation = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [long, setLong] = useState<number | null>(null);

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLat(position.coords.latitude);
          setLong(position.coords.longitude);
        },
        function (error) {}
      );
    };

    getLocation();
  }, []);
  return { lat, long };
};
