import axios from "axios";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const ViewApplication = () => {
  const applications = useLoaderData();
  const handleStatus = (e, id) => {
    console.log(e.target.value, id);
    const data = {
      status: e.target.value,
    };
    axios
      .patch(`http://localhost:5000/job-application/${id}`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          Swal.fire({
            title: "State Change Successfully",
            icon: "success",
            draggable: true,
          });
        }
      });
  };
  return (
    <div>
      <h1 className="text-3xl text-center font-semibold my-7">
        Total Application: {applications.length}
      </h1>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-5">
        {applications.map((application) => (
          <div
            key={application._id}
            className="card bg-base-100 w-full shadow-sm my-8"
          >
            <figure>
              <img src={application.resume} alt="resume" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{application.fullName}</h2>
              <p>{application.coverLetter}</p>
              <div className="card-actions justify-center">
                <select
                  onChange={(e) => handleStatus(e, application._id)}
                  defaultValue={application.status || "Change Status"}
                  className="select select-info"
                >
                  <option disabled={true}>Change Status</option>
                  <option>Set Interview</option>
                  <option>Under Review</option>
                  <option>Hired</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewApplication;
