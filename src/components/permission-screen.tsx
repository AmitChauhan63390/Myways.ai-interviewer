"use client";

import React from "react";

import CameraStream from "@/components/camera-stream";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Mic,
  Speaker,
  ScreenShareIcon,
  LucideUniversity,
  Clock,
  Check,
} from "lucide-react";
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
    <div className="bg-[#161d29] h-[calc(100vh-56px)] px-36 py-20">
      <div className="flex flex-col h-full">
        <div className="h-[38px] flex items-center justify-between">
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
        <div className="flex flex-row gap-20 h-full">
          <div className="w-1/2 flex items-center justify-center">
            <div className="h-[600px] py-8 min-w-full rounded-xl">
              {cameraPermission && (
                <CameraStream
                  className="h-full w-full rounded-xl"
                  flipHorizontal={true}
                />
              )}
            </div>
          </div>
          <div className="my-8 w-1/2 pl-24">
            <div className="font-bold text-white text-2xl mb-6">Instructions</div>
            <div className="flex flex-col gap-4 w-full">
              {instructions.map((instruction) => (
                <div
                  key={instruction.id}
                  className="flex flex-row items-center rounded-xl p-4 h-[70px] w-full bg-slate-700 justify-between"
                >
                  <div className="flex flex-row gap-4 items-center">
                    <div className="text-white text-xl flex-shrink-0">
                      {instruction.icon}
                    </div>
                    <div className="text-white text-xl flex-grow">
                      {instruction.content}
                    </div>
                  </div>
                  {instruction.permissionState && (
                    <Check className="text-green-500 w-6 h-6" />
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
              } text-white rounded-xl shadow-lg h-[60px] text-2xl shadow-blue-500/30 transition-all duration-300 ease-in-out`}
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
