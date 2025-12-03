import { useContext } from "react";
import AuthContext from "../../Provider/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SocialLogin = () => {
  const navigate = useNavigate();
  const { socialLogin } = useContext(AuthContext);
  const handleSocialLogin = () => {
    socialLogin()
      .then((result) => {
        navigate("/");
        console.log("social login", result.user);
        if (result.user) {
          Swal.fire({
            title: "Login Successful",
            icon: "success",
            draggable: true,
          });
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("social login", errorCode, errorMessage);
      });
  };
  return (
    <div>
      <button onClick={handleSocialLogin} className="btn btn-outline btn-info">
        Log in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
