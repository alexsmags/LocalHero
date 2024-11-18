'use client'
import NavBar from "../../components/Navbar/navbar";
import Footer from "../../components/Footer/footer";
import TypingText from "../../components/Animations/TypingText";

export default function Home() {
  const phrases = [
    "Supporting Local, Building a Better Tomorrow",
    "Empowering Communities, One Step at a Time",
    "Fresh. Local. Sustainable.",
  ];

  return (
    <div className="main-page flex flex-col h-screen relative">
      <div className="absolute top-0 left-0 w-full z-30">
        <NavBar />
      </div>

      <main className="flex-grow relative">
        <video
          className="w-full h-full object-cover"
          src="/videos/food.mp4"
          autoPlay
          loop
          muted
          playsInline
        />

        <div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ marginBottom: "13rem" }}
        >
          <h1 className="text-5xl font-bold text-white">
            <TypingText phrases={phrases} />
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20">
          <Footer />
        </div>
      </main>
    </div>
  );
}
