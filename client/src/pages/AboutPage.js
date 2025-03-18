"use client"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const AboutPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Our Story</h1>
        <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"></div>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the passion and creativity behind Brushes and Beyond, where every handcrafted item tells a story and
          brings joy to our customers' lives.
        </p>
      </motion.div>

      {/* Our Journey Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-playfair font-bold mb-6">Our Journey</h2>
          <p className="text-gray-600 mb-4">
            Brushes and Beyond was born from a passion for creating beautiful, handcrafted art that brings joy to
            people's lives. What started as a hobby creating crocheted flowers for friends and family has blossomed into
            a thriving business offering a wide range of artistic products.
          </p>
          <p className="text-gray-600 mb-4">
            Founded in 2018 by Meera Patel, our small workshop in Mumbai has grown into a creative hub where a team of
            skilled artisans work together to create unique pieces that celebrate traditional craftsmanship with a
            modern twist.
          </p>
          <p className="text-gray-600">
            Each item is carefully crafted with love and attention to detail, ensuring that every customer receives a
            unique piece of art that will be cherished for years to come. We take pride in using high-quality materials
            and supporting local artisans in India.
          </p>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-green-500/20 blur-3xl"></div>
          <div className="relative rounded-2xl overflow-hidden border-4 border-white shadow-xl h-full">
            <img
              src="/images/about-journey.jpg"
              alt="Our workshop"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/600x400?text=Our+Workshop"
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <motion.div
        className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600">
              At Brushes and Beyond, our mission is to preserve and promote traditional craftsmanship while creating
              beautiful, functional art that brings joy and color to everyday life. We strive to support local artisans,
              use sustainable materials whenever possible, and create products that tell a story and forge a connection
              between maker and owner.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-playfair font-bold mb-6">Our Vision</h2>
            <p className="text-gray-600">
              We envision a world where handmade crafts are valued for their uniqueness, quality, and the human
              connection they represent. We aim to grow our community of artisans and customers, creating a global
              appreciation for handcrafted art while maintaining the personal touch that makes each piece special.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Core Values */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Craftsmanship</h3>
            <p className="text-gray-600 text-center">
              We believe in the value of handmade items and the skill, time, and love that goes into creating each
              piece.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Community</h3>
            <p className="text-gray-600 text-center">
              We support local artisans and believe in creating a community that values and preserves traditional
              crafts.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Creativity</h3>
            <p className="text-gray-600 text-center">
              We embrace innovation while honoring traditional techniques, creating unique products that stand out.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-playfair font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/team-meera.jpg"
                alt="Meera Patel"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400?text=Meera+Patel"
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">Meera Patel</h3>
              <p className="text-pink-500 mb-2">Founder & Lead Artist</p>
              <p className="text-gray-600 text-sm">
                With over 15 years of experience in textile arts, Meera brings her passion for traditional crafts to
                every creation.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/team-raj.jpg"
                alt="Raj Sharma"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400?text=Raj+Sharma"
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">Raj Sharma</h3>
              <p className="text-green-500 mb-2">Creative Director</p>
              <p className="text-gray-600 text-sm">
                Raj oversees the creative direction of our products, ensuring each piece meets our high standards of
                quality and design.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/team-priya.jpg"
                alt="Priya Gupta"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400?text=Priya+Gupta"
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">Priya Gupta</h3>
              <p className="text-blue-500 mb-2">Master Crocheter</p>
              <p className="text-gray-600 text-sm">
                With nimble fingers and an eye for detail, Priya creates our intricate crocheted flowers and
                arrangements.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
            <div className="h-64 overflow-hidden">
              <img
                src="/images/team-arjun.jpg"
                alt="Arjun Mehta"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400?text=Arjun+Mehta"
                }}
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold mb-1">Arjun Mehta</h3>
              <p className="text-purple-500 mb-2">Operations Manager</p>
              <p className="text-gray-600 text-sm">
                Arjun ensures that our workshop runs smoothly and that every order reaches our customers on time.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="bg-gradient-to-r from-pink-500 to-green-500 rounded-2xl p-8 md:p-12 text-white text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-playfair font-bold mb-4">Join Our Creative Journey</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Discover our handcrafted products and bring a touch of artisanal beauty to your home or gift a unique piece to
          someone special.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Shop Our Collection
          </Link>
          <Link
            to="/contact"
            className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-bold transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default AboutPage

