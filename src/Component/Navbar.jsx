import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const logoRef = useRef(null);
  const navPillRef = useRef(null);

  const navItems = [
    { id: 'home', label: 'HOME', href: '/' },
    { id: 'login', label: 'LOGIN', href: '#login' },
    { id: 'history', label: 'HISTORY', href: '#history' },
    { id: 'interview', label: 'START INTERVIEW', href: '/resume' },
  ];

  useEffect(() => {
    // Logo drops down from top with bounce
    if (logoRef.current) {
      gsap.fromTo(logoRef.current,
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.3,
          ease: "bounce.out"
        }
      );
    }

    // Nav pill drops down from top with bounce
    if (navPillRef.current) {
      gsap.fromTo(navPillRef.current,
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          delay: 0.5,
          ease: "bounce.out"
        }
      );

      // Animate individual nav items
      const navButtons = navPillRef.current.querySelectorAll('button');
      gsap.fromTo(navButtons,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.08,
          delay: 1.2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    
    if (item.href.startsWith('#')) {
      // Handle hash links (for same page navigation)
      const element = document.querySelector(item.href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (item.href === '/' && location.pathname === '/resume') {
      // Handle navigation back to home from resume page with animation
      const pageElement = document.querySelector('[data-resume-page]');
      if (pageElement) {
        gsap.to(pageElement, {
          y: '100%',
          duration: 0.8,
          ease: 'power3.in',
          onComplete: () => navigate(item.href),
        });
      } else {
        navigate(item.href);
      }
    } else {
      // Handle other route navigation
      navigate(item.href);
    }
  };

  return (
    <nav className="bg-[#F9F9F9] py-8 px-20 relative z-50">
      <div className="flex justify-between items-center px-16 relative">
        {/* Logo - Left side */}
        <button 
          ref={logoRef}
          onClick={(e) => handleNavClick(e, { href: '/', id: 'home' })}
          className="text-2xl font-semibold tracking-tight font-[ppneuemontreal-semibolditalic] bg-transparent border-none cursor-pointer"
        >
          MOCKLY
        </button>
        
        {/* Nav Items - Center */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div ref={navPillRef} className="bg-white rounded-full shadow-xl px-4 py-2 flex gap-2 font-[ppneuemontreal-medium]">
            {navItems.map((item) => {
              const isCTA = item.id === 'interview';
              return (
                <button
                  key={item.id}
                  onClick={(e) => handleNavClick(e, item)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`block px-6 py-3 rounded-full transition-colors text-sm cursor-pointer border-none ${
                    isCTA
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'hover:bg-[#F4F2ED] bg-transparent'
                  }`}
                  style={{
                    backgroundColor:
                      hoveredItem === item.id && !isCTA ? '#F4F2ED' : undefined
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;