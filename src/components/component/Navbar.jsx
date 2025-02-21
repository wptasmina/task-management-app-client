
import { Link } from 'react-router-dom';
import  logo  from '/logo.png';


export default function Navbar() {
  return (
<div>
  <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashbord">Dashbord</Link></li>
      </ul>
    </div>
    <Link className="inline-flex items-center text-xl">
      <img src={logo} alt="Logo" className='w-10' />
      <h3 className='text-xl'>TaskNexus</h3>
    </Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><Link to="/">Home</Link></li>
      <li><Link to="/dashbord">Dashbord</Link></li>
    </ul>
  </div>
  <div className="navbar-end">
    <Link to="/ragister" className="btn">Register</Link>
    <Link to="/login" className="btn">Login</Link>
  </div>
</div>
</div>
  )
}
