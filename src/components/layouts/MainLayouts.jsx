import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './../component/Navbar';

export default function MainLayouts({ theme }) {
  useEffect(() => {
    document.documentElement.classList.remove("light", "dark"); // Remove any existing theme classes
    document.documentElement.classList.add(theme); // Add new theme class
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={theme}>
      <Navbar></Navbar>
      <Outlet />
    </div>
  );
}
