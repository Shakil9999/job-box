import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuthContext from "../../../Hooks/useAuthContext";

const image_hosting_key = import.meta.env.VITE_image_hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JobApply = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

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

    axios.post("https://job-box-server-lilac.vercel.app/job-application", application).then((res) => {
      form.reset();
      if (res.data.insertedId) {
        Swal.fire({
          title: "Application Submitted Successfully!",
          icon: "success",
          draggable: true,
        });
      }
      navigate("/myApplication");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Job Application Form
        </h2>

        <form onSubmit={handleJobApply} className="space-y-6">

          {/* --- Personal Information --- */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Personal Information</h3>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input input-bordered w-full"
              required
            />

            <div className="flex gap-4">
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                placeholder="Email Address"
                className="input input-bordered flex-1"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="input input-bordered flex-1"
                required
              />
            </div>
          </div>

          {/* --- Online Presence --- */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-700">Online Presence</h3>
            <input
              type="url"
              name="linkedin"
              placeholder="LinkedIn Profile URL"
              className="input input-bordered w-full"
              required
            />
            <input
              type="url"
              name="portfolio"
              placeholder="Portfolio / Website URL"
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* --- Resume Upload --- */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">Resume Upload</h3>
            <input
              type="file"
              name="resumeFile"
              accept=".jpg,.jpeg,.png"
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          {/* --- Cover Letter --- */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-700">Cover Letter</h3>
            <textarea
              name="coverLetter"
              rows="5"
              placeholder="Write your cover letter..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          {/* --- Submit Button --- */}
          <button
            type="submit"
            className="btn btn-primary w-full py-3 text-lg hover:shadow-lg transition-all duration-200"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
