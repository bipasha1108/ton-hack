import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = () => {
    const { scene } = useGLTF("/ton.glb");
    const modelRef = useRef();
  
    return <primitive ref={modelRef} object={scene} scale={[2, 2, 2]} />;
  
  };

const HeroPage: React.FC = () => {
  const [progress] = useState<number[]>([20, 0, 0, 0, 0, 0, 0, 0]);

  const documentationSections = [
    {
      title: "Introduction",
      description:
        "Learn the basics of TON blockchain, its architecture, and the key concepts required to get started.",
      progress: progress[0],
    },
    {
      title: "TVM vs EVM",
      description:
        "Understand how smart contract addresses work on TON and their role in the blockchain ecosystem.",
      progress: progress[1],
    },
    {
      title: "Getting Started",
      description:
        "Step-by-step guidance to set up your development environment and start working on TON.",
      progress: progress[2],
    },
    {
      title: "Contracts Specification",
      description:
        "Dive deep into the specification of smart contracts on TON and learn best practices for implementation.",
      progress: progress[3],
    },
    {
      title: "Message Management",
      description:
        "Explore how messages are managed and exchanged between smart contracts and external entities.",
      progress: progress[4],
    },
    {
      title: "Transaction Fees",
      description:
        "Learn about the transaction fee structure and how it ensures smooth functioning of the TON network.",
      progress: progress[5],
    },
    {
      title: "Sharding",
      description:
        "Understand the concept of sharding and how it enhances the scalability of the TON blockchain.",
      progress: progress[6],
    },
    {
      title: "Tact Language",
      description:
        "Get introduced to Tact, the programming language designed for TON smart contract development.",
      progress: progress[7],
    },
  ];

  const navigate = useNavigate();

  const handleStartCourse = (index: number) => {
    navigate(`/lesson/${index + 1}`);
  };

  return (
    <div className="bg-gray-800 text-white flex flex-col items-center justify-start min-h-screen py-10 overflow-y-auto">
      <h1 className="text-5xl font-bold mb-4">Welcome to TON Zombies</h1>
      <p className="text-lg mb-6 text-center max-w-lg">
        Master smart contract development on the TON blockchain through fun,
        interactive lessons. Build, learn, and earn rewards as you advance
        through each level!
      </p>
      {/* <div className="right">
          <Model />
        </div> */}
         <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
            <ambientLight intensity={1.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <Model />
            <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
          </Canvas>
        </div>
      <div className="w-full mt-12 px-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Course Content
        </h2>
        <p>8 Lessons</p>
        <div className="grid gap-6">
          {documentationSections.map((section, index) => (
            <div key={index} className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">{section.title}</h3>
                <span>{section.progress}% completed</span>
              </div>
              <p className="text-sm text-gray-300 mb-4">
                {section.description}
              </p>
              <div className="bg-gray-600 rounded-full h-3 mb-4">
                <div
                  className="bg-green-500 h-3 rounded-full"
                  style={{ width: `${section.progress}%` }}
                ></div>
              </div>
              <button
                onClick={() => handleStartCourse(index)}
                className="bg-blue-600 px-4 py-2 rounded-full text-white font-semibold hover:bg-blue-500 transition duration-300"
              >
                Start Course
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
