import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import SignupForm from "../../../../components/Authentication/signupform";

export default async function Signup() {

  return (
    <div className="main-page flex flex-col h-screen">
      <Navbar />
      <main className={`flex-grow`}>
        <SignupForm />
      </main>
    </div>
  );
};