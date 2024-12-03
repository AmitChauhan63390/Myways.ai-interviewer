"use client";
import {
  CameraIcon,
  Clock,
  LucideUniversity,
  Microscope,
  NetworkIcon,
  Scale,
  University,
  UniversityIcon,
  User,
} from "lucide-react";
import React, { use, useState } from "react";
import { Button } from "./ui/button";
import CameraStream from "./camera-stream";
import { useRouter } from "next/navigation";








const instructions = [
  {
    id: 1,
    icon: <NetworkIcon />,
    content:
      "Ensure stable internet connection and choose a clean quiet place.",
  },
  {
    id: 2,
    icon: <CameraIcon />,
    content:
      "Permission for camera, microphone and entire screen sharing is required.",
  },
  {
    id: 3,
    icon: <User />,
    content: "Be in professional attire and avoid any distractions.",
  },
  {
    id: 4,
    icon: <Microscope />,
    content:
      "Give detailed answer responses and provide as much imformation as possible.",
  },
  {
    id: 5,
    icon: <Scale />,
    content:
      "Answer the questions with examples and the projects you worked on.",
  },
];

const InstructionScreen = () => {

    const router=useRouter();
  return (
    <div className="bg-[#161d29] h-[calc(100vh-56px)] px-36 py-20">
      <div className=" flex flex-col h-full">
        <div className=" h-[38px] flex items-center justify-between">
          <div className="text-white text-4xl font-bold">Trainee Interview</div>
          <div className="flex flex-row gap-4">
            <div className="border-gray-300 border-[1px] p-2 rounded-xl flex flex-row gap-2 items-center">
              <span className="text-orange-500">
                <LucideUniversity />
              </span>
              <span className="text-white text-xl">Zeko</span>
            </div>
            <div className="border-gray-300 border-[1px] p-2 rounded-xl flex flex-row gap-2 items-center">
              <span className="text-orange-500">
                <Clock />
              </span>
              <span className="text-white text-xl">26 Minutes</span>
            </div>
          </div>
        </div>
        <div className=" flex flex-row gap-20  h-full">
          <div className="w-1/2 flex items-center justify-center">
            <div className=" h-[600px]  py-8 min-w-full rounded-xl">
              <CameraStream
                className="h-full w-full rounded-xl"
                flipHorizontal={true}
              />
            </div>
          </div>
          <div className="my-8 w-1/2 pl-24">
            <div className="font-bold text-white text-2xl mb-6">
              Instructions
            </div>
            <div className="flex flex-col gap-4 w-full">
              {instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex flex-row gap-4 items-center rounded-xl p-4 h-[70px] w-full bg-gray-800"
                >
                  <div className="text-white text-xl flex-shrink-0">
                    {instruction.icon}
                  </div>
                  <div className="text-white text-xl flex-grow">
                    {instruction.content}
                  </div>
                </div>
              ))}
            </div>
            <Button onClick={()=>{
                router.push('/permissions')
            }} className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg h-[60px] text-2xl shadow-blue-500/30 transition-all duration-300 ease-in-out">
              Start Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;
