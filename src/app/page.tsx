'use client'
import { useEffect, useState, useRef } from "react";
import NavBar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import TypingText from "../../components/Animations/TypingText";

export default function Home() {
  const phrases = [
    "Supporting Local, Building a Better Tomorrow",
    "Empowering Communities, One Step at a Time",
    "Fresh. Local. Sustainable.",
  ];

  const videoSources = [
    "/videos/painting.mp4",
    "/videos/food.mp4",
    "/videos/pottery.mp4",
    "/videos/yoga.mp4",
    "/videos/knitting.mp4",
    "/videos/dough.mp4"
  ];

  const [currentVideo, setCurrentVideo] = useState(0); 
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * videoSources.length);
    setCurrentVideo(randomIndex);
  }, []);

  useEffect(() => {
    const switchToNextVideo = () => {
      setCurrentVideo((prevIndex) => (prevIndex + 1) % videoSources.length);
    };

    const timer = setTimeout(() => {
      switchToNextVideo();
    }, 10000); 

    return () => clearTimeout(timer);
  }, [currentVideo]);

  return (
    <div className="main-page flex flex-col min-h-screen relative">
      <div className="absolute top-0 left-0 w-full z-30">
        <NavBar />
      </div>

      <main className="flex-grow relative">
        <div className="video-container relative w-full" style={{ height: "90vh" }}>
          <video
            ref={videoRef}
            className="absolute top-0 left-0 w-full h-full object-cover"
            src={videoSources[currentVideo]}
            autoPlay
            muted
            playsInline
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <h1 className="text-5xl font-bold text-white">
            <TypingText phrases={phrases} />
          </h1>
        </div>
      </main>

      <div className="relative w-full">
        <Footer />
      </div>
    </div>
  );
}
