'use client'
import React from "react";
import { Input, Button, Card } from "@nextui-org/react";
import Link from "next/link";
import {signIn, signOut} from "next-auth/react";
import { useState } from 'react'
import { useRouter } from "next/navigation"

const LoginForm = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });


      if (res?.error){
        setError("Invalid Credentials");
        console.log(res?.error)
        return;
      }

      router.replace("/")
    } catch (error) {
      console.error("Error during login:", error);
    }

  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-10 shadow-lg">
        <h3 className="text-center mb-8 text-3xl font-semibold" style={{ color: "#04b54e" }}>
          Log In
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            fullWidth
            color="success"
            placeholder="Email"
            className="border-[#04b54e] focus:border-[#04b54e] border rounded-lg p-3 text-lg"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            fullWidth
            color="success"
            type="password"
            placeholder="Password"
            className="border-[#04b54e] focus:border-[#04b54e] border rounded-lg p-3 text-lg"
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full mt-6 py-3 text-lg"
            style={{ backgroundColor: "#04b54e" }}
          >
            Log In
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-[#04b54e] hover:underline">
            Sign up
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default LoginForm;
