import { useEffect, useState } from 'react';
import Navbar from '../../../component/Navbar';
import TaskBoard from '../components/TaskBoard/TaskBoard';

export default function Dashboard() {
    const [darkMode, setDarkMode] = useState(() => {
        return JSON.parse(localStorage.getItem("darkMode")) || false;
    });

    useEffect(() => {
        // Apply or remove the "dark" class on the <body> tag
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        // Save to localStorage
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <>
              {/* Navbar Component */}
              <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className={darkMode ? "dark bg-gray-900 text-white min-h-screen" : "bg-gray-100 text-black min-h-screen"}>
              {/* <Navbar /> */}
                {/* <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="p-2 bg-gray-500 text-white rounded m-4"
                >
                    Toggle Dark Mode
                </button> */}
                <TaskBoard />
            </div>
        </>
    );
}
