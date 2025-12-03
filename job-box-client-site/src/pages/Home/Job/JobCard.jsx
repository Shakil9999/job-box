import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const {
    _id,
    title,
    location,
    jobType,
    category,
    applicationDeadline,
    salaryRange,
    description,
    company_logo,
    company,
    requirements,
  } = job;
  return (
    <div className="mt-8 mb-8">
      {/* <h1>job title{job.title}</h1> */}

      <div className="card bg-base-100 w-full h-full shadow-sm">
        <div className="flex space-x-2 m-3 items-center">
          <figure>
            <img className="w-16" src={company_logo} alt="Shoes" />
          </figure>
          <div>
            <h1 className="text-xl">{company}</h1>
            <p className=" flex gap-2 items-center">
              <IoLocationSharp />
              {location}
            </p>
          </div>
        </div>

        <div className="card-body">
          <h2 className="card-title text-sm">
            {title}
            <div className="badge badge-secondary">NEW</div>
          </h2>

          <p>{description}</p>

          <div className="card-actions justify-end">

            {requirements.map((skill, index) => (
              <div key={index}
               className="badge badge-outline flex flex-wrap hover:text-white hover:bg-blue-800 border-blue-800">
                {skill}
              </div>
            ))}


          </div>
          <div>
            
          </div>
          <div className="flex justify-center gap-3 items-center">
            <div>
              <p>Salary Range: {salaryRange.min} - {salaryRange.max}</p>
            </div>
            <div>
              <Link to={`/job/${_id}`}>
                  <button className="btn btn-primary  mt-4">Apply Now</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
