import logo from '/logo.png'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

export default function Footer() {
    const [darkMode, setDarkMode] = useState(false);
  
    useEffect(() => {
      const storedTheme = localStorage.getItem("darkMode");
      if (storedTheme) {
        setDarkMode(JSON.parse(storedTheme));
      }
    }, []);
  
    useEffect(() => {
      localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);
  
  return (
<div  className={darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} >
<footer className="footer sm:footer-horizontal text-neutral-content items-center py-4 w-10/12 mx-auto bg-neutral">
  <aside className="grid-flow-col items-center">
    <img src={logo} alt="Logo" className='w-8' />
    <p>Copyright © {new Date().getFullYear()} Task Manager. All rights reserved.</p>
  </aside>
  <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
    <Link to="https://www.linkedin.com/in/wptasmina">
        <FaLinkedinIn className='text-2xl cursor-pointer' />
    </Link>
    <Link to="https://github.com/wptasmina">
        <FaGithub className='text-2xl cursor-pointer' />
    </Link>
    <Link to="https://www.facebook.com/wptasmina">
    <FaFacebookF className='text-2xl cursor-pointer' />
    </Link>
  </nav>
</footer>
    </div>
  )
}
