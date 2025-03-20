"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const AboutPage = () => {
  const [teamMembers, setTeamMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // This would fetch from your API if you had team members stored in MongoDB
        // For now, we'll use static data
        // const res = await axios.get('/api/team');
        // setTeamMembers(res.data);

        // Static data
        setTeamMembers([
          {
            id: 1,
            name: "Meera Patel",
            role: "Founder & Lead Artist",
            bio: "With over 15 years of experience in textile arts, Meera brings her passion for traditional crafts to every creation.",
            image: "https://via.placeholder.com/300x400?text=Meera+Patel",
          },
          {
            id: 2,
            name: "Raj Sharma",
            role: "Creative Director",
            bio: "Raj oversees the creative direction of our products, ensuring each piece meets our high standards of quality and design.",
            image: "https://via.placeholder.com/300x400?text=Raj+Sharma",
          },
          {
            id: 3,
            name: "Priya Gupta",
            role: "Master Crocheter",
            bio: "With nimble fingers and an eye for detail, Priya creates our intricate crocheted flowers and arrangements.",
            image: "https://via.placeholder.com/300x400?text=Priya+Gupta",
          },
          {
            id: 4,
            name: "Arjun Mehta",
            role: "Operations Manager",
            bio: "Arjun ensures that our workshop runs smoothly and that every order reaches our customers on time.",
            image: "https://via.placeholder.com/300x400?text=Arjun+Mehta",
          },
        ])
        setLoading(false)
      } catch (err) {
        console.error("Failed to fetch team members:", err)
        setError("Failed to load team members. Please try again later.")
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-pink-50 to-green-50 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Story
          </motion.h1>
          <motion.div
            className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          ></motion.div>
          <motion.p
            className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Discover the passion and creativity behind Brushes and Beyond, where every handcrafted item tells a story
            and brings joy to our customers' lives.
          </motion.p>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Journey</h2>
              <div className="h-1 w-16 bg-pink-500 mb-6"></div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Brushes and Beyond was born from a passion for creating beautiful, handcrafted art that brings joy to
                people's lives. What started as a hobby creating crocheted flowers for friends and family has blossomed
                into a thriving business offering a wide range of artistic products.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Founded in 2018 by Meera Patel, our small workshop in Mumbai has grown into a creative hub where a team
                of skilled artisans work together to create unique pieces that celebrate traditional craftsmanship with
                a modern twist.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Each item is carefully crafted with love and attention to detail, ensuring that every customer receives
                a unique piece of art that will be cherished for years to come. We take pride in using high-quality
                materials and supporting local artisans in India.
              </p>
            </motion.div>
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-pink-500/20 blur-3xl z-0"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-green-500/20 blur-3xl z-0"></div>
              <div className="relative rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl z-10">
                <img
                  src="https://via.placeholder.com/600x400?text=Our+Workshop"
                  alt="Our workshop"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.div
            className="rounded-2xl p-8 md:p-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Mission</h2>
                <div className="h-1 w-16 bg-green-500 mb-6"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  At Brushes and Beyond, our mission is to preserve and promote traditional craftsmanship while creating
                  beautiful, functional art that brings joy and color to everyday life. We strive to support local
                  artisans, use sustainable materials whenever possible, and create products that tell a story and forge
                  a connection between maker and owner.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Our Vision</h2>
                <div className="h-1 w-16 bg-pink-500 mb-6"></div>
                <p className="text-gray-700 dark:text-gray-300">
                  We envision a world where handmade crafts are valued for their uniqueness, quality, and the human
                  connection they represent. We aim to grow our community of artisans and customers, creating a global
                  appreciation for handcrafted art while maintaining the personal touch that makes each piece special.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Our Core Values</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"></div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
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
              <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">Craftsmanship</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                We believe in the value of handmade items and the skill, time, and love that goes into creating each
                piece.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
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
              <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">Community</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                We support local artisans and believe in creating a community that values and preserves traditional
                crafts.
              </p>
            </motion.div>
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
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
              <h3 className="text-xl font-bold mb-2 text-center text-gray-900 dark:text-white">Creativity</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                We embrace innovation while honoring traditional techniques, creating unique products that stand out.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Meet Our Team</h2>
            <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-green-500 mx-auto mb-6"></div>
          </motion.div>

          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error! </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
                    <p className="text-pink-500 dark:text-pink-400 mb-2">{member.role}</p>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            className="bg-gradient-to-r from-pink-500 to-green-500 rounded-2xl p-8 md:p-12 text-white text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Creative Journey</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Discover our handcrafted products and bring a touch of artisanal beauty to your home or gift a unique
              piece to someone special.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-white text-pink-500 hover:bg-gray-100 px-8 py-3 rounded-full font-bold transition-colors inline-block"
              >
                Shop Our Collection
              </Link>
              <Link
                to="/contact"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-full font-bold transition-colors inline-block"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage

