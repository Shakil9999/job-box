import Lottie from "lottie-react";
import loginAnimation from "../../assets/lottie files/login.json";
import { useContext } from "react";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const { loginUser } = useContext(AuthContext);

  //location
  const location = useLocation();
  console.log("login location", location);
  const from = location?.state || "/";

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // const formData = { email, password };
    // console.log(formData);

    loginUser(email, password)
      .then((result) => {
        // console.log("login user",result.user);
        // const user = {email: email}
        // console.log("user", user)
        // axios.post('http://localhost:5000/jwt', user, {withCredentials: true})
        // .then(result=>{
        //   console.log(result.data)
        // })
        if (result.user) {
          navigate(from, { replace: true });
          Swal.fire({
            title: "User Login Successful",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen ">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left flex-1 mx-8">
          <Lottie animationData={loginAnimation}></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-lg  shrink-0 shadow-2xl flex-1">
          <div className="card-body">
            <h1 className="text-4xl text-center font-semibold">Login Now</h1>
            <form onSubmit={handleLogin} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                className="input w-full"
                placeholder="Email"
                name="email"
              />

              <label className="label">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                name="password"
              />

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </form>
            
            <p>
              New Here! please
              <Link
                className="text-blue-700 font-semibold"
                state={location.state}
                to="/register"
              >
                Register
              </Link>
            </p>

            <div className="divider m-0">OR</div>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
