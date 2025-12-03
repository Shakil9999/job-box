import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthContext from "../../../Hooks/useAuthContext";

const image_hosting_key = import.meta.env.VITE_image_hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const JobApply = () => {
  const id = useParams();

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleJobApply = async (e) => {
    e.preventDefault();
    const form = e.target;

    const fullName = form.fullName.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const linkedin = form.linkedin.value;
    const portfolio = form.portfolio.value;
    const resumeFile = form.resumeFile.files[0];
    const coverLetter = form.coverLetter.value;

    const formData = new FormData();
    formData.append("image", resumeFile);

    const res = await axios.post(image_hosting_api, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    const resumeUrl = res.data?.data?.display_url;

    const application = {
      jobId: id,
      fullName,
      applicant_email: email,
      phone,
      linkedin,
      portfolio,
      resume: resumeUrl,
      coverLetter,
    };

    // console.log("✅ Application:", application);

    axios
      .post("http://localhost:5000/job-application", application)
      .then((res) => {
        // console.log(res.data);
        form.reset();
        if (res.data.insertedId) {
          Swal.fire({
            title: "Apply SuccessFul",
            icon: "success",
            draggable: true,
          });
        }
        navigate("/myApplication");
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Job Application Form
      </h2>
      <form onSubmit={handleJobApply} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1">Full Name</label>
          <input
            required
            type="text"
            name="fullName"
            className="input input-bordered w-full"
            placeholder="Enter your full name"
          />
        </div>

        <div className="flex gap-5 w-full">
          {/* Email */}
          <div className="flex-1">
            <label className="block font-medium mb-1">Email Address</label>
            <input
              required
              type="email"
              name="email"
              defaultValue={user.email}
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          {/* Phone */}
          <div className="flex-1">
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              required
              type="tel"
              name="phone"
              className="input input-bordered w-full"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block font-medium mb-1">LinkedIn Profile</label>
          <input
            required
            type="url"
            name="linkedin"
            className="input input-bordered w-full"
            placeholder="LinkedIn URL"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="block font-medium mb-1">Portfolio/Website</label>
          <input
            required
            type="url"
            name="portfolio"
            className="input input-bordered w-full"
            placeholder="Portfolio URL"
          />
        </div>

        {/* Resume Upload */}
        {/* <div>
          <label className="block font-medium mb-1">Upload Your Resume</label>
          <input
            type="url"
            name="resume"
            className="input input-bordered w-full"
            placeholder="Resume URL"
          />
        </div> */}

        {/* Resume IMAGE Upload  */}

        <div>
          <label className="block font-medium mb-1">
            Upload Resume (IMAGE only)
          </label>
          <input
            required
            type="file"
            name="resumeFile"
            accept=".jpg,.jpeg,.png"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block font-medium mb-1">Cover Letter</label>
          <textarea
            required
            name="coverLetter"
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Write your cover letter here..."
          ></textarea>
        </div>

        {/* Submit Button (does nothing) */}
        <button type="submit" className="btn btn-primary w-full">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default JobApply;
