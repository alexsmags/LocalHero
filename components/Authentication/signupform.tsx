'use client'
import React, { useState, useReducer } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import Link from "next/link";
import { addUser, getEmailUser } from "../../backend/lib/HelperUser";

const formReducer = (state: any, event: any) => {
  return {
    ...state,
    ...(event && event.target && event.target.name
      ? { [event.target.name]: event.target.value }
      : {}),
  };
};

const SignupForm = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const [error, setError] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    if (Object.keys(formData).length === 0) {
      console.log("Please fill out the form");
      return;
    }

    // Check if role is selected
    if (!formData.role) {
      setError("Please select a role.");
      return;
    }

    const userExist = await getEmailUser(formData.email);

    if (Object.keys(userExist).length !== 0) {
      setError("User already exists!");
      return;
    }

    const result = await addUser(formData);

    if (result && !result.error) {
      console.log("User created:", result);
      window.location.href = "/login"; // Redirect on success
    } else {
      console.error("Signup failed:", result.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-lg p-10 shadow-lg">
        <h3 className="text-center mb-8 text-3xl font-semibold" style={{ color: "#04b54e" }}>
          Sign Up
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            fullWidth
            color="success"
            placeholder="Name"
            name="name"
            onChange={setFormData}
            className="border-[#04b54e] focus:border-[#04b54e] border rounded-lg p-3 text-lg"
          />
          <Input
            fullWidth
            color="success"
            placeholder="Email"
            name="email"
            onChange={setFormData}
            className="border-[#04b54e] focus:border-[#04b54e] border rounded-lg p-3 text-lg"
          />
          <Input
            fullWidth
            color="success"
            type="password"
            placeholder="Password"
            name="password"
            onChange={setFormData}
            className="border-[#04b54e] focus:border-[#04b54e] border rounded-lg p-3 text-lg"
          />

          {/* Role Selection */}
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">Select your role:</p>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="artisan"
                onChange={setFormData}
                className="form-radio text-[#04b54e]"
              />
              <span>Artisan</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="businessowner"
                onChange={setFormData}
                className="form-radio text-[#04b54e]"
              />
              <span>Business Owner</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                name="role"
                value="client"
                onChange={setFormData}
                className="form-radio text-[#04b54e]"
              />
              <span>Client</span>
            </label>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <Button
            type="submit"
            className="w-full mt-6 py-3 text-lg"
            style={{ backgroundColor: "#04b54e" }}
          >
            Sign Up
          </Button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-[#04b54e] hover:underline">
            Log in
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default SignupForm;
