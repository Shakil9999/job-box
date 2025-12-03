import axios from "axios";
import useAuthContext from "../../../Hooks/useAuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const image_hosting_key = import.meta.env.VITE_image_hosting;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddJob = () => {

  const { user } = useAuthContext();
  const navigate = useNavigate()

  const handleAddJob = async (e) => {
    e.preventDefault();

    const form = e.target
    // 1. Get the uploaded file
    const logoImage = e.target.company_logo.files[0];

    // 2. Upload image to ImgBB and get back img url
    const imageFormData = new FormData();
    imageFormData.append("image", logoImage);

    const res = await axios.post(image_hosting_api, imageFormData);
    const imgURL = res.data.data.display_url;
    // console.log(imgURL)

    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());
    // console.log(initialData)
    const { min, max, ...newJob } = initialData;
    // console.log(newJob)
    newJob.salaryRange = { min, max };
    // console.log(newJob)
    newJob.responsibilities = newJob.responsibilities.split("\n");
    newJob.requirements = newJob.requirements.split("\n");
    // 3. set img url to the newJob form
    newJob.company_logo = imgURL;

    axios.post("http://localhost:5000/jobs", newJob).then((res) => {
    //   console.log(res.data);
      form.reset()
      navigate('/myPostedJob')
      if (res.data.insertedId) {
        Swal.fire({
          title: "Job Added Successfully",
          icon: "success",
          draggable: true,
        });
      }
    });
  };
  return (
  <div className="py-12 bg-gray-50 min-h-screen">
    <form
      onSubmit={handleAddJob}
      className="max-w-6xl mx-auto p-10 bg-white rounded-2xl shadow-lg border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Post a New Job
      </h2>

      {/* --- Basic Job Information --- */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          Basic Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Job Title</label>
            <input type="text" name="title" className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="form-label">Location</label>
            <input type="text" name="location" className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="form-label">Job Type</label>
            <select name="jobType" className="select select-bordered w-full" required>
              <option value="">Select</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          <div>
            <label className="form-label">Category</label>
            <input type="text" name="category" className="input input-bordered w-full" required />
          </div>

          <div>
            <label className="form-label">Application Deadline</label>
            <input type="date" name="applicationDeadline" className="input input-bordered w-full" required />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="form-label">Min Salary</label>
              <input type="number" name="min" className="input input-bordered w-full" required />
            </div>

            <div className="flex-1">
              <label className="form-label">Max Salary</label>
              <input type="number" name="max" className="input input-bordered w-full" required />
            </div>
          </div>
        </div>
      </div>

      {/* --- Company Information --- */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3 text-gray-700">
          Company Information
        </h3>

        <div>
          <label className="form-label">Company Name</label>
          <input type="text" name="company" className="input input-bordered w-full" required />
        </div>

        <div className="mt-4">
          <label className="form-label">Upload Company Logo</label>
          <input type="file" name="company_logo" accept="image/*" className="file-input file-input-bordered w-full" />
        </div>
      </div>

      {/* --- Job Description Section --- */}
      <div className="mb-8 grid md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Requirements</label>
          <textarea
            name="requirements"
            className="textarea textarea-bordered w-full"
            rows="5"
            required
          ></textarea>
        </div>

        <div>
          <label className="form-label">Responsibilities</label>
          <textarea
            name="responsibilities"
            className="textarea textarea-bordered w-full"
            rows="5"
            required
          ></textarea>
        </div>
      </div>

      <div className="mb-8">
        <label className="form-label">Job Description</label>
        <textarea
          name="description"
          className="textarea textarea-bordered w-full"
          rows="5"
          required
        ></textarea>
      </div>

      {/* --- HR Section --- */}
      <div className="mb-8 grid md:grid-cols-2 gap-6">
        <div>
          <label className="form-label">Status</label>
          <select name="status" className="select select-bordered w-full">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="form-label">HR Name</label>
          <input type="text" name="hr_name" className="input input-bordered w-full" required />
        </div>

        <div className="md:col-span-2">
          <label className="form-label">HR Email</label>
          <input
            type="email"
            name="hr_email"
            defaultValue={user.email}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button className="btn btn-primary w-full text-lg py-2">Submit Job</button>
      </div>
    </form>
  </div>
);

};

export default AddJob;
