import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../../component/Navbar"; // Import Navbar


export default function Home() {
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
    <div className={darkMode ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-900 shadow-md"}>
      
      {/* Navbar Component */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <header className="text-center pt-20 pb-10">
        <h2 className="md:text-5xl text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600 pb-2">Organize Your Tasks Efficiently</h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto px-4">
          A powerful Task Management Application that helps you add, edit, and organize tasks seamlessly. 
          Drag and drop tasks across different categories and sync them instantly with the database.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Link to="/ragister" className="px-6 py-3 bg-green-600 text-white rounded-lg text-lg">
            Sign Up Now
          </Link>
        </motion.div>
      </header>

      <section className="pb-20 pt-10 px-6 md:px-20 text-center">
        <h3 className="text-3xl font-semibold">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <motion.div className="p-6 border rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold">Task Organization</h4>
            <p className="text-gray-600 dark:text-gray-300">Categorize tasks into To-Do, In Progress, and Done.</p>
          </motion.div>
          <motion.div className="p-6 border rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold">Drag & Drop</h4>
            <p className="text-gray-600 dark:text-gray-300">Reorder and move tasks seamlessly.</p>
          </motion.div>
          <motion.div className="p-6 border rounded-lg shadow-lg" whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold">Real-time Sync</h4>
            <p className="text-gray-600 dark:text-gray-300">Instantly save changes to the database.</p>
          </motion.div>
        </div>
      </section>

      <footer className="text-center py-8 border-t border-gray-200">
        <p>Copyright © {new Date().getFullYear()} @TaskNexus (Task Manager). All rights reserved.</p>
      </footer>
    </div>
  );
}
