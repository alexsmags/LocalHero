'use client';
import React, { useState } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ErrorMessage from "../Messages/errormessage";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email.trim() && !password.trim()) {
        setError("Email and Password cannot be empty.");
        return;
      }

      if (!email.trim()) {
        setError("Email cannot be empty.");
        return;
      } else if (!isValidEmail(email)) {
        setError("Email is not valid.");
        return;
      }

      if (!password.trim()) {
        setError("Password cannot be empty.");
        return;
      }

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        console.log(res?.error);
        return;
      }

      router.replace("/");
    } catch (error) {
      console.error("Error during login:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  const isValidEmail = (email: string) => email.includes("@");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-10 shadow-lg">
        <h3 className="text-center mb-12 text-3xl font-semibold" style={{ color: "#04b54e" }}>
          Log In
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="relative">
            <Input
              fullWidth
              color="success"
              placeholder="Email"
              className={`border ${
                isEmailFocused && !isValidEmail(email) ? "border-red-500" : "border-[#04b54e]"
              } focus:border-[#04b54e] rounded-lg p-3 text-lg`}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
            />

            {isEmailFocused && !isValidEmail(email) && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AiOutlineExclamationCircle className="mr-1" /> Email must contain an "@" character
              </p>
            )}
          </div>


          <div className="relative">
            <Input
              fullWidth
              color="success"
              type="password"
              placeholder="Password"
              className="border-[#04b54e] focus:border-[#04b54e] border rounded-lg p-3 text-lg"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
            />

          </div>


          <Button
            type="submit"
            className="w-full mt-6 py-3 text-lg"
            style={{
              backgroundColor: "#04b54e",
              color: "#ffffff",
            }}
          >
            Log In
          </Button>
        </form>


        {error && <ErrorMessage message={error} />}

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
