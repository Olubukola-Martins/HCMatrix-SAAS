import React, { useEffect, useState } from "react";

export const UseWindowWidth = () => {
  const [drawerSize, setDrawerSize] = useState<"default" | "large">("default");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setDrawerSize("large");
      } else {
        setDrawerSize("default");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { drawerSize };
};
