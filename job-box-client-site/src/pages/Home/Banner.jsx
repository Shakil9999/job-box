import bannerImg from "../../assets/banner img/img1.jpeg";
import bannerImg2 from "../../assets/banner img/img2.jpg";
import * as motion from "motion/react-client";
const Banner = () => {
  return (
    <div className="hero bg-base-200 min-h-96">
      <div className=" hero-content flex-col lg:flex-row-reverse  items-center justify-between">
        <div className="flex-1">
          <motion.img
            animate={{ y: [0, 50, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            src={bannerImg}
            className="max-w-sm w-72 rounded-t-[30px] rounded-r-[30px] border-l-6 border-b-6 border-blue-700  shadow-2xl"
          />
          <motion.img
            animate={{ x: [50, 150, 50] }}
            transition={{ duration: 10, repeat: Infinity }}
            src={bannerImg2}
            className="max-w-sm w-72 rounded-t-[30px] rounded-r-[30px] border-l-6 border-b-6 border-blue-700  shadow-2xl"
          />
        </div>
        <div className="flex-1 lg:ml-16">
          <h1 className="text-5xl font-bold">Find Your JOB Now</h1>
          <p className="py-6">
            Responsible for performing assigned duties efficiently while
            supporting team goals and maintaining company standards. Must be
            adaptable, dependable, and committed to delivering quality results
            in a fast-paced environment.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
