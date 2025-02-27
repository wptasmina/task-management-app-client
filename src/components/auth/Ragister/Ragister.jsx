import Lottie from "lottie-react"
import register from "./register.json"
import { useContext, useState } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider";
import { toast } from "react-toastify";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

export default function Ragister() {

  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate(); // Initialize useNavigate
    // Password visibility state
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const hendleRegister = async (e) =>{
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;


    try {
      await createUser(email, password); 
      console.log("User successfully registered!");
      toast.success('User successfully registered!')

      navigate("/dashboard");

    } catch (error) {
      console.error("Registration failed:", error);
      toast.error('User Registration UnSuccessfull!')
    }

    form.reset()

  }

  return (
<div>
<div className=" bg-base-200 min-h-screen pt-10">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left hidden md:block w-2/6">
       <Lottie animationData={register} />
    </div>
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-lg">
    <h1 className="text-4xl text-center font-bold pt-6">Register</h1>
      <form onSubmit={hendleRegister} className="card-body">
        <fieldset className="fieldset">
          <label className="fieldset-label">Name</label>
          <input type="name" name='name' className="input border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2] focus:outline-none" placeholder="Name" />
          <label className="fieldset-label">Email</label>
          <input type="email" name='email' className="input border border-gray-300 rounded-lg focus:ring-[#1753c2] focus:border-[#1753c2] focus:outline-none" placeholder="Email" />


          {/* Password */}
          <label className="fieldset-label">Password</label>
          <div className="mb-4 relative">
            {/* <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label> */}
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
          
          <input type="submit" value="Sign Up" className="btn btn-neutral mt-4"/>
          <p className="text-sm text-gray-600 my-4  text-center">
          Already have an account? 
          <Link
            to="/login"
            className="text-green-700 ml-1 font-bold underline"
          >
            Log In
          </Link>
        </p>
        </fieldset>
      </form>
    </div>
  </div>
</div>
</div>
  )
}
