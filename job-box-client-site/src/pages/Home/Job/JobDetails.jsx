import { Link, useLoaderData } from "react-router-dom";
import jobDetailsBanner from "../../../assets/banner img/img3.jpg"
import {
  IoBriefcaseOutline,
  IoCashOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoTimeOutline,
} from "react-icons/io5";
import { FaIndustry, FaUserTie, FaClock } from "react-icons/fa";

const JobDetails = () => {
  const job = useLoaderData();
  const {
    _id,
    title,
    company,
    category,
    jobType,
    salaryRange,
    location,
    applicationDeadline,
    updatedAt,
    experience,
    jobLevel,
    description,
    requirements,
  } = job;

  return (
    <div className="max-w-6xl mx-auto p-6">
        <div >
            <img className="w-full " src={jobDetailsBanner} alt="" />
        </div>
      <div className="my-5 flex justify-between items-center">
     <div>
           <h1 className="text-3xl font-bold text-gray-800 mb-4">Job Post For: {title}</h1>
      <p className="text-gray-600 text-lg mb-2">Company: {company}</p>
     </div>
     <div>
        <Link to={`/apply/${_id}`}>
            <button className="btn btn-primary">Apply Now</button>
        </Link>
     </div>

      </div>
      {/* Employment Information Card */}
      <div className="border rounded-lg p-6 bg-white shadow-sm mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
          Employment Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          {/* Industry */}
          <div className="flex items-start gap-2">
            <FaIndustry className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Industry</p>
              <p>{category}</p>
            </div>
          </div>

          {/* Job Level */}
          <div className="flex items-start gap-2">
            <FaUserTie className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Job Level</p>
              <p>{jobLevel || "Experienced (Non - Manager)"}</p>
            </div>
          </div>

          {/* Salary */}
          <div className="flex items-start gap-2">
            <IoCashOutline className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Salary</p>
              <p>${salaryRange?.min} - ${salaryRange?.max}</p>
            </div>
          </div>

          {/* Experience */}
          <div className="flex items-start gap-2">
            <FaClock className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Experience</p>
              <p>{experience || "1 - 2 years"}</p>
            </div>
          </div>

          {/* Job Type */}
          <div className="flex items-start gap-2">
            <IoBriefcaseOutline className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Job Type</p>
              <p>{jobType}</p>
            </div>
          </div>

          {/* Deadline */}
          <div className="flex items-start gap-2">
            <IoCalendarOutline className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Deadline</p>
              <p>{applicationDeadline}</p>
            </div>
          </div>

          {/* Updated */}
          <div className="flex items-start gap-2">
            <IoTimeOutline className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Updated</p>
              <p>{updatedAt || "10/07/2022"}</p>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-2">
            <IoLocationOutline className="mt-1 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Description and Requirements */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Job Description</h2>
        <p className="text-gray-700 mb-6">{description}</p>

        <h2 className="text-xl font-semibold mb-2">Requirements</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDetails;
