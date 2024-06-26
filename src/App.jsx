import React, { useState, useEffect } from "react";
import Preloader from "./components/Pre";
import Navbar from "./components/Navbar";
import Home from "./pages/home/HomePage";
import Projects from "./pages/projects/Projects";
import Footer from "./components/Footer";
import Resume from "./pages/resume/ResumeNew";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import "./style.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CourseTaken from "./pages/course_takens/Course_Taken";
import IndexHTML from "./components/IndexHTML";

function App() {
  const [load, updateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <Preloader load={load} />
      <div className="App" id={load ? "no-scroll" : "scroll"}>
        <Navbar/>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Projects />} />
          <Route path="/course_taken" element={<CourseTaken />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/htmlcontent/:projectDirectory/:projectName" element={<IndexHTML />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;