import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';


export default function MainLayouts({ theme }) {
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark"); // Remove any existing theme classes
    document.documentElement.classList.add(theme); // Add new theme class
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme}>
      <div className="min-h-[calc(100vh-120px)] ">
        <Outlet></Outlet>
        </div>
    </div>
  );
}
