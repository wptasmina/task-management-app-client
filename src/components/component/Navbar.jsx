import { Link, useNavigate } from 'react-router-dom';
import logo from '/logo.png';
import { AuthContext } from '../auth/AuthProvider/AuthProvider';
import { useContext } from 'react';
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { BsDatabaseFillDash } from "react-icons/bs";


export default function Navbar({ darkMode, setDarkMode }) {
  const { user, signOutUser } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log("Successfully signed out user");
        navigate("/")
      })
      .catch(error => {
        console.log("Failed to sign out");
      });
  };

  // const navItemText = 'focus:text-blue-900 font-bold';
  const navItem = (
    <>
      {/* <li className={navItemText}><Link to="/">Home</Link></li>
      <li className={navItemText}><Link to="/dashboard">Dashboard</Link></li> */}
    </>
  );

  return (
      <div className={`sticky top-0 z-50 shadow-md transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-base-100 text-gray-900"}`}>
        <div className="navbar p-0 w-11/12 mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content rounded-box z-10 mt-3 w-52 p-2 shadow bg-white dark:bg-gray-800 dark:text-white">
              <Link to="/dashboard" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
              <BsDatabaseFillDash />
                  Dashboard
                </Link>
              </ul>
            </div>
            <Link to="/" className="inline-flex gap-1 items-center text-xl">
              <img src={logo} alt="Logo" className='w-10' />
              <h3 className='text-xl font-extrabold hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-700 to-pink-600'>TaskNexus</h3>
            </Link>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal px-1">
              {navItem}
            </ul>
          </div>
          <div className="navbar-end gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-8 h-8 flex justify-center items-center rounded-full bg-gray-700 text-white"
            >
              {darkMode ? <MdLightMode className="text-xl" /> : <MdDarkMode className="text-xl" />}
            </button>

            {user ? (
              <>
                <div className='hidden md:block '>
                  <Link to="/dashboard" className="inline-flex items-center gap-1 px-3 py-2 bg-gradient-to-r from-blue-800  to-pink-600 z-20 text-white rounded-lg">
                    < BsDatabaseFillDash/>
                      Dashboard
                  </Link>
                </div>
                <button onClick={handleSignOut} className="btn">Log Out</button>
              </>
            ) : (
              <Link to="/login" className="btn">Login</Link>
            )}
          </div>
        </div>
      </div>
  );
}
