import React from "react";

const InterviewInstructions: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-56px)] flex flex-col items-center justify-center">
      <div className="text-2xl font-bold mb-8 mt-5">Interview Instructions <span className="text-red-500">!!</span></div>
      <div className="text-lg mb-6">
        You're in a proctored test environment. If caught in any suspicious behavior, you will be marked <span className="text-red-500" >FAIL</span>.
      </div>
      <div className="flex  gap-8 flex-wrap max-w-[900px] h-[500px] justify-around">
        <div className="flex items-center justify-center flex-col">
          <img
            src="/img1.jpg"
            alt="Do not look off screen"
            width={120}
            height={120}
          />
          <div className="mt-2 max-w-[250px] text-center">
            1. Do not look off screen & maintain eye contact with the camera.
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <img
            src="/img2.jpg"
            alt="Avoid unusual pauses"
            width={120}
            height={120}
          />
          <div className="mt-2 max-w-[250px] text-center">
            2. Avoid unusual extended pauses & respond to questions promptly.
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <img
            src="/img3.jpg"
            alt="Be the only person visible"
            width={120}
            height={120}
          />
          <div className="mt-2 max-w-[250px] text-center">
            3. Ensure you are the only person visible in the camera frame during the interview.
          </div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <img
            src="/img4.jpg"
            alt="Don't switch tabs"
            width={120}
            height={120}
          />
          <div className="mt-2 max-w-[250px] text-center">4. Don't switch between tabs in your web browser.</div>
        </div>
        <div className="flex items-center justify-center flex-col">
          <img
            src="/img5.jpg"
            alt="Minimize the screen"
            width={120}
            height={120}
          />
          <div className="mt-2 max-w-[250px] text-center">
            5. Minimizing the screen will lead to you being kicked out.
          </div>
        </div>
      </div>
      <div className="mt-8 text-green-500">Stay focused and do your best!</div>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-8">
        I Understand, start the interview
      </button>
    </div>
  );
};

export default InterviewInstructions;