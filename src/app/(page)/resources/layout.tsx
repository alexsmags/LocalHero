import { Inter } from "next/font/google";
import NavBar from "../../../../components/Navbar/navbar";
import Footer from "../../../../components/Footer/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`${inter.className} main-page flex flex-col min-h-screen`}
    >
      <NavBar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
