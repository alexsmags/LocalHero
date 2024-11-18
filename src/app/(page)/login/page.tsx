import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import LoginForm from "../../../../components/Authentication/loginform";
import { getServerSession } from "next-auth";
import {redirect} from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Login() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/")
    
  return (
    <div className="main-page flex flex-col h-screen">
      <Navbar />
      <main className={`flex-grow`}>
        <LoginForm />
      </main>
    </div>
  );
};