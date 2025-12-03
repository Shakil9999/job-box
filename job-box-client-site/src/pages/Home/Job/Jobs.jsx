import { useEffect, useState } from "react";
import JobCard from "./JobCard";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 6; // Showing 6 jobs per page

    useEffect(() => {
        fetch("http://localhost:5000/job")
            .then((res) => res.json())
            .then((data) => {
                setJobs(data);
            });
    }, []);

    // Calculate paginated data
    const lastIndex = currentPage * jobsPerPage;
    const firstIndex = lastIndex - jobsPerPage;
    const currentJobs = jobs.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(jobs.length / jobsPerPage);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <div className="my-10">
            {/* Heading Section */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-bold">Available Job Opportunities</h2>
                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                    Explore hundreds of job listings tailored for different skills and experience levels.
                    Find the perfect role that matches your passion and career goals.
                </p>
            </div>

            {/* Jobs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {currentJobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-4 py-2 border rounded-lg hover:bg-blue-600 hover:text-white transition disabled:opacity-40"
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 border rounded-lg transition ${
                            currentPage === index + 1
                                ? "bg-blue-600 text-white"
                                : "hover:bg-blue-600 hover:text-white"
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-4 py-2 border rounded-lg hover:bg-blue-600 hover:text-white transition disabled:opacity-40"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Jobs;
