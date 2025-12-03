import bannerImg from "../../assets/banner img/img1.jpeg";
import bannerImg2 from "../../assets/banner img/img2.jpg";
import * as motion from "motion/react-client";

const Banner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center">
      <div className="hero-content flex-col lg:flex-row-reverse items-center justify-between w-full px-5 lg:px-20">

        {/* Floating Images Section */}
        <div className="flex-1 flex flex-col items-center lg:items-end gap-10 relative">

          <motion.img
            animate={{ y: [0, 60, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src={bannerImg}
            className="w-64 lg:w-80 rounded-3xl shadow-2xl border-4 border-purple-600/60 
            backdrop-blur-xl hover:scale-105 transition duration-500"
          />

          <motion.img
            animate={{ x: [0, 80, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            src={bannerImg2}
            className="w-64 lg:w-80 rounded-3xl shadow-2xl border-4 border-blue-600/60
            backdrop-blur-xl hover:scale-105 transition duration-500"
          />

        </div>

        {/* Text Section */}
        <div className="flex-1 lg:ml-20 text-white">
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">
            Discover Your <br />
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              Dream Job
            </span>
            <br /> Today
          </h1>

          <p className="py-6 text-gray-300 text-lg max-w-lg">
            Explore thousands of job opportunities matched to your skills.
            Build your career with confidence and connect with top recruiters
            around the world.
          </p>

          <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 
          text-white text-lg font-semibold shadow-lg hover:scale-105 transition-all duration-300">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
