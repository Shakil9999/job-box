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
    <div>
      <form
        onSubmit={handleAddJob}
        className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Job Information Form
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Job Title */}
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="title"
              className="w-full input input-bordered"
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              className="w-full input input-bordered"
              required
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block font-medium mb-1">Job Type</label>
            <select
              name="jobType"
              className="w-full select select-bordered"
              required
            >
              <option value="">Select</option>
              <option value="Onsite">Onsite</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1">Category</label>
            <input
              type="text"
              name="category"
              className="w-full input input-bordered"
              required
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block font-medium mb-1">
              Application Deadline
            </label>
            <input
              type="date"
              name="applicationDeadline"
              className="w-full input input-bordered"
              required
            />
          </div>

          {/* Min Salary */}
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block font-medium mb-1">Min Salary</label>
              <input
                type="text"
                name="min"
                className="w-full input input-bordered"
              />
            </div>

            {/* Max Salary */}
            <div className="w-1/2">
              <label className="block font-medium mb-1">Max Salary</label>
              <input
                type="text"
                name="max"
                className="w-full input input-bordered"
              />
            </div>
          </div>

          {/* Company Name*/}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="company"
              className="w-full input input-bordered"
              required
            />
          </div>

          {/* Requirements */}
          <div className=" w-full flex-1">
            <label className="block font-semibold mt-4 mb-1">
              Requirements
            </label>
            <textarea
              name="requirements"
              className="w-full textarea textarea-bordered"
              rows="4"
              required
            />
          </div>

          {/* Responsibilities */}
          <div className="flex-1">
            <label className="block font-semibold mt-4 mb-1">
              Responsibilities
            </label>
            <textarea
              name="responsibilities"
              className="w-full textarea textarea-bordered"
              rows="4"
              required
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Job Description</label>
          <textarea
            name="description"
            className="w-full textarea textarea-bordered"
            rows="4"
            required
          />
        </div>

        {/* Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Status</label>
            <select name="status" className="w-full select select-bordered">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* HR Name */}
          <div>
            <label className="block font-medium mb-1">HR Name</label>
            <input
              type="text"
              name="hr_name"
              className="w-full input input-bordered"
              required
            />
          </div>

          {/* HR Email */}
          <div className="md:col-span-2">
            <label className="block font-medium mb-1">HR Email</label>
            <input
              type="email"
              defaultValue={user.email}
              name="hr_email"
              className="w-full input input-bordered"
              required
            />
          </div>
        </div>

        {/* Company Logo URL */}
        <div>
          <label className="block font-medium mb-1">
            Upload Company Logo (IMAGE only)
          </label>
          <input
            type="file"
            name="company_logo"
            accept=".jpg,.jpeg,.png"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-6">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddJob;
