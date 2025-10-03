import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const StartInterview = () => {
  const pageRef = useRef(null);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  
  // Animation refs
  const timerDisplayRef = useRef(null);
  const statusDotRef = useRef(null);
  const aiBoxRef = useRef(null);
  const userBoxRef = useRef(null);
  const conversationBoxRef = useRef(null);
  const micButtonRef = useRef(null);
  const aiAvatarRef = useRef(null);
  const speakerButtonRef = useRef(null);
  const startButtonRef = useRef(null);
  const sidebarRef = useRef(null);

  // Initial page animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Page entrance
      gsap.from(pageRef.current, { 
        y: '-100%',
        duration: 0.8, 
        ease: 'power3.out' 
      });

      // Sidebar entrance
      gsap.from(sidebarRef.current, {
        x: -100,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3
      });

      // Stagger animate the main content boxes
      gsap.from([aiBoxRef.current, userBoxRef.current], {
        scale: 0.85,
        opacity: 0,
        rotationY: -15,
        duration: 1.2,
        stagger: 0.2,
        ease: 'back.out(1.4)',
        delay: 0.6
      });

      gsap.from(conversationBoxRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.2
      });

      // Continuous AI avatar glow
      gsap.to(aiAvatarRef.current, {
        boxShadow: '0 0 60px rgba(20, 184, 166, 0.6), 0 0 100px rgba(16, 185, 129, 0.3)',
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      // Subtle speaker button idle animation
      gsap.to(speakerButtonRef.current, {
        scale: 1.08,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Timer and interview state animations
  useEffect(() => {
    if (isInterviewStarted) {
      timerRef.current = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);

      // Status dot pulse
      gsap.to(statusDotRef.current, {
        scale: 1.4,
        opacity: 0.5,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut'
      });

      // Speaker icon active animation - more energetic
      gsap.to(speakerButtonRef.current, {
        scale: [1, 1.3, 1],
        rotation: [0, 5, -5, 0],
        duration: 0.8,
        repeat: -1,
        ease: 'power1.inOut'
      });

    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      gsap.killTweensOf([statusDotRef.current, speakerButtonRef.current]);
      gsap.set(statusDotRef.current, { scale: 1, opacity: 1 });
      gsap.to(speakerButtonRef.current, { 
        scale: 1, 
        rotation: 0,
        duration: 0.3 
      });
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isInterviewStarted]);

  // Timer tick animation
  useEffect(() => {
    if (isInterviewStarted && timer > 0) {
      gsap.fromTo(timerDisplayRef.current,
        { scale: 1.2, color: '#10b981', y: -3 },
        { scale: 1, color: '#000000', y: 0, duration: 0.5, ease: 'back.out(2)' }
      );
    }
  }, [timer, isInterviewStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBack = () => {
    gsap.to(pageRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.in'
    });
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    
    // Button press animation with rotation
    gsap.timeline()
      .to(micButtonRef.current, {
        scale: 0.85,
        rotation: -5,
        duration: 0.15,
        ease: 'power2.in'
      })
      .to(micButtonRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.35,
        ease: 'elastic.out(1, 0.5)'
      });

    if (!isMicOn) {
      // Mic on - create pulsing ring effect
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(micButtonRef.current, 
        { boxShadow: '0 0 0 0 rgba(239, 68, 68, 0.7)' },
        { 
          boxShadow: '0 0 0 25px rgba(239, 68, 68, 0)',
          duration: 1.5,
          ease: 'power2.out'
        }
      );
    } else {
      // Mic off - stop pulse
      gsap.killTweensOf(micButtonRef.current);
      gsap.to(micButtonRef.current, {
        boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.3
      });
    }
  };

  const handleStartInterview = () => {
    setIsInterviewStarted(true);
    setTimer(0);
    
    // Celebrate start with animations
    gsap.timeline()
      .to(startButtonRef.current, {
        scale: 0.85,
        duration: 0.15
      })
      .to(startButtonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: 'back.out(3)'
      })
      .to(startButtonRef.current, {
        scale: 1,
        duration: 0.2
      });

    // Pulse the interview boxes with rotation
    gsap.to([aiBoxRef.current, userBoxRef.current], {
      scale: 1.05,
      y: -10,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      stagger: 0.15,
      ease: 'power2.inOut'
    });

    // Flash conversation box with scale
    gsap.timeline()
      .to(conversationBoxRef.current, {
        backgroundColor: '#d1fae5',
        scale: 1.02,
        duration: 0.3
      })
      .to(conversationBoxRef.current, {
        backgroundColor: '#E8E6E1',
        scale: 1,
        duration: 0.5
      });
  };

  const handleEndInterview = () => {
    setIsInterviewStarted(false);
    setTimer(0);
    
    // End button animation
    gsap.timeline()
      .to(startButtonRef.current, {
        scale: 0.85,
        duration: 0.15
      })
      .to(startButtonRef.current, {
        scale: 1,
        duration: 0.3,
        ease: 'back.out(2)'
      });

    // Flash red with shake
    gsap.timeline()
      .to(conversationBoxRef.current, {
        backgroundColor: '#fee2e2',
        x: [-3, 3, -3, 3, 0],
        duration: 0.4
      })
      .to(conversationBoxRef.current, {
        backgroundColor: '#E8E6E1',
        duration: 0.6
      });

    // Subtle box animation on end
    gsap.to([aiBoxRef.current, userBoxRef.current], {
      scale: 0.98,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
      stagger: 0.1
    });
  };

  return (
    <div
      ref={pageRef}
      className="w-full h-screen bg-[#F9F9F9] flex overflow-hidden"
    >
      {/* Left Sidebar */}
      <div ref={sidebarRef} className="w-44 flex flex-col mt-18 ml-6">
        <div className="bg-white border border-gray-300 rounded-2xl p-5 flex flex-col gap-5 shadow-sm">
          
          {/* Timer Display */}
          <div className="bg-[#E8E6E1] rounded-2xl p-5 text-center">
            <p className="text-xs text-gray-500 mb-2 tracking-wider uppercase">Timer</p>
            <p ref={timerDisplayRef} className="text-3xl font-bold">{formatTime(timer)}</p>
          </div>

          {/* Start/End Interview Button */}
          {!isInterviewStarted ? (
            <button
              ref={startButtonRef}
              onClick={handleStartInterview}
              className="w-full bg-emerald-600 text-white px-4 py-3 rounded-full text-xs font-medium hover:bg-emerald-700 transition-colors cursor-pointer border-none"
            >
              Start
            </button>
          ) : (
            <button
              ref={startButtonRef}
              onClick={handleEndInterview}
              className="w-full bg-red-600 text-white px-4 py-3 rounded-full text-xs font-medium hover:bg-red-700 transition-colors cursor-pointer border-none"
            >
              End
            </button>
          )}

          {/* Status Indicator */}
          <div className="flex items-center gap-2 p-3 bg-[#E8E6E1] rounded-xl">
            <div ref={statusDotRef} className={`w-2.5 h-2.5 rounded-full ${isInterviewStarted ? 'bg-emerald-500' : 'bg-gray-400'}`}></div>
            <span className="text-xs text-gray-700">
              {isInterviewStarted ? 'Active' : 'Paused'}
            </span>
          </div>

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="mt-auto text-xs cursor-pointer text-gray-600 hover:text-black transition-colors bg-transparent border-none text-left p-0"
          >
            ← Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-10 py-4 overflow-hidden">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl tracking-tight font-semibold">
              Interview Session
            </h2>
          </div>

          {/* Interview Content */}
          <div className="flex-1 flex flex-col gap-4 min-h-0">
            {/* Two Box Layout */}
            <div className="flex gap-4 h-[60%]">
              {/* Left Box - AI Interviewer */}
              <div ref={aiBoxRef} className="flex-1 bg-[#E8E6E1] rounded-[2rem] border border-gray-300 p-6 flex flex-col items-center justify-center shadow-lg">
                <div ref={aiAvatarRef} className="w-32 h-32 rounded-full bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-600 mb-5 flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                    AI
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full blur-xl opacity-60 bg-teal-500"></div>
                  <div ref={speakerButtonRef} className="relative bg-black w-14 h-14 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Right Box - User */}
              <div ref={userBoxRef} className="flex-1 bg-[#E8E6E1] rounded-[2rem] border border-gray-300 p-6 flex flex-col items-center justify-between shadow-lg">
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-gray-300 mb-5 flex items-center justify-center overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-500">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <button 
                    ref={micButtonRef}
                    onClick={toggleMic}
                    className={`${isMicOn ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'} text-white w-14 h-14 rounded-full flex items-center justify-center transition-colors cursor-pointer border-none`}
                  >
                    {isMicOn ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"/>
                        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"/>
                      </svg>
                    )}
                  </button>
                </div>
                
                <div className="w-full flex gap-2 mt-4">
                  <input 
                    type="text" 
                    placeholder="Type your answer..."
                    className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black text-sm"
                  />
                  <button className="bg-black text-white w-10 h-10 rounded-full hover:bg-gray-800 transition-colors text-sm flex items-center justify-center flex-shrink-0 cursor-pointer border-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Conversation Box */}
            <div ref={conversationBoxRef} className="bg-[#E8E6E1] rounded-[2rem] border border-gray-300 p-5 h-[28%] overflow-y-auto shadow-lg">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1.5 tracking-wider uppercase">AI Interviewer</p>
                  <p className="text-base leading-relaxed text-gray-900">
                    Tell me about yourself and your background in software development.
                  </p>
                </div>
                
                <div className="pt-3 border-t border-gray-300">
                  <p className="text-xs text-gray-500 mb-1.5 tracking-wider uppercase">Your Response</p>
                  <p className="text-base leading-relaxed text-gray-500">
                    Your answer will appear here...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;