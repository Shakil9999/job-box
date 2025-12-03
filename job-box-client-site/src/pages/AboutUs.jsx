const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-5">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">About Us</h1>
        <p className="text-gray-600 text-lg mb-4">
          At ACME Industries, we are dedicated to delivering top-notch technology
          solutions that empower businesses and individuals alike. Our passion for
          innovation drives us to continually improve and deliver excellence.
        </p>
        <p className="text-gray-600 text-lg">
          Founded in 1992, we have built a team of talented professionals committed
          to creating a meaningful impact. Our goal is not just to meet expectations,
          but to exceed them.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-600">
            To innovate and deliver high-quality products that enhance the
            lives of our customers while maintaining integrity, sustainability,
            and social responsibility.
          </p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">Our Vision</h2>
          <p className="text-gray-600">
            To become a global leader in technology solutions, inspiring progress
            and setting new standards for excellence, creativity, and customer satisfaction.
          </p>
        </div>
      </section>

      {/* Team / Values Section */}
      <section className="max-w-4xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Integrity</h3>
            <p className="text-gray-600">
              We conduct our business with honesty, transparency, and accountability.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Innovation</h3>
            <p className="text-gray-600">
              Constantly improving, creating, and embracing new ideas to stay ahead.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h3 className="text-xl font-semibold mb-2 text-blue-600">Excellence</h3>
            <p className="text-gray-600">
              Delivering the highest quality in everything we do, exceeding expectations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
