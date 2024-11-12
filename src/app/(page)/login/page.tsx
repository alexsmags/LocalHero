import React from "react";
import Navbar from "../../../../components/Navbar/navbar";
import LoginForm from "../../../../components/Authentication/loginform";

export default async function Signup() {

  return (
    <div className="main-page flex flex-col h-screen">
      <Navbar />
      <main className={`flex-grow`}>
        <LoginForm />
      </main>
    </div>
  );
};