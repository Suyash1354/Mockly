import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import MocklyLanding from "./pages/LandigPage";
import Resume from "./pages/Resume";
import StartInterview from "./pages/StartInterview";

function AppContent() {
  const location = useLocation();
  const isResumePage = location.pathname === '/resume';
  const isStartInterviewPage = location.pathname === '/start-interview';

  return (
    <>
      <div className="w-full h-screen overflow-hidden">
        <Navbar />
        
        {/* Always render the landing page */}
        <div style={{ visibility: 'visible' }}>
          <MocklyLanding />
        </div>
        
        {/* Resume page as overlay - positioned below navbar */}
        {isResumePage && (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-40 pt-24">
            <Resume />
          </div>
        )}

        {/* Start Interview page as overlay - positioned below navbar */}
        {isStartInterviewPage && (
          <div className="fixed top-0 left-0 right-0 bottom-0 z-40 pt-24">
            <StartInterview />
          </div>
        )}
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;