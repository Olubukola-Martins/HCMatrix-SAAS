import React from 'react'
import useLocalStorage from 'use-local-storage';

const Themes = ({children}) => {
    const [theme ] = useLocalStorage("theme" ? "dark" : "light");
    const [colorTheme] = useLocalStorage("");    
  return (
    <div className="mode_color" data-theme={theme} color-theme={colorTheme}>{children}</div>
  )
}

export default Themes

