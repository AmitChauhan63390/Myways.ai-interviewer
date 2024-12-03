"use client";

import React, { useState, useEffect } from 'react';
import CameraStream from "@/components/camera-stream";
import { Button } from "@/components/ui/button";
import {
  Camera,
  CameraIcon,
  Check,
  Clock,
  LucideUniversity,
  Mic,
  Microscope,
  NetworkIcon,
  Scale,
  ScreenShareIcon,
  Speaker,
  University,
  UniversityIcon,
  User,
  AlertCircle,
} from "lucide-react";
import { useRouter } from 'next/navigation';

// Define instruction types with permission status
interface Instruction {
  id: number;
  icon: React.ReactNode;
  content: string;
  checkPermission: () => Promise<boolean>;
}

const PermissionScreen: React.FC = () => {
  // State to track permission status for each instruction
  const [permissions, setPermissions] = useState<{ [key: number]: boolean }>({});
  const [isAllPermissionsGranted, setIsAllPermissionsGranted] = useState(false);

  // Instructions with permission check methods
  const instructions: Instruction[] = [
    {
      id: 1,
      icon: <Camera />,
      content: "Check Camera",
      checkPermission: async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          return true;
        } catch (error) {
          console.error("Camera permission denied:", error);
          return false;
        }
      }
    },
    {
      id: 2,
      icon: <Mic />,
      content: "Check Microphone",
      checkPermission: async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          stream.getTracks().forEach(track => track.stop());
          return true;
        } catch (error) {
          console.error("Microphone permission denied:", error);
          return false;
        }
      }
    },
    {
      id: 3,
      icon: <Speaker />,
      content: "Check Speaker",
      checkPermission: async () => {
        // Note: Browser APIs don't have a direct way to test speaker permission
        // This is a placeholder that you might want to customize based on your specific requirements
        return new Promise((resolve) => {
          try {
            // Simple audio context test
            const audioContext = new (window.AudioContext || window.AudioContext)();
            audioContext.close();
            resolve(true);
          } catch (error) {
            console.error("Speaker check failed:", error);
            resolve(false);
          }
        });
      }
    },
    {
      id: 4,
      icon: <ScreenShareIcon />,
      content: "Enable Screen Sharing",
      checkPermission: async () => {
        try {
          const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
          stream.getTracks().forEach(track => track.stop());
          return true;
        } catch (error) {
          console.error("Screen sharing permission denied:", error);
          return false;
        }
      }
    },
  ];

  // Check all permissions on component mount
  useEffect(() => {
    const checkAllPermissions = async () => {
      const permissionResults: { [key: number]: boolean } = {};
      
      for (const instruction of instructions) {
        permissionResults[instruction.id] = await instruction.checkPermission();
      }
      
      setPermissions(permissionResults);
      
      // Check if all permissions are granted
      const allGranted = Object.values(permissionResults).every(status => status);
      setIsAllPermissionsGranted(allGranted);
    };

    checkAllPermissions();
  }, []);

  // Retry a specific permission
  const retryPermission = async (instructionId: number) => {
    const instruction = instructions.find(i => i.id === instructionId);
    if (instruction) {
      const result = await instruction.checkPermission();
      setPermissions(prev => ({
        ...prev,
        [instructionId]: result
      }));
      
      // Recheck if all permissions are now granted
      const allGranted = instructions.every(i => 
        permissions[i.id] !== undefined ? permissions[i.id] : result
      );
      setIsAllPermissionsGranted(allGranted);
    }
  };

  const router = useRouter();

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
                  className={`flex flex-row items-center rounded-xl p-4 h-[70px] w-full ${
                    permissions[instruction.id] === false 
                      ? 'bg-red-800' 
                      : permissions[instruction.id] === true 
                        ? 'bg-green-800' 
                        : 'bg-gray-800'
                  } justify-between`}
                >
                  <div className="flex flex-row gap-4 items-center">
                    <div className="text-white text-xl flex-shrink-0">
                      {instruction.icon}
                    </div>
                    <div className="text-white text-xl flex-grow">
                      {instruction.content}
                    </div>
                  </div>
                  {permissions[instruction.id] === false && (
                    <Button 
                      variant="outline" 
                      className="text-white border-white"
                      onClick={() => retryPermission(instruction.id)}
                    >
                      Retry
                    </Button>
                  )}
                  {permissions[instruction.id] === true && (
                    <Check className="text-white" />
                  )}
                </div>
              ))}
            </div>
            <Button onClick={()=>{router.push('/InterviewInstructions')}}
              className={`mt-6 w-full ${
                isAllPermissionsGranted
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  : 'bg-gray-600 cursor-not-allowed'
              } text-white rounded-xl shadow-lg h-[60px] text-2xl shadow-blue-500/30 transition-all duration-300 ease-in-out`}
              disabled={!isAllPermissionsGranted}
            >
              {isAllPermissionsGranted ? 'Start Interview' : 'Complete All Checks'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionScreen;