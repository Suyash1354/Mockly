import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function MocklyLanding() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const headlineRefs = useRef([]);
  const buttonRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }

    // Animate text words one by one
    headlineRefs.current.forEach((ref, index) => {
      if (ref) {
        const words = ref.querySelectorAll('.word');
        gsap.fromTo(words,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            delay: 0.3 + (index * 0.4),
            ease: "power2.out"
          }
        );
      }
    });

    // Video fade in
    if (videoRef.current) {
      gsap.fromTo(videoRef.current.parentElement,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1, 
          delay: 0.8,
          ease: "back.out(1.7)" 
        }
      );
    }

    // Image fade in
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 0.8, 
          scale: 1, 
          duration: 1, 
          delay: 1.8,
          ease: "back.out(1.7)" 
        }
      );
    }

    // Button fade in
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          delay: 2.2,
          ease: "power2.out" 
        }
      );
    }

    // Description fade in
    if (descriptionRef.current) {
      gsap.fromTo(descriptionRef.current,
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.8, 
          delay: 2.4,
          ease: "power2.out" 
        }
      );
    }

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate movement range (-1 to 1)
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;
      
      // Apply spring-like animation to video
      if (videoRef.current) {
        gsap.to(videoRef.current.parentElement, {
          x: xPercent * 30,
          y: yPercent * 30,
          rotation: xPercent * 5,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        });
      }
      
      // Apply spring-like animation to image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          x: xPercent * 40,
          y: yPercent * 40,
          rotation: xPercent * -3,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleStartInterview = () => {
    navigate('/resume');
  };

  return (
    <div className="w-full h-screen bg-[#F9F9F9] overflow-x-hidden">
      {/* Hero Section */}
      <section className="px-14 pt-8 pb-20">
        {/* Main Headline */}
        <div className="mb-20 mt-16">
          <div ref={el => headlineRefs.current[0] = el} className="flex items-center flex-wrap leading-none mb-2">
            <h1 className="text-9xl font-[PPMori-Regular] tracking-tight">
              <span className="word inline-block">PRACTICE</span>
            </h1>
            <div className="relative mx-6 my-2 w-44 h-28 rounded-full overflow-hidden bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-600 flex items-center justify-center">
              <video 
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
                autoPlay
              >
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
              </video>
            </div>
            <h1 className="text-9xl font-[PPMori-Regular] tracking-tight">
              <span className="word inline-block">SMARTER,</span>
            </h1>
          </div>
          
          <div ref={el => headlineRefs.current[1] = el} className="flex items-center flex-wrap leading-none mb-2 relative">
            <h1 className="text-9xl font-[PPMori-Regular] tracking-tight relative z-10">
              <span className="word inline-block">PERFORM</span>
            </h1>
            <h1 className="text-9xl font-[PPMori-Regular] tracking-tight ml-6 relative z-10">
              <span className="word inline-block">BETTER,</span>
            </h1>
          </div>
          
          <div ref={el => headlineRefs.current[2] = el} className="flex items-center flex-wrap leading-none relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -z-0">
              <img 
                ref={imageRef}
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=280&h=280&fit=crop" 
                alt="Watch" 
                className="w-50 h-50 object-cover shadow-lg opacity-80"
              />
            </div>
            <h1 className="text-9xl font-[PPMori-Regular] tracking-tight relative z-10">
              <span className="word inline-block">EVERY</span>
            </h1>
            <h1 className="text-9xl font-[PPMori-Regular] tracking-tight ml-6 relative z-10">
              <span className="word inline-block">TIME.</span>
            </h1>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex gap-[20vw] items-center py-8">
          <button 
            ref={buttonRef}
            onClick={handleStartInterview}
            className="bg-black text-white px-12 py-6 rounded-full text-sm font-medium flex-shrink-0 leading-snug border-2 border-black cursor-pointer transition-all duration-400 ease-out hover:bg-white hover:text-black"
          >
            START INTERVIEW →
          </button>

          <div ref={descriptionRef} className="flex-1 pt-2 font-[ppneuemontreal-medium]">
            <p className="text-gray-400 text-xs mb-3 tracking-wide">Ai-Interview</p>
            <div className="border-b border-gray-400 mb-6 w-[50vw]"></div>
            <p className="text-2xl leading-relaxed font-light w-[40vw]">
              Skip the guesswork. Mockly gives you realistic mock interviews tailored to your role and level. Fail here, learn fast, and step into your real interviews ready to win
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}