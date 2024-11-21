import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import SignupForm from "../../../../components/Authentication/signupform";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Footer from "../../../../components/Footer/footer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Signup() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
    
  return (
    <div className="main-page flex flex-col min-h-screen bg-gradient-to-r from-green-400 via-green-500 to-green-600">
      <Navbar />
      <main className="flex-grow">
        <SignupForm />
      </main>
      <Footer />
    </div>
  );
};
