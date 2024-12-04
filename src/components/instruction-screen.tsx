"use client";
import {
  CameraIcon,
  Clock,
  LucideUniversity,
  Microscope,
  NetworkIcon,
  Scale,
  User,
} from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import CameraStream from "./camera-stream";
import { useRouter } from "next/navigation";

const instructions = [
  {
    id: 1,
    icon: <NetworkIcon />,
    content: "Ensure stable internet connection and choose a clean quiet place.",
  },
  {
    id: 2,
    icon: <CameraIcon />,
    content: "Permission for camera, microphone and entire screen sharing is required.",
  },
  {
    id: 3,
    icon: <User />,
    content: "Be in professional attire and avoid any distractions.",
  },
  {
    id: 4,
    icon: <Microscope />,
    content: "Give detailed answer responses and provide as much information as possible.",
  },
  {
    id: 5,
    icon: <Scale />,
    content: "Answer the questions with examples and the projects you worked on.",
  },
];

const InstructionScreen = () => {
  const router = useRouter();
  return (
    <div className="min-h-[calc(100vh-56px)] bg-[#161d29] p-4 md:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            Trainee Interview
          </h1>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 p-2">
              <span className="text-orange-500">
                <LucideUniversity />
              </span>
              <span className="text-base text-white md:text-lg">Zeko</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 p-2">
              <span className="text-orange-500">
                <Clock />
              </span>
              <span className="text-base text-white md:text-lg">26 Minutes</span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="flex items-center justify-center">
            <div className="h-[300px] w-full overflow-hidden rounded-xl sm:h-[400px] md:h-[500px]">
              <CameraStream
                className="h-full w-full rounded-xl object-cover"
                flipHorizontal={true}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-6 text-xl font-bold text-white md:text-2xl lg:text-3xl">
              Instructions
            </h2>
            <div className="flex flex-col gap-4">
              {instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex items-center gap-4 rounded-xl bg-gray-800 p-4"
                >
                  <div className="text-xl text-white">
                    {instruction.icon}
                  </div>
                  <div className="text-sm text-white sm:text-base lg:text-lg">
                    {instruction.content}
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={() => router.push("/permissions")}
              className="mt-6 h-14 w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-700 hover:to-purple-700 md:text-xl"
            >
              Start Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionScreen;