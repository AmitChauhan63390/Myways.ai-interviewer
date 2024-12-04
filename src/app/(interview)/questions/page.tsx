"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../../../../constants';
import CameraStream from '@/components/camera-stream';

interface RecordedChunk {
  questionIndex: number;
  data: Blob;
}

export default function InterviewPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showCameraSpace, setShowCameraSpace] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);
  const [recordedChunks, setRecordedChunks] = useState<RecordedChunk[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = async () => {
    try {
      if (typeof window === 'undefined' || !navigator.mediaDevices) {
        throw new Error('Media devices not supported');
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e: BlobEvent) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setRecordedChunks(prev => [...prev, {
          questionIndex: currentQuestionIndex,
          data: blob
        }]);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setCountdown(60);
    } catch (err) {
      console.error('Error starting recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsRecording(false);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (utteranceRef.current) {
      window.speechSynthesis.cancel();
    }

    utteranceRef.current = new SpeechSynthesisUtterance(questions[currentQuestionIndex].question);
    utteranceRef.current.rate = 0.9;
    utteranceRef.current.pitch = 1;
    
    utteranceRef.current.onend = () => {
      setIsAnimating(false);
      setShowCameraSpace(true);
      startRecording();
    };

    window.speechSynthesis.speak(utteranceRef.current);
    setIsAnimating(true);

    return () => {
      window.speechSynthesis.cancel();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [currentQuestionIndex]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      handleNextQuestion();
    }
    
    return () => clearInterval(timer);
  }, [isRecording, countdown]);

  const handleNextQuestion = () => {
    stopRecording();
    setShowCameraSpace(false);
    setCurrentQuestionIndex(prev => 
      prev < questions.length - 1 ? prev + 1 : prev
    );
  };

  const handleSubmit = () => {
    stopRecording();
    setShowCameraSpace(false);
    setIsSubmitted(true);
  };

  const playRecording = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.style.width = '100%';
    
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
    modal.onclick = () => document.body.removeChild(modal);
    
    modal.appendChild(video);
    document.body.appendChild(modal);
    video.play();
  };

  const AnimatedDots = () => (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            scale: 0.5,
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)
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
  );

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#161d29] to-[#0c1015] p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-2">Interview Submissions</h1>
            <p className="text-gray-400">All your recorded responses have been saved</p>
          </div>

          <div className="grid gap-6">
            {questions.map((question, index) => {
              const recording = recordedChunks.find(r => r.questionIndex === index);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl text-white font-medium mb-2">
                        Question {index + 1}
                      </h3>
                      <p className="text-gray-400">{question.question}</p>
                    </div>
                    {recording ? (
                      <button
                        onClick={() => playRecording(recording.data)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg 
                          transition-colors flex items-center gap-2"
                      >
                        <span className="text-lg">▶</span> Play Recording
                      </button>
                    ) : (
                      <span className="text-red-400">No recording available</span>
                    )}
                  </div>
                  {recording && (
                    <div className="mt-4 text-sm text-gray-500">
                      Recording size: {(recording.data.size / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-[#161d29] to-[#0c1015] relative overflow-hidden">
      <AnimatedDots />

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl w-full px-6 flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: showCameraSpace ? -30 : 0 }}
            className="relative mb-8 w-full text-center"
          >
            <p className="text-3xl text-white font-semibold tracking-wide">
              {currentQuestionIndex + 1}/{questions.length}. {questions[currentQuestionIndex].question}
            </p>

            {isRecording && (
              <div className="absolute -top-8 right-0">
                <span className="text-red-500 font-bold animate-pulse">●</span>
                <span className="ml-2 text-white">{countdown}s</span>
              </div>
            )}

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

        <AnimatePresence>
          {showCameraSpace && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 450 }}
              exit={{ opacity: 0, height: 0 }}
              className="w-[800px] bg-gray-800/50 rounded-2xl mb-8"
            >
              <CameraStream flipHorizontal={true} className="w-full h-full rounded-xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCameraSpace && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex justify-center space-x-4 mt-8"
            >
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-xl 
                    transition-all duration-300"
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-xl 
                    transition-all duration-300"
                >
                  Save & Next
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}