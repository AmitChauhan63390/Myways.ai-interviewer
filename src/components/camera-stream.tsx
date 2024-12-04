"use client"
import React, { useRef, useEffect } from 'react';

interface CameraStreamProps {
  className?: string; 
  flipHorizontal?: boolean;
  flipVertical?: boolean; 
}

const CameraStream: React.FC<CameraStreamProps> = ({ className, flipHorizontal, flipVertical }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Request access to the user's camera
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      })
      .catch((err) => {
        console.error('Error accessing camera:', err);
      });

    // Cleanup on component unmount
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const transformStyles = [
    flipHorizontal ? 'scaleX(-1)' : '',
    flipVertical ? 'scaleY(-1)' : '',
  ]
    .filter(Boolean)
    .join(' '); // Combine transforms if needed

  return (
    <video
      ref={videoRef}
      className={`${className}`}
      style={{
        transform: transformStyles, // Apply transform styles
        objectFit: 'cover',
      }}
      autoPlay
      muted
    />
  );
};

export default CameraStream;
