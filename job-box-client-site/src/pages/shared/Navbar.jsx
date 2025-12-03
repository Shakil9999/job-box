import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import axios from "axios";


const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    });
  };

  const navItems = (
    <>
     

      <li>
        <Link className="hover:text-purple-400 transition" to="/about">About Us</Link>
      </li>


      <li>
        <Link className="hover:text-purple-400 transition" to="/job">All Jobs</Link>
      </li>

      {user && (
        <>
          <li>
            <Link className="hover:text-purple-400 transition" to="/myApplication">
              My Applications
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-400 transition" to="/myPostedJob">
              My Posted Job
            </Link>
          </li>
          <li>
            <Link className="hover:text-purple-400 transition" to="/addJob">
              Add Job
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="navbar px-4 lg:px-10  text-gray-800">

        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Dropdown */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden bg-white/10 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl 
              bg-gray-900/70 backdrop-blur-xl rounded-xl border border-white/20 w-56 space-y-2">
              {navItems}
            </ul>
          </div>

          <Link to="/" className="btn btn-ghost normal-case text-xl">
          <h1> Job Box</h1>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5 text-lg">{navItems}</ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end space-x-4">

          {user ? (
            <>
              {/* Profile Image */}
              <div className="tooltip tooltip-bottom" data-tip={user?.email}>
                <img
                  src={
                    users.find((u) => u.email === user?.email)?.imageURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="User"
                  className="w-11 h-11 rounded-full border-2 border-purple-400 shadow-md"
                />
              </div>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white font-semibold transition shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register">
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-xl shadow-md text-white font-semibold transition">
                  Register
                </button>
              </Link>

              <Link to="/login">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md text-white font-semibold transition">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
