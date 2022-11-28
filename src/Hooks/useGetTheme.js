import { useEffect, useState } from "react";
import useLocalStorage from "use-local-storage";

function useGetTheme() {
  const [val] = useLocalStorage("theme" ? "dark" : "light");

  const theme = {
    isDark: val === "dark" ? true : false,
    value: val,
  };

  return theme;
}

export default useGetTheme;
