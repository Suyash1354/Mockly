import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

export default function Resume() {
  const navigate = useNavigate();
  const pageRef = useRef(null);
  const [formData, setFormData] = useState({
    resume: null,
    role: '',
    experienceLevel: 'Beginner'
  });
  const [error, setError] = useState('');

  useEffect(() => {
    // Page slides in from bottom
    gsap.set(pageRef.current, { y: '100%' });
    gsap.to(pageRef.current, { y: 0, duration: 0.8, ease: 'power3.out' });
  }, []);

  const handleBack = () => {
    gsap.to(pageRef.current, {
      y: '100%',
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => navigate('/'),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, resume: file });
    if (error) setError('');
  };

  const handleRoleChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
    if (error) setError('');
  };

  const handleLevelChange = (e) => {
    setFormData({ ...formData, experienceLevel: e.target.value });
    if (error) setError('');
  };

  const handleStartInterview = () => {
    // Validate form
    if (!formData.resume) {
      setError('Please upload your resume');
      return;
    }
    if (!formData.role.trim()) {
      setError('Please enter your role');
      return;
    }

    // If validation passes, proceed
    setError('');
    gsap.to(pageRef.current, {
      y: '100%',
      duration: 0.8,
      ease: 'power3.in',
      onComplete: () => navigate('/start-interview'),
    });
  };

  return (
    <div
      ref={pageRef}
      data-resume-page
      className="w-full h-screen bg-[#F9F9F9] px-14 py-8 overflow-y-auto"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl tracking-tight">
            Start Interview
          </h2>
          <button
            onClick={handleBack}
            className="text-sm cursor-pointer text-gray-600 hover:text-black transition-colors bg-transparent border-none"
          >
            ← Back to Home
          </button>
        </div>

        {/* Interview Content */}
        <div className="bg-white rounded-3xl p-12 shadow-sm">
          <div className="mb-8">
            <h3 className="text-3xl mb-4">
              Welcome to Your Mock Interview
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Get ready to practice with AI-powered interview simulations tailored
              to your role and experience level.
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-b border-gray-200 pb-6">
              <label className="block text-sm text-gray-700 mb-2">
                Upload Your Resume
              </label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:bg-black file:text-white hover:file:bg-gray-800"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>

            <div className="border-b border-gray-200 pb-6">
              <label className="block text-sm text-gray-700 mb-2">
                Role
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={handleRoleChange}
                placeholder="e.g., Software Engineer, Product Manager, Data Scientist"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="border-b border-gray-200 pb-6">
              <label className="block text-sm text-gray-700 mb-2">
                Experience Level
              </label>
              <select 
                value={formData.experienceLevel}
                onChange={handleLevelChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Expert</option>
              </select>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button 
              onClick={handleStartInterview}
              className="w-full bg-black text-white px-12 py-4 rounded-full text-base mt-8 hover:bg-gray-800 transition-colors border-none cursor-pointer"
            >
              Begin Interview Session →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}