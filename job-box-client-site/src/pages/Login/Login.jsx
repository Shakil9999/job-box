import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottie files/login.json";
import { useContext } from "react";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  const location = useLocation();
  const from = location?.state || "/";
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then((result) => {
        if (result.user) {
          navigate(from, { replace: true });
          Swal.fire({
            title: "Login Successful!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
    
        {/* Login Card */}
        <div className="flex-1 w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-xl rounded-3xl p-10 text-white">

          <h1 className="text-4xl font-bold text-center mb-6 tracking-wide">
            Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">

            <div>
              <label className="label-text text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-300 border-gray-500 focus:border-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>

            <div>
              <label className="label-text text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-300 border-gray-500 focus:border-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="flex justify-end">
              <a className="text-blue-400 hover:text-blue-500 text-sm cursor-pointer">
                Forgot password?
              </a>
            </div>

            <button className="btn w-full bg-blue-600 hover:bg-blue-700 text-white mt-2 rounded-xl text-lg shadow-lg border-none">
              Login
            </button>
          </form>

          <p className="text-center mt-4 text-gray-300">
            New here?{" "}
            <Link
              className="text-blue-400 font-semibold hover:text-blue-500"
              state={location.state}
              to="/register"
            >
              Register now
            </Link>
          </p>

          <div className="divider text-gray-400">OR</div>

          <SocialLogin />
        </div>
      </div>
  );
};

export default Login;
