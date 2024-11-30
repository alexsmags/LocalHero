'use client';

import React, { useState, useEffect } from "react";
import { Input, Button, Card, Avatar, Divider, Progress } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import ConfirmationModal from "../../../../components/CRUD - User/Modals/ConfirmationModal";

const AccountSettings = () => {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    role: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const profileCompletion = () => {
    const totalFields = 4;
    const filledFields = Object.values(formData).filter((field) => field !== "").length;
    return Math.round((filledFields / totalFields) * 100);
  };

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        location: session.user.location || "",
        role: session.user.role || "",
      });
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    console.log("Updated Profile Data:", formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    setIsModalOpen(true);
  };

  const confirmDeleteAccount = () => {
    console.log("Account deleted!");
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showSuccess && (
        <div className="fixed top-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
          Profile updated successfully!
        </div>
      )}

      <Card className="w-full max-w-3xl p-10 shadow-lg">
        <h3 className="text-center mb-8 text-3xl font-semibold" style={{ color: "#04b54e" }}>
          Account Settings
        </h3>

        <div className="flex flex-col items-center mb-8">
          <Avatar src="" alt="User Avatar" className="mb-4 shadow-lg" />
          <h4 className="text-lg font-semibold">{formData.name || "User"}</h4>
          <p className="text-sm text-gray-500">{formData.email}</p>
          <p className="text-sm text-gray-500">
            {formData.role === "businessowner"
              ? "Business Owner"
              : formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}
          </p>
          <Button
            color="success"
            className="text-sm mt-3"
            style={{ backgroundColor: "#04b54e", color: "#ffffff", fontWeight: "600" }}
            onClick={() => alert("Change avatar functionality coming soon!")}
          >
            Change Avatar
          </Button>
        </div>

        <Divider className="mb-6" />

        <div className="mb-6">
          <h4 className="text-xl font-semibold mb-2" style={{ color: "#04b54e" }}>
            Profile Completion
          </h4>
          <Progress color="success" value={profileCompletion()} className="mb-4" />
          <p className="text-gray-600 text-sm">Your profile is {profileCompletion()}% complete.</p>
        </div>

        <form className="space-y-6">
          <Input
            fullWidth
            color="success"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="rounded-lg py-3 text-lg"
          />
          <Input
            fullWidth
            color="success"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="rounded-lg  py-3 text-lg"
          />
          <Input
            fullWidth
            color="success"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="rounded-lg py-3 text-lg"
          />

        <div className="space-y-6">
        <h4 className="text-lg font-medium text-gray-700">Role</h4>
        <div className="grid grid-cols-3 gap-4">
                {[
                { label: "Client", value: "client" },
                { label: "Artisan", value: "artisan" },
                { label: "Business Owner", value: "businessowner" },
                ].map(({ label, value }) => (
                <div
                    key={value}
                    className={`p-4 border-2 rounded-lg cursor-pointer text-center transition-all duration-300 ${
                    formData.role === value
                        ? "border-[#04b54e] bg-[#e6f7eb]"
                        : "border-gray-300 hover:border-[#04b54e] hover:bg-[#f7fcf8]"
                    }`}
                    onClick={() => setFormData({ ...formData, role: value })}
                >
                    <input
                    type="radio"
                    name="role"
                    value={value}
                    checked={formData.role === value}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="hidden"
                    />
                    <span
                    className={`text-lg font-semibold transition-colors duration-300 ${
                        formData.role === value ? "text-[#04b54e]" : "text-gray-700 hover:text-[#04b54e]"
                    }`}
                    >
                    {label}
                    </span>
                </div>
                ))}
            </div>
            </div>

          <Divider className="mt-6" />

          <Button
            className="w-full mt-6 py-3 text-lg"
            style={{ backgroundColor: "#04b54e", color: "#ffffff" }}
            onClick={handleSave}
          >
            Save Changes
          </Button>

          <Button
            className="w-full mt-4 py-3 text-lg"
            style={{ backgroundColor: "#FF4D4F", color: "#ffffff" }}
            onClick={handleDeleteAccount}
          >
            Delete Account
          </Button>
        </form>
      </Card>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDeleteAccount}
        message="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};

export default AccountSettings;
