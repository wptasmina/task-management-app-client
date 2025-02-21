
import Lottie from "lottie-react"
import loginAm from "./login.json"
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";

export default function LoginPage() {
    // Password visibility state
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    // const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

  const hendleLogin = (e) =>{
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
  }
  
  return (
    <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left hidden md:block w-3/6">
      
    <Lottie animationData={loginAm} />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
    <h1 className="text-4xl font-bold text-center pt-4">Login now!</h1>
      <form onSubmit={hendleLogin} className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          {/* <label className="fieldset-label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" /> */}
          {/* Password */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2] focus:outline-none"
              placeholder="Enter your password"
            
            />
            <p className="text-red-600"></p>
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-3 top-[40%] flex items-center text-gray-500 hover:text-[#1753c2] focus:outline-none"
            >
              {passwordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>

          <div><a className="link link-hover">Forgot password?</a></div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <div>
          <Link to="/ragister">
            <p className="text-center font-medium hover:bg-green-600 hover:text-white px-4 py-2 rounded-lg">Create a new account</p>
          </Link>
        </div>
      </form>
    </div>
  </div>
</div>
  )
}
