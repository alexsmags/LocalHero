import Image from "next/image";
import NavBar from "../../components/Navbar/navbar";

export default function Home() {
  return (
    <div className="main-page flex flex-col h-screen">
    <NavBar />
    <h1>Welcome to the Home Page</h1>
    <main className={`flex-grow`}>
    </main>
  </div>
  );
}
