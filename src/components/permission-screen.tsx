"use client";

import React from "react";
import CameraStream from "@/components/camera-stream";
import { Button } from "@/components/ui/button";
import { Camera, Mic, Speaker, ScreenShareIcon, LucideUniversity, Clock, Check } from 'lucide-react';
import { useRouter } from "next/navigation";
import { usePermissions } from "../../Contexts/PermissionContexts";

const PermissionScreen: React.FC = () => {
  const {
    cameraPermission,
    microphonePermission,
    speakerPermission,
    screenSharePermission,
    isAllPermissionsGranted,
    grantCameraPermission,
    grantMicrophonePermission,
    grantSpeakerPermission,
    grantScreenSharePermission,
  } = usePermissions();

  const router = useRouter();

  const instructions = [
    { id: 1, icon: <Camera />, content: "Check Camera", fn: grantCameraPermission, permissionState: cameraPermission },
    { id: 2, icon: <Mic />, content: "Check Microphone", fn: grantMicrophonePermission, permissionState: microphonePermission },
    { id: 3, icon: <Speaker />, content: "Check Speaker", fn: grantSpeakerPermission, permissionState: speakerPermission },
    { id: 4, icon: <ScreenShareIcon />, content: "Enable Screen Sharing", fn: grantScreenSharePermission, permissionState: screenSharePermission },
  ];

  return (
    <div className="bg-[#161d29] min-h-[calc(100vh-56px)] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 py-6 sm:py-8 md:py-12 lg:py-16">
      <div className="flex flex-col h-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 md:mb-10">
          <div className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-0">Trainee Interview</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="border-gray-300 border-[1px] p-2 rounded-xl flex flex-row gap-2 items-center">
              <span className="text-orange-500">
                <LucideUniversity />
              </span>
              <span className="text-white text-lg sm:text-xl">Zeko</span>
            </div>
            <div className="border-gray-300 border-[1px] p-2 rounded-xl flex flex-row gap-2 items-center">
              <span className="text-orange-500">
                <Clock />
              </span>
              <span className="text-white text-lg sm:text-xl">26 Minutes</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2 flex items-center justify-center">
            <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden">
              {cameraPermission && (
                <CameraStream
                  className="h-full w-full object-cover"
                  flipHorizontal={true}
                />
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="font-bold text-white text-xl sm:text-2xl mb-4 sm:mb-6">Instructions</div>
            <div className="flex flex-col gap-4 w-full">
              {instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex flex-row items-center rounded-xl p-3 sm:p-4 h-[60px] sm:h-[70px] w-full bg-slate-700 justify-between"
                >
                  <div className="flex flex-row gap-3 sm:gap-4 items-center">
                    <div className="text-white text-lg sm:text-xl flex-shrink-0">
                      {instruction.icon}
                    </div>
                    <div className="text-white text-base sm:text-lg md:text-xl flex-grow">
                      {instruction.content}
                    </div>
                  </div>
                  {instruction.permissionState && (
                    <Check className="text-green-500 w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </div>
              ))}
            </div>
            <Button
              onClick={() => router.push("/InterviewInstructions")}
              className={`mt-6 w-full ${
                isAllPermissionsGranted
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  : "bg-gray-600 cursor-not-allowed"
              } text-white rounded-xl shadow-lg h-[50px] sm:h-[60px] text-lg sm:text-xl md:text-2xl shadow-blue-500/30 transition-all duration-300 ease-in-out`}
              disabled={!isAllPermissionsGranted}
            >
              {isAllPermissionsGranted ? "Start Interview" : "Complete All Checks"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionScreen;

