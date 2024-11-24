import { Inter } from "next/font/google";
import NavBar from "../../../../components/Navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.className} main-page flex flex-col h-screen`}>
      <NavBar />
      {children}
    </div>
  );
}
