import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    location,
    company_logo,
    company,
    description,
    requirements,
    salaryRange,
  } = job;

  return (
    <div className="mt-8 mb-8">
      <div
        className="
          bg-white
          w-full h-full 
          rounded-2xl 
          shadow-lg
          hover:shadow-2xl
          hover:-translate-y-1
          transition-all 
          duration-300 
          p-5
          border border-gray-200
        "
      >
        {/* Top Section */}
        <div className="flex gap-3 items-center">
          <figure>
            <img
              className="w-14 h-14 rounded-xl object-cover border border-gray-300"
              src={company_logo}
              alt="company logo"
            />
          </figure>

          <div>
            <h1 className="text-xl font-semibold text-gray-900">{company}</h1>

            <p className="flex gap-1 items-center text-gray-600 text-sm">
              <IoLocationSharp className="text-blue-500" />
              {location}
            </p>
          </div>
        </div>

        {/* Body Section */}
        <div className="mt-4">
          <h2 className="text-lg font-bold text-gray-800">
            {title}
            <span className="badge bg-blue-500 text-white border-0 ml-2">
              NEW
            </span>
          </h2>

          <p className="text-gray-600 text-sm mt-2">{description}</p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2 mt-4">
            {requirements.map((skill, index) => (
              <span
                key={index}
                className="
                  px-3 py-1 
                  text-sm 
                  rounded-full 
                  border border-blue-500 
                  text-blue-600
                  hover:bg-blue-600 
                  hover:text-white 
                  transition-all 
                  duration-200 
                  cursor-pointer
                "
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Footer Section */}
          <div
            className="
              mt-5 
              p-4 
              bg-gray-50 
              border border-gray-200 
              rounded-xl 
              flex 
              justify-between 
              items-center
            "
          >
            <p className="text-gray-700 text-sm">
              <span className="font-semibold text-gray-900">Salary:</span>{" "}
              {salaryRange.min} - {salaryRange.max}
            </p>

            <Link to={`/job/${_id}`}>
              <button
                className="
                  px-6 py-2 
                  rounded-lg 
                  bg-blue-600
                  text-white 
                  hover:bg-blue-700
                  hover:shadow-lg
                  transition-all 
                  duration-300
                  cursor-pointer
                "
              >
                Apply Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
