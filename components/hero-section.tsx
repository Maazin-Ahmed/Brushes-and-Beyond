"use client"

import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, Text, Float, MeshDistortMaterial } from "@react-three/drei"

import { Button } from "@/components/ui/button"

function FloralSphere({ position = [0, 0, 0], color = "#ff69b4", scale = 1 }) {
  const meshRef = useRef(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial color={color} speed={2} distort={0.3} radius={1} roughness={0.4} metalness={0.2} />
    </mesh>
  )
}

function FlowerModel() {
  const groupRef = useRef(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.01
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Create a flower using basic geometries */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#ff69b4" />
        </mesh>

        {/* Petals */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 0.8
          const z = Math.sin(angle) * 0.8
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, -angle, 0]}>
              <sphereGeometry args={[0.4, 32, 16]} />
              <meshStandardMaterial color="#ff8dc7" />
            </mesh>
          )
        })}

        {/* Stem */}
        <mesh position={[0, -1, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 2]} />
          <meshStandardMaterial color="#4bc080" />
        </mesh>
      </group>
    </Float>
  )
}

function ThemeText() {
  return (
    <Text
      position={[0, -2, 0]}
      fontSize={0.5}
      color="#ff69b4"
      anchorX="center"
      anchorY="middle"
      font="/fonts/Inter-Bold.woff"
      curveRadius={-5}
    >
      Handcrafted with Love
    </Text>
  )
}

export function HeroSection() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative overflow-hidden hero-gradient min-h-[90vh] flex items-center">
      <div className="absolute inset-0 floral-pattern opacity-50" />
      <div className="container py-16 md:py-24 flex flex-col md:flex-row items-center relative z-10">
        <motion.div
          className="flex-1 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="creative-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Blooming Art <br />
            <span className="text-secondary">Crafted with Passion</span>
          </h1>
          <motion.p
            className="creative-subheading text-xl md:text-2xl text-muted-foreground mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Discover unique handmade crocheted flowers, custom keychains, and artistic creations that bring joy and
            beauty to your life.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="rounded-full text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300"
            >
              <Link href="/shop">Explore Collection</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full text-lg px-8 py-6 border-2 hover:bg-accent/20 transition-all duration-300"
            >
              <Link href="/about">Our Story</Link>
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="flex-1 h-[400px] md:h-[500px] w-full mt-8 md:mt-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ y, opacity }}
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-[80%] h-[80%]" />
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />

              <FloralSphere position={[-3, 2, -5]} color="#ff69b4" scale={0.8} />
              <FloralSphere position={[3, -2, -5]} color="#4bc080" scale={0.6} />
              <FloralSphere position={[4, 3, -8]} color="#ffdf5e" scale={1.2} />

              <FlowerModel />
              <ThemeText />
              <Environment preset="sunset" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={1}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </Canvas>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </section>
  )
}

