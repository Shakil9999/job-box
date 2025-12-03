import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../Provider/AuthContext";
import Swal from "sweetalert2";
import logo from "../../assets/logo.png";
import axios from "axios";
import { FaUserAltSlash } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  // const {}

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      console.log(res.data);
      setUsers(res.data);
    });
  }, []);

  const handleLogout = () => {
    logoutUser().then(() => {
      Swal.fire({
        title: "Logout Successful",
        icon: "success",
        draggable: true,
      });
    });
  };
  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/">About us</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>

      <li>
        <Link to="/job">All Jobs</Link>
      </li> 

      {user && (
        <>
          <li>
            <Link to="/myApplication">My Applications</Link>
          </li>
          <li>
            <Link to="/myPostedJob">My Posted Job</Link>
          </li>
          <li>
            <Link to="/addJob">Add job</Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">
          <img className="w-12 " src={logo} alt="" />
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end space-x-3">
        {user ? (
          <>
            <div>
              <img
                src={
                  users.find((u) => u.email === user?.email)?.imageURL ||
                  <FaUserAltSlash></FaUserAltSlash>
                }
                alt="User"
                className="w-10 h-10 rounded-full"
              />
            </div>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="btn btn-success">Register</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-error">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
