"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../../../../constants';
import CameraStream from '@/components/camera-stream';

const InterviewQuestionsPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCameraSpace, setShowCameraSpace] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    
    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    // Create new utterance
    utteranceRef.current = new SpeechSynthesisUtterance(questions[currentQuestionIndex].question);
    
    // Optional: Customize speech synthesis
    utteranceRef.current.rate = 0.9; // Slightly slower speech
    utteranceRef.current.pitch = 1; // Normal pitch

    // Speak the question
    window.speechSynthesis.speak(utteranceRef.current);

    // Animation and camera space show logic
    setIsAnimating(true);
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
      setShowCameraSpace(true);
    }, 2000);

    return () => {
      clearTimeout(animationTimeout);
      window.speechSynthesis.cancel();
    };
  }, [currentQuestionIndex]);

  const handleNextQuestion = () => {
    setShowCameraSpace(false);
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePreviousQuestion = () => {
    setShowCameraSpace(false);
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <div 
      className="flex items-center justify-center h-screen bg-gradient-to-br from-[#161d29] to-[#0c1015] relative overflow-hidden"
    >
      {/* Background Animated Dots */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [0.5, 1, 0.5],
              transition: { 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity 
              }
            }}
            className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl w-full px-6 flex flex-col items-center"
      >
        {/* Question Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 0 }}
            animate={{ 
              opacity: 1, 
              y: showCameraSpace ? -30 : 0
            }}
            transition={{ 
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="relative mb-8 w-full text-center"
          >
            <p className="text-3xl text-white font-semibold tracking-wide">
              {currentQuestionIndex + 1}/{questions.length}.  
              {questions[currentQuestionIndex].question}
            </p>

            {/* Speaking Animation */}
            {isAnimating && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
                <motion.div 
                  className="w-24 h-24 bg-blue-500/30 rounded-full absolute"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0.2, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
                <div className="w-16 h-16 bg-blue-500 rounded-full animate-ping" />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Camera Space */}
        <AnimatePresence>
          {showCameraSpace && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: 1, 
                height: 450,
                transition: { 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }
              }}
              exit={{ 
                opacity: 0, 
                height: 0,
                transition: { duration: 0.3 }
              }}
              className="w-[800px] bg-gray-800/50 rounded-2xl mb-8"
            >
              {/* Placeholder for camera stream */}
              <div className="w-full h-full flex items-center justify-center text-white opacity-50">
                <CameraStream flipHorizontal={true} className='w-full h-full rounded-xl' />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <AnimatePresence>
          {showCameraSpace && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex justify-center space-x-4 mt-8"
            >
              {/* <button
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-full 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button> */}
              <button
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === questions.length - 1}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl 
                  transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save & Next
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default InterviewQuestionsPage;