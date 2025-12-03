import axios from "axios";
import { useEffect, useState } from "react";
import useAuthContext from "../../../Hooks/useAuthContext";
import { MdDeleteForever, MdUpdate } from "react-icons/md";
import { FaUsersViewfinder } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MyPostedJob = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    axios.get(`https://job-box-server-lilac.vercel.app/job?email=${user?.email}`).then((res) => {
      setJobs(res.data);
    });
  }, [user.email]);
  return (
    <div>
      <h1 className="text-3xl font-semibold text-center my-3">
        Total Application: {jobs.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Company Logo</th>
              <th>Company Name</th>
              <th>Total Application</th>
              <th>View </th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={job.company_logo} alt="company_logo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{job.company}</div>
                      <div className="text-sm opacity-50">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td>{job.title}</td>
                <td>TODO</td>
                <td>
                  <Link to={`/viewApplication/${job._id}`}>
                    <button className="btn btn-ghost ">
                      <FaUsersViewfinder className="text-2xl text-red-700"></FaUsersViewfinder>
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-ghost ">
                    <MdUpdate className="text-2xl text-red-700"></MdUpdate>
                  </button>
                </td>
                <td>
                  <button className="btn btn-ghost ">
                    <MdDeleteForever className="text-2xl text-red-700"></MdDeleteForever>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedJob;
