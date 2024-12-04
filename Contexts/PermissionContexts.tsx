"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the context structure
interface PermissionContextProps {
  cameraPermission: boolean;
  microphonePermission: boolean;
  speakerPermission: boolean;
  screenSharePermission: boolean;
  isAllPermissionsGranted: boolean;
  grantCameraPermission: () => Promise<boolean>;
  grantMicrophonePermission: () => Promise<boolean>;
  grantSpeakerPermission: () => Promise<boolean>;
  grantScreenSharePermission: () => Promise<boolean>;
}

const PermissionContext = createContext<PermissionContextProps | undefined>(
  undefined
);

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cameraPermission, setCameraPermission] = useState(false);
  const [microphonePermission, setMicrophonePermission] = useState(false);
  const [speakerPermission, setSpeakerPermission] = useState(false);
  const [screenSharePermission, setScreenSharePermission] = useState(false);
  const [isAllPermissionsGranted, setIsAllPermissionsGranted] = useState(false);

  const grantCameraPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      return true;
    } catch (error) {
      console.error("Camera permission denied:", error);
      return false;
    }
  };

  const grantMicrophonePermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophonePermission(true);
      return true;
    } catch (error) {
      console.error("Microphone permission denied:", error);
      return false;
    }
  };

  const grantSpeakerPermission = async () => {
    try {
      setSpeakerPermission(true);
      return true;
    } catch (error) {
      console.error("Speaker permission denied:", error);
      return false;
    }
  };

  const grantScreenSharePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false,
      });

      stream.getVideoTracks()[0].onended = () => {
        setScreenSharePermission(false);
      };

      setScreenSharePermission(true);
      return true;
    } catch (error) {
      console.error("Screen sharing permission denied:", error);
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      const camera = await grantCameraPermission();
      const mic = await grantMicrophonePermission();
      const speaker = await grantSpeakerPermission();
      const screenShare = await grantScreenSharePermission();

      setIsAllPermissionsGranted(camera && mic && speaker && screenShare);
    })();
  }, []);

  return (
    <PermissionContext.Provider
      value={{
        cameraPermission,
        microphonePermission,
        speakerPermission,
        screenSharePermission,
        isAllPermissionsGranted,
        grantCameraPermission,
        grantMicrophonePermission,
        grantSpeakerPermission,
        grantScreenSharePermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};


export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within PermissionProvider");
  }
  return context;
};
