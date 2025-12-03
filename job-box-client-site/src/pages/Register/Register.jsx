import Lottie from "lottie-react";
import registerAnimation from "../../assets/lottie files/register.json";
import { useContext } from "react";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../shared/SocialLogin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const image_hosting_key = import.meta.env.VITE_image_hosting
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`


const Register = () => {
  const { createUser } = useContext(AuthContext);
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();


  const handleRegister = async(e) => {

    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const password = form.password.value;
   
     // 1. Get the uploaded file
    const image = form.image.files[0]

    // 2. Upload image to ImgBB and get back img url
    const userImage = new FormData()
    userImage.append("image", image)

    // 3.get image url
    const res = await axios.post(image_hosting_api, userImage)
    const imageURL = res.data.data.display_url
    console.log(imageURL)

    const formData = { fullName, email, password, imageURL};
     console.log(formData);

     axios.post('http://localhost:5000/users', formData)
     .then(res=>{
      console.log(res.data)
     })


    createUser(email, password)
      .then((result) => {
        console.log("register login", result.user);

        if (result.user) {
          Swal.fire({
            title: "User Create Successful",
            icon: "success",
            draggable: true,
          });
        }
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left flex-1 mx-8">
          <Lottie animationData={registerAnimation}></Lottie>
        </div>
        <div className="card bg-base-100 w-full  shrink-0 shadow-2xl flex-1">
          <div className="card-body">
            <h1 className="text-4xl text-center font-semibold">Register Now</h1>
            <form onSubmit={handleRegister} className="fieldset">
              <label className="label">Enter Full Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter Full Name"
                name="fullName"
              />

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

              {/* photo input */}
              <label className="label">Choose Image</label>
              <input 
              type="file" 
              accept="image/png, image/jpeg, image/jpg, image/webp"
              className="file-input file-input-primary" 
              name="image" />


              <button className="btn btn-neutral mt-4">Register</button>
            </form>
            <p>
              Already Have An Account! please{" "}
              <Link
                className="text-blue-700 font-semibold"
                state={location.state}
                to="/login"
              >
                {" "}
                Login
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

export default Register;
