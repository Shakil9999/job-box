import axios from "axios";
import useAuthContext from "../../../Hooks/useAuthContext";
import { useEffect, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyApplication = () => {
  const { user } = useAuthContext();
  console.log(user.email)
  const [applications, setApplication] = useState([]);
  const axiosSecure = useAxiosSecure()
  // const navigate = useNavigate()
  useEffect(() => {
    // axios
    //   .get(`http://localhost:5000/job-application?email=${user.email}`, {withCredentials: true})
    //   .then((res) => {
    //     // console.log(res.data)
    //     setApplication(res.data);
    //   });

    axiosSecure.get(`job-application?email=${user.email}`)
    .then(res=>{
      setApplication(res.data)
    })
  }, [user?.email, axiosSecure]);

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-5">Total Application: {applications.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Sl</th>
              <th>Company Logo & Name</th>
              <th>Job Title</th>
              <th>Delete</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application, index) => (
              <tr key={application._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={application.company_logo}
                          alt="company_logo"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{application.company}</div>
                      <div className="text-sm opacity-50">{application.location}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {application.title}
          
                </td>
                <td>
                    <button className="btn btn-ghost btn-xs"><MdDeleteForever className='text-2xl text-red-600 '></MdDeleteForever ></button>
                </td>
                <td>
                  {
                    application?.status ? application.status : "Pending"
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplication;
