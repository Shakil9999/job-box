import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie files/register.json";
import { useContext } from "react";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const image_hosting_key = import.meta.env.VITE_image_hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;

    // Image Upload
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    // Upload to imgbb
    const imgResponse = await axios.post(image_hosting_api, formData);
    const imageURL = imgResponse.data.data.display_url;

    const newUser = { fullName, email, password, imageURL };

    // save to database
    axios.post("https://job-box-server-lilac.vercel.app/users", newUser);

    // firebase create user
    createUser(email, password)
      .then((result) => {
        if (result.user) {
          Swal.fire({
            title: "Account Created Successfully!",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center px-4">
      <div className="flex flex-col lg:flex-row-reverse items-center gap-12 max-w-6xl w-full">

        {/* Animation */}
        <div className="flex-1 flex justify-center">
          <div className="w-80 h-80 lg:w-[420px] lg:h-[420px]">
            <Lottie animationData={registerAnimation} />
          </div>
        </div>

        {/* Beautiful Register Card */}
        <div className="flex-1 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 text-white">

          <h1 className="text-4xl font-bold text-center mb-6 tracking-wide">
            Create Account
          </h1>

          <form onSubmit={handleRegister} className="space-y-4">

            <div>
              <label className="text-gray-300">Full Name</label>
              <input
                type="text"
                name="fullName"
                required
                placeholder="Enter your full name"
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-300 border-gray-500 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-300 border-gray-500 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-gray-300">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter password"
                className="input input-bordered w-full bg-white/10 text-white placeholder-gray-300 border-gray-500 focus:border-purple-400"
              />
            </div>

            {/* Photo Input */}
            <div>
              <label className="text-gray-300">Upload Profile Image</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                required
                className="file-input w-full bg-white/10 text-gray-200 file:bg-purple-600 file:border-none file:text-white hover:file:bg-purple-700"
              />
            </div>

            <button className="btn w-full bg-purple-600 hover:bg-purple-700 text-white text-lg rounded-xl shadow-lg border-none mt-3">
              Register
            </button>
          </form>

          <p className="text-center text-gray-300 mt-4">
            Already have an account?{" "}
            <Link
              to="/login"
              state={location.state}
              className="text-purple-400 hover:text-purple-500 font-semibold"
            >
              Login
            </Link>
          </p>

          <div className="divider text-gray-300">OR</div>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
