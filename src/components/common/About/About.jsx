import React from "react";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import { FaUtensils, FaBed, FaCamera, FaHeadphonesAlt } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-white font-serif">
      {/* Hero Section with Parallax */}
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage="/images/rooms4.jpg"
        bgImageAlt="Luxury Hotel"
        strength={200}
      >
        <div className="h-screen flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-extrabold text-white z-10 text-center px-4 drop-shadow-lg"
          >
            About <span className="text-red-600">StayMate</span>
          </motion.h1>
        </div>
      </Parallax>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="about_info"
          >
            <span className="text-red-600 text-xl font-semibold">About Us</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-8">
              A Luxurious Retreat <br className="hidden md:inline" />
              Amidst Nature
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              Immerse yourself in the perfect blend of luxury and nature at
              StayMate. Our exquisite accommodations and world-class amenities
              provide an unforgettable experience, while our serene surroundings
              offer a peaceful escape from the everyday hustle.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-10 bg-red-600 text-white py-3 px-8 rounded-full hover:bg-red-700 transition duration-300 text-lg font-semibold"
            >
              Discover More
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="about_image"
          >
            <img
              src="/images/francesca-saraco-_dS27XGgRyQ-unsplash.jpg"
              alt="Luxury Hotel Room"
              className="rounded-lg shadow-2xl hover:shadow-3xl transition duration-300"
            />
          </motion.div>
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-gray-100 py-24 -mb-">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Our Services
        </h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: <FaUtensils className="text-5xl text-red-600 mb-4" />,
                title: "Gourmet Dining",
              },
              {
                icon: <FaBed className="text-5xl text-red-600 mb-4" />,
                title: "Luxurious Suites",
              },
              {
                icon: (
                  <FaHeadphonesAlt className="text-5xl text-red-600 mb-4" />
                ),
                title: "Personalized Service",
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="bg-white p-8 rounded-lg shadow-xl hover:shadow-2xl transition duration-300 text-center"
              >
                {service.icon}
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-gray-600">
                  Experience unparalleled luxury with our{" "}
                  {service.title.toLowerCase()}. We ensure every aspect of your
                  stay exceeds expectations.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Reservation Query Section */}
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage="/images/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg"
        bgImageAlt="Luxury Pool"
        strength={200}
      >
        <div className="py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-12 max-w-3xl mx-auto text-center"
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-8">
                Ready to Experience Luxury?
              </h3>
              <p className="text-xl text-gray-700 mb-8">
                Contact us anytime for reservations or inquiries:
              </p>
              <a
                href="tel:+919645106751"
                className="text-3xl font-semibold text-red-600 hover:text-red-700 transition duration-300"
              >
                +91 9645106751
              </a>
            </motion.div>
          </div>
        </div>
      </Parallax>

      {/* Instagram Gallery */}
      <div className="py-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Capture the Moment
        </h2>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              "/images/shalev-cohen-KjueSklMNyY-unsplash.jpg",
              "/images/rooms4.jpg",
              "/images/rooms3.jpg",
              "/images/rooms1.jpg",
              "/images/beautiful-luxury-outdoor-swimming-pool-hotel-resort.jpg",
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative overflow-hidden group"
              >
                <img
                  src={img}
                  alt={`Luxury Hotel Image ${index + 1}`}
                  className="w-full h-64 object-cover transition duration-300 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaCamera className="text-white w-12 h-12" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
